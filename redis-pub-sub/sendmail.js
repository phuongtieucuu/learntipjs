const express = require("express")
const app = express()
const client = require("../Helpers/connect.redis")

// client.subscribe("ordersystem", (message, channel) => {
//     console.log("this is message of sendmail", message);
//     console.log("this is channel of sendmail", channel);
// })

client.pSubscribe("o*", (message, channel) => {
    console.log("this is message of sendmail", message);
    console.log("this is channel of sendmail", channel);
})

app.listen(3002, () => {
    console.log("Server running on port 3002");
})