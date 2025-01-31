"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCategories,
  fetchCreateCategory,
  fetchDeleteCategories,
} from "@/actions/category";
import {
  fetchNotes,
  fetchCreateNote,
  fetchDeleteNotes,
  fetchUpdateNote,
} from "@/actions/note";
import toast from "react-hot-toast";

export const NoteContext = createContext({
  categories: [],
  notes: [],
  noteMeta: {},
  newNote: {},
  isLoading: true,
  isCategoryModalOpen: false,
  isNoteModalOpen: false,
  setNewNote: () => {},
  controlCategoryModal: () => {},
  controlNoteModal: () => {},
  deleteCategories: () => {},
  createCategory: () => {},
  createNote: () => {},
});

export function NoteContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteMeta, setNoteMeta] = useState({});
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "",
  });
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

  const refreshNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetchNotes({ page: 1, pageSize: 3 });
      // console.log(response);
      setNotes(response.data);
      setNoteMeta(response.meta);
    } catch (error) {
      toast.error("Failed to fetch notes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCategories();
    refreshNotes();
  }, []);

  const deleteCategories = async (categories) => {
    try {
      const result = await fetchDeleteCategories(categories);
      await refreshCategories();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
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

  const createNote = async (formData) => {
    try {
      console.log(formData);
      await fetchCreateNote(formData);
      toast.success("Note created successfully");
      refreshNotes();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const value = {
    isLoading,
    categories,
    notes,
    newNote,
    noteMeta,
    isCategoryModalOpen,
    isNoteModalOpen,
    setNewNote,
    controlCategoryModal,
    controlNoteModal,
    deleteCategories,
    createCategory,
    createNote,
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
