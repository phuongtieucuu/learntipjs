const express = require("express");

const router = express.Router();

router.use('/user', require("./user.router"))
router.use(require("./money.router"))
router.use(require("./bucket-comment.router"))


module.exports = router