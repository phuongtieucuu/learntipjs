const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/test')
conn.on("connected", function () {
    console.log(`MongoDB conencted::: ${this.name}`);
})

conn.on("disconnected", function () {
    console.log(`MongoDB disconnected::: ${this.name}`);
})

conn.on("error", function (error) {
    console.log(`MongoDB error::: ${JSON.stringify(error)}`);
})

process.on("SIGINT", async function () {
    await conn.close();
    process.exit(0)
})

module.exports = conn