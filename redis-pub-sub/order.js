const express = require("express")
const app = express()
const client = require("../Helpers/connect.redis")

app.get('/order', async (req, res, next) => {
    const data = [
        {
            id: 1,
            name: "huy1"
        },
        {
            id: 2,
            name: "huy2"
        },
    ]
    await client.publish("o000", JSON.stringify(data))
    res.json({ message: "Ok" })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})