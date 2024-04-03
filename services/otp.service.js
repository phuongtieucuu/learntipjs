const bcrypt = require('bcrypt');
const otpModal = require('../Models/otp.modal');

module.exports = {
    createOtp: async (email, otp) => {
        const salt = await bcrypt.genSalt(10)
        const hashOtp = await bcrypt.hash(otp, salt)
        return await otpModal.create({ email, otp: hashOtp })
    },

    isvalidOtp: async (otp, hashOtp) => {
        return await bcrypt.compare(otp, hashOtp)
    },
}