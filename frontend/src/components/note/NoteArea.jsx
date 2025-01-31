"use client";
import { useState, useEffect, useRef } from "react";
import NoteCard from "./NoteCard";
import { useNoteContext } from "@/lib/noteContext";
import { Confetti } from "@/components/ui/confetti";
const NoteArea = () => {
  const { notes, isLoading } = useNoteContext();

  // console.log(notes);

  if (isLoading) {
    return <div className="text-center col-span-full">Loading...</div>;
  }

  if (!notes || notes.length === 0) {
    return <div className="text-center col-span-full">No notes found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2   lg:grid-cols-3 overflow-auto ">
      {!isLoading &&
        notes?.length > 0 &&
        notes.map((note) => <NoteCard key={note._id} note={note} />)}
    </div>
  );
};

export default NoteArea;
