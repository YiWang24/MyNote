const Category = require("../models/category");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const userId = req.auth.id;
    const category = new Category({ ...req.body, userId });
    console.log("Category", category, userId);
    await category.save();
    res.status(201).json(category);
    console.log("Category created", category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const userId = req.auth.id;
    const categories = await Category.find({ userId });
    res.status(200).json(categories);
    console.log("Categories fetched", categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const userId = req.auth.id;
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
    console.log("Category updated", category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete multiple categories by IDs
exports.deleteCategories = async (req, res) => {
  try {
    const userId = req.auth.id;
    const categoryIds = req.body;

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res.status(400).json({ message: "Invalid category IDs" });
    }

    const result = await Category.deleteMany({
      _id: { $in: categoryIds },
      userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No categories found to delete" });
    }

    res.status(200).json({
      message: "Categories deleted",
      deletedCount: result.deletedCount,
    });

    console.log("Categories deleted", result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
