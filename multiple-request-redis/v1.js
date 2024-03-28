const express = require("express")
const app = express()
const {
    get,
    set,
    incrby,
    exists,
    setnx,
    decrby
} = require("./model.redis")
app.get('/order', async (req, res, next) => {
    // so luong ton kho
    const sl = 10;
    // ten san pham
    const productName = 'Iphone13'
    // so luong mua
    const slMua = 1;

    // so luong da ban ra, neu chua thi = 0, moi lan ban update tang 1
    const product = await exists(productName)

    if (!product) {
        await set(productName, 0)
    }

    //lay so luong ban ra

    let slBanRa = await get(productName);
    console.log("Truoc khi user order ===", slBanRa);
    if (+slBanRa + slMua > sl) {
        console.log("HET HANG");
        return res.json({
            message: "HET HANG"
        })
    }
    // neu order thanh cong
    slBanRa = await incrby(productName, slMua)
    console.log("Sau khi user order ===", slBanRa);
    if (slBanRa > sl) {
        await set("banquaroi", slBanRa - sl)
    }
    res.json({ message: "Ok" })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})