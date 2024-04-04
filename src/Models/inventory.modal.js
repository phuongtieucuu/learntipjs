const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
    productId: { type: Number, required: true },
    quatity: { type: Number },
    reservations: { type: Array, default: [] },
        /*
        [
            {
                userId: 123,
                quantily: 1
            }
        ]
    */
    create_at: { type: Date, default: Date.now },
}, {
    timestamps: true,
    collection: "inventories"
});

module.exports = testConnection.model("inventories", InventorySchema);
