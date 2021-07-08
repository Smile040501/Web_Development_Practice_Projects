const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, minLength: 10, maxLength: 300 },
    name: { type: String, required: true },
    avatar: { type: String },
    likes: [{ userId: { type: Schema.Types.ObjectId, ref: "User", required: true } }],
    comments: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            text: { type: String, required: true },
            name: { type: String, required: true },
            avatar: { type: String },
            date: { type: Date, default: Date.now },
        },
    ],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
