const Category = require("../models/category");
const Note = require("../models/note");

// Create a new category
exports.createCategory = async (req, res) => {
  const userId = req.auth.id;
  const type = req.body.type;

  try {
    console.log("Current userId:", userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const existingCategory = await Category.findOne({ type, userId })
      .lean()
      .exec();
    console.log("Existing Category:", existingCategory);

    if (existingCategory) {
      console.log("Category already exists for type:", type, "userId:", userId);
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      type,
      userId,
    });

    // Try to save and catch potential duplicate key errors

    await category.save();

    console.log("Created Category", category, "for user:", userId);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const userId = req.auth.id;
    const categories = await Category.find({ userId });
    res.status(200).json(categories);
    console.log("Categories fetched", userId);
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
    // Extract user ID from authentication
    const userId = req.auth.id;
    console.log("User ID", userId);
    // Convert category IDs to Mongoose ObjectIds
    const categoryIds = req.body;
    console.log("Category IDs", categoryIds);

    // Validate input: ensure categoryIds is a non-empty array
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      console.log("Invalid category IDs");
      return res.status(400).json({ message: "Invalid category IDs" });
    }

    // Find notes associated with these categories for the current user
    const categoriesWithNotes = await Note.find({
      category: { $in: categoryIds },
      userId,
    });
    console.log("Categories with notes", categoriesWithNotes.length);

    // If notes exist for some categories
    if (categoriesWithNotes.length > 0) {
      // Get IDs of categories with associated notes
      const linkedCategoryIds = categoriesWithNotes.map((note) =>
        note.category.toString()
      );

      // Filter out categories that can be deleted (no associated notes)
      const deletableCategoryIds = categoryIds.filter(
        (id) => !linkedCategoryIds.includes(id.toString())
      );

      // If no categories can be deleted
      if (deletableCategoryIds.length === 0) {
        console.log("Cannot delete categories with associated notes");
        return res.status(400).json({
          message: "Cannot delete categories with associated notes",
          linkedCategories: linkedCategoryIds,
        });
      }

      // Delete categories without associated notes
      const result = await Category.deleteMany({
        _id: { $in: deletableCategoryIds },
        userId,
      });
      console.log("Categories deleted", result.deletedCount);
      return res.status(200).json({
        message: "Some categories deleted, others have notes",
        deletedCategories: result.deletedCount,
        skippedCategories: linkedCategoryIds,
      });
    }

    // If no notes are found for any of the categories, delete all
    const result = await Category.deleteMany({
      _id: { $in: categoryIds },
      userId,
    });
    console.log("Categories deleted", result.deletedCount);
    // Handle case where no categories were found to delete
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No categories found to delete" });
    }

    // Successfully deleted categories
    res.status(200).json({
      message: "Categories deleted successfully",
      deletedCategories: result.deletedCount,
    });
  } catch (error) {
    console.log("Error deleting categories", error);
    // Handle any unexpected errors
    res.status(500).json({ message: error.message });
  }
};
