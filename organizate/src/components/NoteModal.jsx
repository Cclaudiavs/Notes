import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button'; // Importar el componente Button de Material-UI

Modal.setAppElement('#root');

function NoteModal({ day, onDeleteNote }) {
    const [note, setNote] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isValidDate = day <= 31;
        if (!isValidDate) {
            return;
        }

        const storedNote = localStorage.getItem(`note_${day}`);
        if (storedNote) {
            setNote(JSON.parse(storedNote));
        }
    }, [day]);

    useEffect(() => {
        if (note) {
            setIsOpen(true);
        }
    }, [note]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDeleteNote = () => {
        localStorage.removeItem(`note_${day}`);
        setNote(null);
        setIsOpen(false);
        onDeleteNote(); // Emitir el evento para actualizar la lista de notas en Home
    };

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                {/* Renderizado del contenido del modal */}
            </Modal>
            {note && (
                <Button variant="outlined" color="secondary" onClick={handleDeleteNote}>
                    Eliminar Nota
                </Button>
            )}
        </>
    );
}


export { NoteModal };
