"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { useNoteContext } from "@/lib/noteContext";

const NoteTitle = () => {
  const { controlCategoryModal } = useNoteContext();
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          className={`w-6 h-6 p-2 bg-red-500 rounded-md text-white`}
          icon={faNoteSticky}
        />

        <div className="text-[17px] flex gap-1">
          <span className="font-bold text-red">Quick</span>
          <span>Notes</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button className=" px-3 h-9 rounded border border-red-500 text-[12px] text-red-500 hover:bg-red-500 hover:text-white">
          Add a note
        </button>
        <button
          onClick={controlCategoryModal}
          className=" px-3 h-9 rounded border border-red-500 text-[12px] text-red-500 hover:bg-red-500 hover:text-white"
        >
          Add a Category
        </button>
      </div>
    </div>
  );
};

export default NoteTitle;
