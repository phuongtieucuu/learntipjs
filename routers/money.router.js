const express = require("express");
const moneyModal = require("../Models/money.modal");
const { startSession } = require("mongoose");
const router = express.Router();

router.post("/v1/api/user", async (req, res, next) => {
    try {
        const { userId, amount } = req.body;
        const moneyCreate = await moneyModal.create({ userId, amount })
        return res.json({
            status: "CREATED",
            data: moneyCreate
        })
    } catch (err) {
        next(err)
    }
})
// {"_id": "mongoRepSet","members": [{"_id": 0, "host": "172.26.0.2:27017"}, {"_id": 1, "host": "172.26.0.3:27017"}, {"_id": 2, "host": "172.26.0.4:27017"}]}
router.post("/v1/api/transfer", async (req, res, next) => {
    const session = await startSession()
    try {
        const { fromId, toId, amount } = req.body;
        console.log(req.body);
        // session.startTransaction();
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
          };
        await session.withTransaction(async () => {
            const amountFrom = await moneyModal.findOneAndUpdate({ userId: +fromId }, {
                $inc: { amount: -amount }
            }, { session, new: true })
            console.log(`Acount ${fromId} is:::`, amountFrom);
            const amountTo = await moneyModal.findOneAndUpdate({ userId: +toId }, {
                $inc: { amount: amount }
            }, { session, new: true })
            console.log(`Acount ${toId} is:::`, amountTo);
        }, transactionOptions);
        await session.commitTransaction()
        session.endSession()
        return res.json({
            status: "OK",
            data: {
                amountFrom,
                amountTo
            }
        })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        next(err)
    }
})


module.exports = router