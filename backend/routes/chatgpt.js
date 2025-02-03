const express = require("express");
const router = express.Router();
const chatGPTController = require("../controller/ChatGPTController");

router.post("/", chatGPTController.generateResponse);

module.exports = router;
