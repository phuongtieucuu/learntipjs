const express = require("express");
const app = express();
const createError = require("http-errors");
const cors = require('cors');

require("dotenv").config();
// require("./Helpers/connect.mongodb")
require("./src/Helpers/connect.redis")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
  res.json({
    status: 200,
    message: "Thanh cong",
  });
});

app.use(require("./src/routers"));


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
