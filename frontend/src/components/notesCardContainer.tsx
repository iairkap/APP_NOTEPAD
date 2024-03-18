import React, { useContext, useState } from 'react';
import GlobalContext from '../globalContext';
import styles from "../styles/layout/cardsContainer.module.css"
import { categoriesOptionsBackground } from "../utils/categoriesOptions";
import NotesCard from './notesCard'; // Aquí
import AddNoteModal from './AddNoteModal';



function NotesCardContainer() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
    const [categoryColor, setCategoryColor] = useState<string | null>(null);
    const context = useContext(GlobalContext);
    if (!context) {
        return null;
    }
    const { notes, deleteNoteHandler, setNoteSelected, noteSelected, archiveNote } = context;

    console.log(noteSelected)

    return (
        <main className={styles.generalContainer}>
            {notes.map((note, index) => {
                const categoryColorKey = note.categories && note.categories.length > 0 ? note.categories[0].name : 'defaultColor';
                return (
                    <NotesCard
                        key={index}
                        note={note}
                        categoryColor={categoriesOptionsBackground[categoryColorKey as keyof typeof categoriesOptionsBackground]}
                        deleteNoteHandler={deleteNoteHandler}
                        isOpen={isOpen}
                        setIsOpen={() => {
                            setEditingNoteId(note.id);
                            setCategoryColor(categoriesOptionsBackground[categoryColorKey as keyof typeof categoriesOptionsBackground]);
                            setIsOpen(true);
                            setNoteSelected(note);
                        }}
                        archiveNote={archiveNote}
                    />
                );
            })}
            <AddNoteModal isOpen={isOpen} onRequestClose={() => { setNoteSelected(null); setIsOpen(false) }} editingNoteId={editingNoteId} categoryColor={categoryColor} noteSelected={noteSelected} />
        </main>
    );
}

export default NotesCardContainer;