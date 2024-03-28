const express = require("express")
const client = require("../Helpers/connect.redis")
const app = express()
client.pSubscribe("__keyevent@0__:expired", (message, channel) => {
    console.log("this is message::", message);
    console.log("this is channel::", channel);

})

app.listen(3001, () => {
    console.log("Server running on port 3001");
})