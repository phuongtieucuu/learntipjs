const express = require("express");
const app = express();
const createError = require("http-errors");

require("dotenv").config();
// require("./Helpers/connect.mongodb")
require("./Helpers/connect.redis")

const userRouter = require("./routers/user.router");
const moneyRouter = require("./routers/money.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
  res.json({
    status: 200,
    message: "Thanh cong",
  });
});

app.use("/user", userRouter);
app.use(moneyRouter);


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
