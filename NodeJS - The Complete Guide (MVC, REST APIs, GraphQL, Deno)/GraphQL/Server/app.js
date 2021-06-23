const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { graphqlHTTP } = require("express-graphql");

const graphqlSchema = require("./graphql/schema.js");
const graphqlResolver = require("./graphql/resolvers.js");
const auth = require("./middleware/auth");
const { clearImage } = require("./util/file.js");

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    //* 5
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(auth);

//*7
app.put("/post-image", (req, res, next) => {
    if (!req.isAuth) {
        throw new Error("Not authenticated");
    }
    if (!req.file) {
        return res.status(200).json({ message: "No file provided!" });
    }

    if (req.body.oldPath) {
        clearImage(req.body.oldPath);
    }
    return res
        .status(201)
        .json({ message: "File stored", filePath: req.file.path.replace("\\", "/") });
});

// We only made posts requests
// But for 'graphiql' we are making get request to it
app.use(
    "/graphql", // Request to '/graphql'
    graphqlHTTP({
        schema: graphqlSchema, // GraphQL Schemas
        rootValue: graphqlResolver, // Resolvers
        graphiql: true, //*2: Gives a special tool when we visit `localhost:8080/graphql` where we get GUI to run graphql queries and send requests and see documentation

        customFormatErrorFn(err) {
            //* 4
            // Allows to return our own format of error
            // return err; // The default format

            if (!err.originalError) {
                // Set by express-graphql when it detects error thrown in code either by you or some third party package
                // For technical errors, it wont have original error field
                return err;
            }

            const data = err.originalError.data;
            const message = err.message || "An error occurred";
            const code = err.originalError.code || 500;
            return {
                message,
                status: code,
                data,
            };
        },
    })
);

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message, data });
});

mongoose
    .connect("MONGODB_ATLAS_URI", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then((res) => {
        app.listen(8080, () => {
            console.log("Server Running on Port 8080!");
        });
    })
    .catch((err) => console.log(err));
