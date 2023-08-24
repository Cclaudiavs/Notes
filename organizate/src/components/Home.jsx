
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CustomModal } from './CustomModal';
import { NoteModal } from './NoteModal';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || {});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;
        const note = notes[dateKey];
        if (note) {
            setCurrentNote(note);
            setIsModalOpen(true);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const openModal = () => {
        setCurrentNote(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitNote = (noteTitle, noteContent) => {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`;
        const newNote = { title: noteTitle, content: noteContent };

        setNotes(prevNotes => ({
            ...prevNotes,
            [dateKey]: newNote,
        }));

        closeModal();
    };

    const handleDeleteNoteInHome = (dateKey) => {
        // Abrir ventana emergente para confirmar borrado
        setNoteToDelete(dateKey);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Cierre de la ventana emergente de confirmación
        setDeleteConfirmOpen(false);

        // Obtén una copia de las notas actuales
        const updatedNotes = { ...notes };

        // Elimina la nota correspondiente a la fecha de la clave
        delete updatedNotes[noteToDelete];

        // Actualiza el estado con las notas actualizadas
        setNotes(updatedNotes);
    };

    const handleDeleteCancel = () => {
        // Cierre de la ventana emergente de confirmación
        setDeleteConfirmOpen(false);
        setNoteToDelete('');
    };

    const renderTileContent = () => null;
    return (
        <div className="home-container">
            <h2>Organiza-"Te"</h2>
            <div className="current-date">
                {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <button onClick={handleLogout}>Cerrar sesión</button>
            <button onClick={openModal}>Crear Nota</button>
            <Calendar
                className="calendar"
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                calendarType="US"
                returnValue="start"
                view="month"
                tileContent={renderTileContent}
            />
            <div className="notes-container">
                {Object.keys(notes).map(dateKey => (
                    <div className="note-item" key={dateKey}>
                        <h3>{new Date(dateKey).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                        <h4>{notes[dateKey].title}</h4>
                        <p>{notes[dateKey].content}</p>
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteNoteInHome(dateKey)}>
                            Borrar Nota
                        </Button>
                    </div>
                ))}
            </div>
            <CustomModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmitNote} currentNote={currentNote} />
            <NoteModal onDeleteNote={handleDeleteNoteInHome} />

            <Dialog
                open={deleteConfirmOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmar Borrado</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas borrar esta nota?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
                        Borrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Home;
