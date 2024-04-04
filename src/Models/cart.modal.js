const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    // cartId: { type: Number, required: true },
    userId: { type: Number },
    status: { type: String, default: "active" },
    modifiedOn: { type: Date, default: Date.now },
    products: { type: Array, default: [] },
    /*
        [
            {
                prodictId: 123,
                quantily: 1
            }
        ]
    */

}, {
    timestamps: true,
    collection: "cart"
});

module.exports = testConnection.model("cart", CartSchema);
