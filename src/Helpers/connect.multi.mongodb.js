const mongoose = require("mongoose");
require("dotenv").config();

function mongodbConnection(uri) {
  const conn = mongoose.createConnection(uri);
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
  conn.on("connected", function () {
    console.log(`MongoDB conencted::: ${this.name}`);
  });

  conn.on("disconnected", function () {
    console.log(`MongoDB disconnected::: ${this.name}`);
  });

  conn.on("error", function (error) {
    console.log(`MongoDB error::: ${JSON.stringify(error)}`);
  });

  return conn;
}

const testConnection = mongodbConnection(process.env.TESTCONNECTION);
const userConnection = mongodbConnection(process.env.USERCONNECTION);
module.exports = {
  testConnection,
  userConnection,
};
