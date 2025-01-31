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
import { fetchInfo } from "@/actions/auth";
export const NoteContext = createContext({
  categories: [],
  user: {},
  selectedCategory: "",
  selectedPage: 1,
  notes: [],
  noteMeta: {},
  newNote: {},
  isLoading: true,
  isCategoryModalOpen: false,
  isNoteModalOpen: false,
  setNewNote: () => {},
  setSelectedCategory: () => {},
  setCategories: () => {},
  setSelectedPage: () => {},
  setQuery: () => {},
  controlCategoryModal: () => {},
  controlNoteModal: () => {},
  deleteCategories: () => {},
  createCategory: () => {},
  createNote: () => {},
  getNoteById: () => {},
  deleteNote: () => {},
});

export function NoteContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPage, setSelectedPage] = useState(1);
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
    limit: 6,
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

  const refreshNotes = async (params) => {
    console.log(params);
    try {
      let category = params?.category;
      if (category === "all") {
        category = "";
      }
      let page = params?.page;

      setIsLoading(true);
      const newQuery = {
        ...query,
        category,
        page,
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

  const refreshInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetchInfo();
      // console.log(response);
      setUser(response);
    } catch (error) {
      toast.error("Failed to fetch user info");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCategories();
    refreshNotes();
    refreshInfo();
  }, []);

  useEffect(() => {
    refreshNotes({ category: selectedCategory });
  }, [selectedCategory]);

  useEffect(() => {
    refreshNotes({ category: selectedCategory, page: selectedPage });
  }, [selectedPage]);

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
  };

  const deleteNote = async (noteId) => {
    try {
      await fetchDeleteNotes(noteId);
      toast.success("Note deleted successfully");
      refreshNotes(selectedCategory);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const value = {
    isLoading,
    user,
    categories,
    selectedCategory,
    selectedPage,
    notes,
    newNote,
    noteMeta,
    isCategoryModalOpen,
    isNoteModalOpen,
    setNewNote,
    setSelectedCategory,
    setQuery,
    setSelectedPage,
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
