const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: { type: Number, required: true },
    // cartId: { type: Number, required: true },
    userId: { type: Number, required: true },
    shipping: { type: Object },
    payment: { type: Object },
    products: { type: Array },

}, {
    timestamps: true,
    collection: "order"
});

module.exports = testConnection.model("order", OrderSchema);
