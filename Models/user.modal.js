const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
});

module.exports = testConnection.model("user", UserSchema);
