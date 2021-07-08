const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    handle: { type: String, required: true, unique: true, minLength: 2, maxLength: 40 },
    company: { type: String },
    website: { type: String },
    location: { type: String },
    status: { type: String, required: true },
    bio: { type: String },
    githubUsername: { type: String },
    skills: { type: [String], required: true },
    experience: [
        {
            title: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String },
        },
    ],
    education: [
        {
            school: { type: String, required: true },
            degree: { type: String, required: true },
            fieldOfStudy: { type: String, required: true },
            from: { type: Date, required: true },
            to: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String },
        },
    ],
    social: {
        youTube: { type: String },
        twitter: { type: String },
        facebook: { type: String },
        linkedIn: { type: String },
        instagram: { type: String },
    },
    date: { type: Date, default: Date.now },
});

profileSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Profile", profileSchema);
