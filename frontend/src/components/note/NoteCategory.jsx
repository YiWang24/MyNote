"use client";
import { useNoteContext } from "@/lib/noteContext";
import React, { useState } from "react";

const NoteCategory = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useNoteContext();

  return (
    <div>
      <div>
        <nav className="flex gap-4" aria-label="Tabs">
          <button
            onClick={() => setSelectedCategory(() => "all")}
            className={`rounded-lg p-2 text-[12px] pl-4 pr-4 border border-red-500 ${
              selectedCategory === "all"
                ? "bg-red-500 text-white"
                : "bg-transparent text-red-500"
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              // onClick={() => handleClickedCategory(uniqueCategory)}
              key={category._id}
              onClick={() => setSelectedCategory(() => category._id)}
              className={`rounded-lg p-2 text-[12px] pl-4 pr-4 border border-red-500
             text-red-500 ${
               selectedCategory === category._id
                 ? "bg-red-500 text-white"
                 : "bg-transparent : text-red-500"
             }`}
            >
              {category.type}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NoteCategory;
