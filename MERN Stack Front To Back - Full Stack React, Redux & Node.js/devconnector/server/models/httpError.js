class HttpError extends Error {
    constructor(message, errorCode, errors) {
        super(message); // Add a "message" property
        this.code = errorCode; // Adds a "code" property
        this.errors = errors;
    }
}

module.exports = HttpError;
