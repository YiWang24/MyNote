"use client";
import React, { useState, useEffect } from "react";
import { fetchCategories, createCategory } from "@/actions/category";

const NewNoteCategory = ({ initialCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");

  // console.log(categories);
  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;
    const createdCategory = await createCategory({ type: newCategory });
    if (createdCategory) {
      setCategories([...categories, createdCategory]);
      setNewCategory("");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg p-2 text-[12px] pl-4 pr-4 border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
      >
        Add Category
      </button>

      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md z-50 m-4">
            <h2 className="text-2xl font-bold mb-4">Categories Management</h2>

            {/* Current Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Current Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            {/* New Category Input */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="New category"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
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
