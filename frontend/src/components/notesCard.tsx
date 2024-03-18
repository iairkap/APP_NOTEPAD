import React from 'react';
import type { INote } from '../types';
import { formatDate } from '../utils/dateFormat';
import styles from "../styles/components/notes.module.css"
interface NotesCardProps {
    note: INote;
    categoryColor: string;
    deleteNoteHandler: (noteId: number) => Promise<void>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    archiveNote: (noteId: number) => Promise<void>;

}

function NotesCard({ note, categoryColor, deleteNoteHandler, isOpen, setIsOpen, archiveNote }: NotesCardProps) {
    return (
        <main style={{ backgroundColor: categoryColor }} className={styles.noteContainer}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <header>
                <div className={styles.headerTitle}>
                    {note.title}
                    <span>{formatDate(note.createdAt)}</span>
                </div>
                <button onClick={() => deleteNoteHandler(note.id)}>x</button>
            </header>
            <span>{note.content}</span>
            <div className={styles.footerContainer}>
                <button onClick={() => setIsOpen(true)} className={styles.buttonEdit}>
                    <span className="material-symbols-outlined" style={{ background: "black", color: "white", padding: "0.5rem", borderRadius: "5rem" }}>
                        edit
                    </span>
                </button>
                {
                    <button onClick={() => archiveNote(note.id)} className={styles.buttonEdit}>
                        <span className="material-symbols-outlined" style={{ background: "black", color: "white", padding: "0.5rem", borderRadius: "5rem" }}>
                            {note.archive ? 'unarchive' : 'archive'}
                        </span>
                    </button>
                }
            </div>
        </main>
    );
}

export default NotesCard; 