const express = require("express");

const router = express.Router();

router.use('/user', require("./user.router"))
router.use(require("./money.router"))
router.use(require("./bucket-comment.router"))
router.use(require("./ecommerce.router"))
router.use(require("./replay.router"))

module.exports = router