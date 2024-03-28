const express = require("express")
const client = require("../Helpers/connect.redis")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/order', async (req, res, next) => {
    const { userId, orderId } = req.body
    await client.setEx(orderId, 5, "Cancel order")
    res.json({ message: "Ok" })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})