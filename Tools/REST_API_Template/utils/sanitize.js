// NOTE: Install required libraries and check usage as per your application
const jsStringEscape = require("js-string-escape");
const escape = require("escape-html");
const xss = require("xss");

// Function to sanitize user input through various methods
module.exports = (data) => {
    data = jsStringEscape(data);
    data = escape(data);
    data = xss(data);
    return data;
};

// const createDOMPurify = require("dompurify");
// const { JSDOM } = require("jsdom");

// const window = new JSDOM("").window;
// const DOMPurify = createDOMPurify(window);

// const clean = DOMPurify.sanitize(dirty);
