const express = require("express");
const createHttpError = require("http-errors");
const bucketModal = require("../Models/bucket.modal");
const router = express.Router();

router.post("/create-comment", async (req, res, next) => {
    try {
        const { blogId, commentId, name, body, email } = req.body;
        const _blogId = new RegExp(`^${blogId}_`)

        const bucketCommentCreate = await bucketModal.findOneAndUpdate({
            blogId: { $regex: _blogId },
            count: { $lt: 2 }
        }, {
            $push: {
                comments: {
                    commentId,
                    name,
                    body,
                    email
                }
            },
            $inc: { count: 1 },
            $setOnInsert: {
                blogId: `${blogId}_${new Date().getTime()}`
            }
        }, {
            upsert: true,
            new: true
        });
        return res.json({
            status: "CREATED",
            data: bucketCommentCreate
        })
    } catch (err) {
        next(err)
    }
})

router.get("/search-comment", async (req, res, next) => {
    try {
        const blogId = req.query.blogId;
        const page = +req.query.page || 1;
        const size = +req.query.size || 1;
        const _blogId = new RegExp(`^${blogId}_`)
        const bucketCommentCreate = await bucketModal.find({
            blogId: { $regex: _blogId },
        }).sort({ _id: 1 }).skip((page - 1) * size).limit(size);
        return res.json({
            status: "OKE",
            data: bucketCommentCreate[0].comments,
            meta: {
                page,
                size
            }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router