const express = require("express");
const createHttpError = require("http-errors");
const { getSign } = require("../Helpers/replay");
const router = express.Router();

router.get("/replay", async (req, res, next) => {
    try {
        const { stime, sign } = req.query;
        if (!stime || !sign) {
            throw createHttpError.BadRequest();
        }
        const isTime = Math.floor((Date.now() - stime) / 1000);
        if (isTime > 30) {
            throw createHttpError.BadRequest("expried!!!");
        }

        const signServer = getSign(req.query);
        if (signServer != sign) {
            throw createHttpError.BadRequest("sign invalid!!!");
        }
        return res.json({
            status: "OKE",
        })
    } catch (err) {
        next(err)
    }
})


module.exports = router