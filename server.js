const express = require("express")
const app = express()
const createError = require('http-errors')

require("dotenv").config()
require("./Helpers/connect.mongodb")

const userRouter = require("./routers/user.router")
const PORT = process.env.PORT || 3001

app.get("/", (req, res, next) => {
    res.json({
        status: 200,
        message: "Thanh cong"
    })
})

app.use("/user", userRouter)

app.use((req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
