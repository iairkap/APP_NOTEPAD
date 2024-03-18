import React from "react";

export interface ICategory {
  id: number;
  name: string;
  notes: INote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  archive: boolean;
  categories: ICategory[];
  favorite: boolean;
}

export interface IGlobalContext {
  notes: INote[];
  getNotes: () => Promise<void>;
  loading: boolean;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  categories: ICategory[];
  createNote: (categoryId: number) => Promise<void>;
  deleteNoteHandler: (noteId: number) => Promise<void>;
  noteSelected: INote | null;
  setNoteSelected: React.Dispatch<React.SetStateAction<INote | null>>;
  modifyNote: (
    noteId: number,
    data: Partial<{ title: string; content: string }>
  ) => Promise<void>;
  archiveNote: (noteId: number) => Promise<void>;
  filter: "ALL" | "ACTIVE" | "ARCHIVED";
  setFilter: React.Dispatch<
    React.SetStateAction<"ALL" | "ACTIVE" | "ARCHIVED">
  >;
}

export interface IGlobalProviderProps {
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
  editingNoteId: number | null;
  categoryColor?: string | null;
  noteSelected: INote | null;
}
