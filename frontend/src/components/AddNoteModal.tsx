import React, { useState, useContext } from 'react';
import Modal from './modal';
import type { ModalProps } from '../types';
import styles from "../styles/components/modal.module.css"
import GlobalContext from '../globalContext';

function AddNoteModal({ isOpen, onRequestClose, editingNoteId, categoryColor, noteSelected }: ModalProps) {
    const [form, setForm] = useState({
        title: noteSelected ? noteSelected.title : '',
        content: noteSelected ? noteSelected.content : '',
    });

    const context = useContext(GlobalContext);
    if (!context) {
        return null;
    }
    const { modifyNote } = context;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingNoteId) {
            await modifyNote(editingNoteId, form);
        }
        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} categoryColor={categoryColor}>
            <div className={styles.modalContentAddNote}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <input type="text" placeholder={noteSelected && noteSelected.title ? noteSelected.title : 'Title'}
                        value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={styles.input} />
                    <textarea placeholder={noteSelected && noteSelected.content ? noteSelected.content : "Content"} rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={styles.textArea}></textarea>
                    <button type="submit" className={styles.buttonSubmit}>Save</button>
                </form>
            </div>
        </Modal>
    );
}

export default AddNoteModal;