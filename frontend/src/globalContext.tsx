import React, { useState, useEffect } from "react";
import type { IGlobalContext, IGlobalProviderProps } from "./types";
import { getNotes as fetchNotes, getCategories as fetchCategories, createNoteFromCategory, deleteNote, updateNote, archiveNoteInBackEnd } from "./api";

const defaultContext: IGlobalContext = {
  notes: [],
  getNotes: () => Promise.resolve(),
  loading: false,
  setNotes: () => { },
  categories: [],
  createNote: () => Promise.resolve(),
  deleteNoteHandler: () => Promise.resolve(),
  noteSelected: null,
  setNoteSelected: () => { },
  modifyNote: () => Promise.resolve(),
  archiveNote: () => Promise.resolve(),
  filter: "ACTIVE",
  setFilter: () => { }


};

export const GlobalContext = React.createContext<IGlobalContext>(defaultContext);

export const GlobalProvider: React.FC<IGlobalProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noteSelected, setNoteSelected] = useState<any>(null);
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'ARCHIVED'>('ACTIVE');
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);


  const getNotes = async () => {
    setLoading(true);
    try {
      const notesData = await fetchNotes();
      setNotes(notesData);
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    let filteredNotes = notes;
    if (filter === 'ACTIVE') {
      filteredNotes = notes.filter((note: any) => !note.archive);
    } else if (filter === 'ARCHIVED') {
      filteredNotes = notes.filter((note: any) => note.archive);
    }
    setFilteredNotes(filteredNotes);
  }, [notes, filter]);

  const createNote = async (categoryId: number) => {
    const note = await createNoteFromCategory(categoryId);
    if (filter !== 'ARCHIVED') {
      const noteWithCategory = { ...note };
      setNotes([...notes, noteWithCategory]);
    }
  }

  const deleteNoteHandler = async (noteId: number) => {
    await deleteNote(noteId);
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
  }

  const modifyNote = async (noteId: number, data: Partial<{ title: string, content: string, categories: any[] }>) => {
    const noteToUpdate = notes.find((note) => note.id === noteId);
    const updatedNote = await updateNote(noteId, { ...data, categories: noteToUpdate.categories });
    const newNotes = notes.map((note) => note.id === noteId ? updatedNote : note);
    setNotes(newNotes);
  };
  const archiveNote = async (noteId: number) => {
    const noteToUpdate = notes.find((note) => note.id === noteId);
    const updatedNote = await archiveNoteInBackEnd(noteId, { archive: !noteToUpdate.archive });
    const newNotes = notes.map((note) => note.id === noteId ? updatedNote : note);
    setNotes(newNotes);
  }

  const value = {
    notes: filteredNotes, // Usa filteredNotes en lugar de notes
    getNotes,
    loading,
    categories,
    setNotes,
    createNote,
    deleteNoteHandler,
    noteSelected,
    setNoteSelected,
    modifyNote,
    archiveNote,
    filter,
    setFilter
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;