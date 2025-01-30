const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.get("/", categoryController.getCategories);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/", categoryController.deleteCategories);

module.exports = router;
