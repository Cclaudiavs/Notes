
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

    const modalContentStyle = {
        maxHeight: '80vh', // Establecer una altura máxima para el contenido
        overflowY: 'auto', // Agregar scroll si el contenido excede la altura máxima
    };

    return (
        <>

            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                {/* Aquí puedes mostrar el contenido del modal */}
                <div style={modalContentStyle}>
                    {/* Contenido del modal con scroll */}
                    {/* Por ejemplo, muestra el título y el contenido de la nota */}
                    {note && (
                        <div>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                        </div>
                    )}
                </div>
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

