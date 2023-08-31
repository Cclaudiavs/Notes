
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';

Modal.setAppElement('#root');

function NoteModal({ onDeleteNote }) {
    const [note, setNote] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Obtener la nota almacenada sin una fecha específica
        const storedNote = localStorage.getItem('note_general');
        if (storedNote) {
            setNote(JSON.parse(storedNote));
        }
    }, []);

    useEffect(() => {
        if (note) {
            setIsOpen(true);
        }
    }, [note]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDeleteNote = () => {
        localStorage.removeItem(`note_${new Date().toISOString()}`);
        setNote(null);
        setIsOpen(false);
        onDeleteNote(); // Emitir el evento para actualizar la lista de notas en Home
    };



    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                {/* Aquí puedes mostrar el contenido del modal */}
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

