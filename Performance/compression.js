const express = require("express")
const app = express()
const compression = require('compression')
const EventEmitter = require("events")
app.use(compression({
    level: 6,
    threshold: 100 * 1000
}))

const myEvent = new EventEmitter()
myEvent.on("listentError", (err1, err2) => {
    console.log("Error::::", err1, err2);
})

setTimeout(() => {
    myEvent.emit("listentError", {msg: "Loi r"})
},2000)

app.get('/', async (req, res, next) => {
    const strCompress = "Hello expreess"
    res.send(strCompress.repeat(1000))
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})