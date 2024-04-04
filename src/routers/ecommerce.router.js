const express = require("express");
const { addProduct, addInventory, addCart } = require("../services/ecommerce.service");
const router = express.Router();

router.post("/add-product", async (req, res, next) => {
    try {
        return res.json({
            status: "CREATED",
            data: await addProduct(req.body)
        })
    } catch (err) {
        next(err)
    }
})

router.post("/add-inventory", async (req, res, next) => {
    try {
        return res.json({
            status: "CREATED",
            data: await addInventory(req.body)
        })
    } catch (err) {
        next(err)
    }
})


router.post("/add-cart", async (req, res, next) => {
    try {
        return res.json({
            status: "CREATED",
            data: await addCart(req.body)
        })
    } catch (err) {
        next(err)
    }
})
module.exports = router