const express = require("express");
const userModal = require("../Models/user.modal");
const createHttpError = require("http-errors");
const { userValidate } = require("../Helpers/validation");
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require("../Helpers/jwt.service");
const client = require("../Helpers/connect.redis");
const router = express.Router();

router.post("/resgister", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = userValidate(req.body)

        if (error) throw createHttpError.BadRequest(error.details[0].message)

        const userExit = await userModal.findOne({ email })

        if (userExit) throw createHttpError.Conflict()
        const user = new userModal({ email, password })
        const newUser = await user.save();

        return res.json({
            status: "CREATED",
            data: newUser
        })
    } catch (err) {
        next(err)
    }
})
router.post("/login", async (req, res, next) => {
    try {

        const { error } = userValidate(req.body)
        if (error) throw createHttpError.BadRequest(error.details[0].message)
        const { email, password } = req.body;

        const userExit = await userModal.findOne({ email })
        if (!userExit) throw createHttpError.NotFound("User not register!!")

        const isValid = await userExit.checkPassword(password)
        if (!isValid) throw createHttpError.Unauthorized()

        const accessToken = await signAccessToken(userExit._id)
        const refreshToken = await signRefreshToken(userExit._id)
        return res.status(200).json({
            status: "OK",
            accessToken,
            refreshToken
        })
    } catch (error) {
        next(error)
    }

})
router.post("/refresh-token", async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createHttpError.BadRequest()
        const { userId } = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        return res.status(200).json({
            status: "OK",
            accessToken,
            refreshToken: refToken
        })
    } catch (error) {
        next(error)
    }

})
router.post("/logout", async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createHttpError.BadRequest()
        const { userId } = await verifyRefreshToken(refreshToken)
        await client.del(userId.toString())
        return res.status(200).json({
            status: "OK",
            message: "Logout!!"
        })
    } catch (error) {
        next(error)
    }
})

router.get("/list", verifyAccessToken, (req, res, next) => {
    console.log(req.headers);
    res.send("OKE")
})

module.exports = router