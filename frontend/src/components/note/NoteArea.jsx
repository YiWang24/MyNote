import React from "react";
import { Meteors } from "../ui/meteors";

import NoteCard from "./NoteCard";
const NoteArea = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-auto ">
  
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </div>
  );
};

export default NoteArea;
