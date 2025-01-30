import React from "react";
const notes = [
  { id: 1, title: "Note 1", category: "Work" },
  { id: 2, title: "Note 2", category: "Personal" },
  { id: 3, title: "Note 3", category: "Work" },
  { id: 4, title: "Note 4", category: "Study" },
  { id: 5, title: "Note 5", category: "Personal" },
];
const clickedCategory = null;
const NoteCategory = () => {
  const categories = notes.map((note) => note.category);

  const uniqueCategories = [...new Set(categories)];
  return (
    <div>
      <div>
        <nav className="flex gap-4" aria-label="Tabs">
          <button
            className={`rounded-lg p-2 text-[12px] pl-4 pr-4 border border-red-500 ${
              clickedCategory === null
                ? "bg-red-500 text-white"
                : "bg-transparent text-red-500"
            }`}
          >
            All
          </button>

          {uniqueCategories.map((uniqueCategory, index) => (
            <button
              // onClick={() => handleClickedCategory(uniqueCategory)}
              key={index}
              className={`rounded-lg p-2 text-[12px] pl-4 pr-4 border border-red-500
             text-red-500 ${
               clickedCategory === uniqueCategory
                 ? "bg-red-500 text-white"
                 : "bg-transparent : text-red-500"
             }`}
            >
              {uniqueCategory}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NoteCategory;
