"use client";
import React from "react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNoteContext } from "@/lib/noteContext";
import { Avatar } from "../ui/avatar";

import { TextAnimate } from "../ui/text-animate";

const NoteTitle = () => {
  const { controlCategoryModal, controlNoteModal } = useNoteContext();
  return (
    <div className="flex flex-col gap-2   sm:flex-row   justify-between">
      <div className="flex gap-2 items-center">
        <Avatar className="h-9 w-9 bg-red-500">
          <AvatarImage src={"/name.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-[17px] flex gap-1">
          <span className="font-bold text-red">Sinu</span>
          <TextAnimate animation="blurInUp" by="character">
            Notes
          </TextAnimate>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={controlNoteModal}
          className=" px-3 h-9 rounded border border-red-500 text-[12px] text-red-500 hover:bg-red-500 hover:text-white"
        >
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
