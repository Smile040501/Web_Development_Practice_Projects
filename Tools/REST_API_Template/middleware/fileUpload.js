// Middleware to handle image file uploads using multer
const multer = require("multer");
const { v4: uuid } = require("uuid");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "png",
    "image/jpg": "jpg",
};

// Destination where to store the file
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid() + "." + ext);
    },
});

// Which file types to accept
const fileFilter = (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
};

const fileUpload = multer({
    limits: 500000,
    storage: fileStorage,
    fileFilter,
});

// IMP: Normalize file path using `normalize-path` npm package before storing path to Database
module.exports = fileUpload;
