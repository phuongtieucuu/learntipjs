const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    otp: {
        type: String,
    },
    time: { type: Date, default: Date.now, index: { expires: 10 } }
}, { timestamps: true });



module.exports = testConnection.model("otp", OtpSchema);
