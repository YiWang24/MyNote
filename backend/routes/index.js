const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const noteRouter = require("./note");
const categoryRouter = require("./category")

router.use("/auth", authRouter);
router.use("/notes", noteRouter);
router.use("/categories", categoryRouter);

module.exports = router;