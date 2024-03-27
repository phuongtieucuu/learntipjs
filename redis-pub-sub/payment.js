const express = require("express")
const app = express()
const client = require("../Helpers/connect.redis")

client.subscribe("ordersystem", (message, channel) => {
    console.log("this is message of payment", message);
    console.log("this is channel of payment", channel);
})

app.listen(3001, () => {
    console.log("Server running on port 3001");
})