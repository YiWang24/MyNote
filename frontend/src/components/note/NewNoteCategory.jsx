"use client";
import React, { useState, useEffect } from "react";
import { createCategory, deleteCategories } from "@/actions/category";
import { useNoteContext } from "@/lib/noteContext";
import toast from "react-hot-toast";
const NewNoteCategory = ({ initialCategories }) => {
  const { isCategoryModalOpen, controlCategoryModal } = useNoteContext();

  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDelete = async () => {
    try {
      await deleteCategories(selectedCategories);
      console.log("Deleted categories:", selectedCategories);
      setCategories((prev) =>
        prev.filter((category) => !selectedCategories.includes(category._id))
      );
      setSelectedCategories([]);
    } catch (error) {
      console.error("Error deleting categories:", error);
    }
  };

  // console.log(categories);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCategory.trim() === "") return;
    try {
      const createdCategory = await createCategory({
        type: newCategory,
      });
      if (createdCategory) {
        toast.success("Category created successfully");
        setCategories([...categories, createdCategory]);
        setNewCategory("");
      }
    } catch (error) {
      toast.error("category already exists");
      console.error("Error creating category:", error);
    }
  };
  return (
    <>
      <button
        onClick={controlCategoryModal}
        className="rounded-lg p-2 text-[12px] pl-4 pr-4 border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
      >
        Add Category
      </button>

      {isCategoryModalOpen && (
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md z-50 m-4">
            <h2 className="text-2xl font-bold mb-4">Categories Management</h2>

            {/* Current Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Current Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer
                      ${
                        selectedCategories.includes(category._id)
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {category.type}
                  </span>
                ))}
              </div>
            </div>

            {/* New Category Input */}
            <form
              className="flex items-center gap-2 mb-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="New category"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                +
              </button>
            </form>

            <div className="flex justify-end space-x-4 pt-4">
              {selectedCategories.length > 0 && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Delete Selected
                </button>
              )}
              <button
                type="button"
                onClick={controlCategoryModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewNoteCategory;
