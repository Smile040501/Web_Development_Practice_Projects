const express = require("express");

const mainController = require("../controllers/main");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/", isAuth, mainController.getMain);

module.exports = router;
