const express = require("express");
const userModal = require("../Models/user.modal");
const createHttpError = require("http-errors");
const router = express.Router();

router.post("/resgister", async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) throw createHttpError.BadRequest()
    
        const userExit = await userModal.findOne({userName: email})
        
        if (userExit) throw createHttpError.Conflict()
    
        const newUser = await userModal.create({userName: email, passWord: password})
        return res.json({
            status: "CREATED",
            data: newUser
        })
    } catch(err) {
        next(err)
    }
})
router.post("/login", (req, res, next) => {
    res.send("login")
})
router.post("/refresh-token", (req, res, next) => {
    res.send("refresh-token")
})
router.post("/logout", (req, res, next) => {
    res.send("logout")
})

module.exports = router