const mongoose = require("mongoose");
const { testConnection } = require("../Helpers/connect.multi.mongodb");
const Schema = mongoose.Schema;

const BucketCommentSchema = new Schema({
    blogId: { type: String },
    count: { type: Number },
    comments: {
        type: Array, default: [{
            commentId: { type: Number, required: true },
            email: { type: String, default: '' },
            body: { type: String, default: '' },
            name: { type: String, default: '' },
        }]
    }

}, {
    timestamps: true,
    collection: "bucketcomment"
});



module.exports = testConnection.model("bucketcomment", BucketCommentSchema);
