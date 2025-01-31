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
  selectedCategory: "",
  notes: [],
  noteMeta: {},
  newNote: {},
  isLoading: true,
  isCategoryModalOpen: false,
  isNoteModalOpen: false,
  setNewNote: () => {},
  setSelectedCategory: () => {},
  setCategories: () => {},
  controlCategoryModal: () => {},
  controlNoteModal: () => {},
  deleteCategories: () => {},
  createCategory: () => {},
  createNote: () => {},
  getNoteById: () => {},
  deleteNote: () => {},
});

export function NoteContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notes, setNotes] = useState([]);
  const [noteMeta, setNoteMeta] = useState({});
  const [newNote, setNewNote] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    update: false,
  });
  const [query, setQuery] = useState({
    page: 1,
    limit: 3,
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

  const refreshNotes = async (category) => {
    try {
      setIsLoading(true);
      const newQuery = {
        ...query,
        category: category === "all" || category === null ? "" : category,
      };
      const response = await fetchNotes(newQuery);
      // console.log(response);
      setNotes(response.data);
      setNoteMeta(response.meta);
      setQuery(newQuery); // Update query after fetch
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

  useEffect(() => {
    refreshNotes(selectedCategory);
  }, [selectedCategory]);

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
    console.log(formData);
    try {
      if (formData.update) {
        const id = formData.id;
        const note = {
          title: formData.title,
          content: formData.content,
          category: formData.category,
        };
        await fetchUpdateNote(id, note);
      } else {
        await fetchCreateNote(formData);
      }
      toast.success("Note created successfully");
      refreshNotes();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getNoteById = (noteId) => {
    {
      const selectNode = notes.find((note) => note._id === noteId);
      // console.log(selectNode);
      if (selectNode) {
        setNewNote({
          id: selectNode._id,
          title: selectNode.title,
          content: selectNode.content,
          category: selectNode.category._id,
          update: true,
        });
        controlNoteModal();
      } else {
        toast.error("Note not found");
      }
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await fetchDeleteNotes(noteId);
      toast.success("Note deleted successfully");
      refreshNotes();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const value = {
    isLoading,
    categories,
    selectedCategory,
    notes,
    newNote,
    noteMeta,
    isCategoryModalOpen,
    isNoteModalOpen,
    setNewNote,
    setSelectedCategory,
    controlCategoryModal,
    controlNoteModal,
    deleteCategories,
    createCategory,
    createNote,
    getNoteById,
    deleteNote,
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
