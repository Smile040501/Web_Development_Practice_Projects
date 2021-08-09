const fs = require("fs");

// Function to delete a file provided its file path
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw err;
        }
    });
};

module.exports = {
    deleteFile,
};
