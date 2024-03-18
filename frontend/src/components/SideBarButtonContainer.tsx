import React, { useState } from 'react';
import styles from "../styles/components/sidebar.module.css"
import type { ICategory } from "../types";
import { categoriesOptionsBackground } from '../utils/categoriesOptions';

interface categoriesProps {
    categories: ICategory[];
    createNote: (categoryId: number) => Promise<void>;
}
function SideBarButtonContainer({ categories, createNote }: categoriesProps) {
    const [addButtonSelected, setAddButtonSelected] = useState(false);
    const handleAddButton = () => {
        setAddButtonSelected(!addButtonSelected);
    }

    const handleCreateNote = (categoryId: number) => {
        createNote(categoryId);
    }


    return (
        <main className={styles.sideBarButtonContainer}>
            <div>
                <button className={styles.addNoteButton} onClick={handleAddButton}>+</button>
            </div>
            {
                addButtonSelected &&
                categories.map((category) => {
                    const color = categoriesOptionsBackground[category.name as keyof typeof categoriesOptionsBackground] || categoriesOptionsBackground.defaultColor;
                    return (
                        <button key={category.id} style={{ backgroundColor: color, borderRadius: '50%', width: '20px', height: '20px' }} onClick={() => handleCreateNote(category.id)}>
                        </button>
                    );
                })
            }

        </main>
    );
}

export default SideBarButtonContainer;