"use client";
import React, { useState, useEffect } from "react";

const NewNoteCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentCategories = ["Work", "Personal", "Study", "Shopping"];
  const [categoryInputs, setCategoryInputs] = useState(['']);
  const [toDeleteCategories, setToDeleteCategories] = useState([]);

  const addInput = () => {
    setCategoryInputs([...categoryInputs, '']);
  };

  const toggleDeleteCategory = (category) => {
    setToDeleteCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
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
                {currentCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDeleteCategory(category)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 
                      ${toDeleteCategories.includes(category)
                        ? 'bg-gray-200 text-gray-500 line-through'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* New Categories */}
            <form className="space-y-4">
              <h3 className="text-lg font-semibold">Add New Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categoryInputs.map((input, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      className="px-3 py-1 rounded-lg bg-green-100 text-green-700 border-none focus:ring-2 focus:ring-green-500"
                      placeholder="New category"
                    />
                    {index === categoryInputs.length - 1 && (
                      <button
                        type="button"
                        onClick={addInput}
                        className="ml-2 p-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewNoteCategory;