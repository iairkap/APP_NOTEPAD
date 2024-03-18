import React, { useContext, useState } from 'react';
import GlobalContext from '../globalContext';
import styles from "../styles/components/sidebar.module.css"
import SideBarButtonContainer from './SideBarButtonContainer';
import FilterContainer from './filterContainer';
function SideBar() {
    const [filterOpen, setFilterOpen] = useState(false);

    const context = useContext(GlobalContext);
    if (!context) {
        return null;
    }
    const { categories, createNote } = context;

    return (
        <aside className={styles.sideBarContainer}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <header style={{ display: "flex", justifyContent: "center" }}>
                <h4>Ensolvers</h4>
            </header>
            <article className={styles.sidebarFooterContainer}>
                <SideBarButtonContainer categories={categories} createNote={createNote} />
                <FilterContainer setFilterOpen={setFilterOpen} context={context} filterOpen={filterOpen} />
            </article>
        </aside >
    );
}

export default SideBar;