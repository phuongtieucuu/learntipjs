const express = require("express")
const router = express.Router();

router.post("/resgister", (req, res, next) => {
    res.send("resgister")
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