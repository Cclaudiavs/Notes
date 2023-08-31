
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
        const formattedDate = date.toISOString().split('T')[0];
        const note = notes[formattedDate];
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






    const handleDeleteNoteInHome = (dateKey) => {
        // Abrir ventana emergente para confirmar borrado
        setNoteToDelete(dateKey);
        setDeleteConfirmOpen(true);
    };


    const handleSubmitNote = (noteTitle, noteContent) => {
        const newNote = { title: noteTitle, content: noteContent };

        setNotes(prevNotes => ({
            ...prevNotes,
            [new Date().toISOString()]: newNote,
        }));

        closeModal();
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
            <div><button onClick={handleLogout}>Cerrar sesión</button></div>
            <div className="current-date">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    showWeekNumbers
                    inline
                />
            </div>

            <button onClick={openModal}>Crear Nota</button>

            <div className="notes-container">
                {Object.keys(notes).map(dateKey => (
                    <div className="note-item" key={dateKey}>
                        <h3>{new Date(dateKey).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' })}</h3>

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
