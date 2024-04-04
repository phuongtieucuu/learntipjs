const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = testConnection.model("user", UserSchema);
