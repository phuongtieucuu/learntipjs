const express = require("express");
const createHttpError = require("http-errors");
const { userValidate } = require("../Helpers/validation");
const {  verifyAccessToken } = require("../Helpers/jwt.service");
const { resgister, login, logout, registerOtp, verifyOtp } = require("../services/user.service");
const router = express.Router();

router.post("/resgister", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = userValidate(req.body)

        if (error) throw createHttpError.BadRequest(error.details[0].message)

        return res.json({
            status: "CREATED",
            data: await resgister({ email, password })
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
        const { accessToken, refreshToken } = await login({ email, password })

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
        const { accessToken, refToken } = await refreshToken(refreshToken)

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
        await logout(refreshToken)

        return res.status(200).json({
            status: "OK",
            message: "Logout!!"
        })
    } catch (error) {
        next(error)
    }
})

router.get("/list", verifyAccessToken, (req, res, next) => {
    res.send("OKE")
})

router.post("/register-otp", async (req, res, next) => {
    try {
        const { email } = req.body
        const { otp } = await registerOtp(email)

        return res.status(200).json({
            status: "OKE",
            data: otp
        })
    } catch (error) {
        next(error)
    }
})

router.post("/verify-otp", async (req, res, next) => {
    try {
        const { email, password, otp } = req.body;
        return res.status(200).json({
            status: "OKE",
            data: await verifyOtp({ email, password, otp })
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router