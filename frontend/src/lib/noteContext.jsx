"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCategories,
  fetchCreateCategory,
  fetchDeleteCategories,
} from "@/actions/category";
import toast from "react-hot-toast";

export const NoteContext = createContext({
  categories: [],
  notes: [],
  isLoading: true,
  isCategoryModalOpen: false,
  isNoteModalOpen: false,
  controlCategoryModal: () => {},
  controlNoteModal: () => {},
  deleteCategories: () => {},
  createCategory: () => {},
});

export function NoteContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const controlCategoryModal = () =>
    setIsCategoryModalOpen(!isCategoryModalOpen);
  const controlNoteModal = () => setIsNoteModalOpen(!isNoteModalOpen);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetchCategories();
      setCategories(response);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const deleteCategories = async (categories) => {
    try {
      await fetchDeleteCategories(categories);
      await refreshCategories();
      toast.success("Category deleted successfully");
      setCategories((prev) =>
        prev.filter((category) => !categories.includes(category._id))
      );
    } catch (error) {
      toast.error("Error deleting categories");
    }
  };

  const createCategory = async (category) => {
    try {
      await fetchCreateCategory({ type: category });
      toast.success("Category created successfully");
      refreshCategories();
    } catch (error) {
      toast.error("category already exists");
    }
  };

  const value = {
    isLoading,
    categories,
    notes,
    isCategoryModalOpen,
    isNoteModalOpen,
    controlCategoryModal,
    controlNoteModal,
    deleteCategories,
    createCategory,
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
