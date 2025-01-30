"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const NoteContext = createContext({
  isCategoryModalOpen: false,
  controlCategoryModal: () => {},
});

export function NoteContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const controlCategoryModal = () =>
    setIsCategoryModalOpen(!isCategoryModalOpen);
  const controlNoteModal = () => setIsNoteModalOpen(!isNoteModalOpen);

 

  const value = {
    categories,
    notes,
    isCategoryModalOpen,
    isNoteModalOpen,
    controlCategoryModal,
    setIsNoteModalOpen,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export function useNoteContext() {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteContextProvider");
  }
  return context;
}
