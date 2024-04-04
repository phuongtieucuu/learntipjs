const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productId: { type: Number, required: true },
    code: { type: String },
    name: { type: String },
    branch: { type: String },
    description: { type: String },
    release_date: { type: Date, default: Date.now },
    specs: { type: Array, default: [] },

}, {
    timestamps: true,
    collection: "product"
});

module.exports = testConnection.model("product", ProductSchema);
