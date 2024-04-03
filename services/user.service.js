const createHttpError = require("http-errors");
const userModal = require("../Models/user.modal");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../Helpers/jwt.service");
const client = require("../Helpers/connect.redis");
const otpGenerator = require('otp-generator');
const otpModal = require("../Models/otp.modal");
const { createOtp, isvalidOtp } = require("./otp.service");

module.exports = {
    resgister: async ({ email, password }) => {
        const userExit = await userModal.findOne({ email })

        if (userExit) throw createHttpError.Conflict()
        const user = new userModal({ email, password })
        return await user.save();
    },

    login: async ({ email, password }) => {
        const userExit = await userModal.findOne({ email })
        if (!userExit) throw createHttpError.NotFound("User not register!!")

        const isValid = await userExit.checkPassword(password)
        if (!isValid) throw createHttpError.Unauthorized()

        const accessToken = await signAccessToken(userExit._id)
        const refreshToken = await signRefreshToken(userExit._id)
        return { accessToken, refreshToken }
    },

    refreshToken: async (refreshToken) => {
        const { userId } = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        return { accessToken, refToken }
    },

    logout: async (refreshToken) => {
        const { userId } = await verifyRefreshToken(refreshToken)
        await client.del(userId.toString())
    },

    registerOtp: async (email) => {
        const userExit = await userModal.findOne({ email })

        if (userExit) {
            throw createHttpError.Conflict("This email is already in user!!");
        }
        const optionGenerateOtp = {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        }

        const otp = otpGenerator.generate(6, optionGenerateOtp)
        console.log("Otp ===", otp);
        const otpCreate = await createOtp(email, otp)
        return {
            otp: otpCreate.otp
        }
    },
    verifyOtp: async ({ email, password, otp }) => {
        const otps = await otpModal.find({ email })
        const lastOtp = otps[otps.length - 1];

        const isValid = await isvalidOtp(otp, lastOtp.otp)
        if (!isValid) {
            throw createHttpError.Conflict("Otp isValid")
        }
        if (email !== lastOtp.email) {
            throw createHttpError.Conflict("Email isValid")
        }
        await otpModal.deleteMany({ email })
        const user = new userModal({ email, password })
        return {
            data: await user.save(),
        }
    }

}