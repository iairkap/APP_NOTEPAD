import React from 'react';
import styles from "../styles/components/sidebar.module.css"

interface FilterContainerProps {
    setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
    filterOpen: boolean;
    context: any;
}


function FilterContainer({ setFilterOpen, filterOpen, context }: FilterContainerProps) {
    return (
        <div className={styles.filterOptionContainer}>
            <button className={styles.buttonEdit} onClick={() => setFilterOpen(!filterOpen)}>
                <span className="material-symbols-outlined">
                    filter_alt
                </span>
            </button>
            {
                filterOpen &&
                <div className={styles.buttonFilterContainer}>
                    <button className={styles.buttonFilter} onClick={() => context.setFilter('ALL')}>All</button>
                    <button className={styles.buttonFilter} onClick={() => context.setFilter('ACTIVE')}>Active</button>
                    <button className={styles.buttonFilter} onClick={() => context.setFilter('ARCHIVED')}>Archived</button>
                </div>

            }
        </div>
    );
}

export default FilterContainer;