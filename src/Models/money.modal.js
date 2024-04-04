const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const MoneySchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });



module.exports = testConnection.model("money", MoneySchema);
