const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);
