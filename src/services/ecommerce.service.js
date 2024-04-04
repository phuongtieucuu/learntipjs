const cartModal = require("../Models/cart.modal")
const inventoryModal = require("../Models/inventory.modal")
const productModal = require("../Models/product.modal")

module.exports = {
    addProduct: async ({ code, name, branch, description, productId }) => {
        return await productModal.create({ code, name, branch, description, productId })
    },

    addInventory: async ({ productId, quatity }) => {
        return await inventoryModal.create({ productId, quatity })
    },

    addCart: async ({ userId, productId, quatity }) => {
        const stock = await inventoryModal.updateOne({
            productId,
            quatity: { $gte: quatity }
        }, {
            $push: {
                reservations: {
                    userId,
                    quatity
                }
            },
            $inc: {
                quatity: -quatity
            }
        })

        console.log("stock", stock);

        if (stock.matchedCount) {
            const addtoCart = await cartModal.updateOne({
                userId,
            }, {
                $push: {
                    products: {
                        productId,
                        quatity
                    }
                }
            }, {
                upsert: true,
                new: true
            })
            console.log("cart to add::", addtoCart);
            return 1;
        }
    }
}