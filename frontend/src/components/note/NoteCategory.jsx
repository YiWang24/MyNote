"use client";
import { useNoteContext } from "@/lib/noteContext";
import React, { useState } from "react";

const NoteCategory = () => {
  const { categories, selectedCategory, setSelectedCategory } =
    useNoteContext();

  return (
    <nav className="flex flex-wrap gap-2 p-2  " aria-label="Tabs">
      <button
        onClick={() => setSelectedCategory(() => "all")}
        className={`rounded-lg     px-6 py-1.5   text-[12px] md:text-[18px] border border-red-500 ${
          selectedCategory === "all"
            ? "bg-red-500 text-white"
            : "bg-transparent text-red-500"
        }`}
      >
        All
      </button>

      {categories?.map((category) => (
        <button
          // onClick={() => handleClickedCategory(uniqueCategory)}
          key={category._id}
          onClick={() => setSelectedCategory(() => category._id)}
          className={`rounded-lg px-6 py-1.5 text-[12px]  md:text-[18px]   border border-red-500
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
  );
};

export default NoteCategory;
