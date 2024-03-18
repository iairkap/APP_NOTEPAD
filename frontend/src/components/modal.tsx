import React from 'react';
import ReactModal from 'react-modal';
import styles from "../styles/components/modal.module.css"


interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    categoryColor?: string | null;
}

function Modal({ isOpen, onRequestClose, children, categoryColor }: ModalProps) {

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.myModal}
            overlayClassName={styles.myOverlay}
            style={{
                content: {
                    backgroundColor: categoryColor === null ? undefined : categoryColor,
                }
            }}

        >
            <div className='children-container'>
                {children}
            </div>

        </ReactModal>
    );
}

export default Modal;