import React, { use } from "react";
import NoteTitle from "./NoteTitle";
import NoteCategory from "./NoteCategory";
import NoteArea from "./NoteArea";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import NotePage from "./NotePage";
import NewNote from "./NewNote";
import NewNoteCategory from "./NewNoteCategory";

const Note = async () => {
  return (
    <NeonGradientCard className=" w-[90%] h-[90%]">
      <div className=" w-full h-full  rounded-md  p-7 flex flex-col gap-9 ">
        <NoteTitle />
        <NoteCategory />
        <NoteArea />
        <NotePage />
        <NewNote />
        <NewNoteCategory />
      </div>
    </NeonGradientCard>
  );
};

export default Note;
