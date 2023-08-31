
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function CustomModal({ isOpen, onClose, onSubmit }) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    useEffect(() => {
        setNoteTitle('');
        setNoteContent('');
    }, [isOpen]); // Limpiar campos cuando se abra el modal

    const handleTitleChange = (e) => {
        setNoteTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setNoteContent(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(noteTitle, noteContent); // Guarda la nota sin fecha
        onClose();
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Crear Nota"
        >
            <h2>Crear Nota</h2>
            <label htmlFor="noteTitle">Fecha:</label>
            <input
                type="text"
                id="noteTitle"
                value={noteTitle}
                onChange={handleTitleChange}
            />
            <label htmlFor="noteContent">Contenido:</label>
            <textarea
                id="noteContent"
                value={noteContent}
                onChange={handleContentChange}
            />
            <button onClick={handleSubmit}>Guardar</button>
            <button onClick={onClose}>Cancelar</button>
        </Modal>
    );
}

export { CustomModal };


