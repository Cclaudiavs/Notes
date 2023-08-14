/*import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Importa la biblioteca de calendario que elijas
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const auth = useAuth();
    const navigate = useNavigate();



    // Lógica para mostrar solo el día lunes en el calendario
    const startOfWeek = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleLogout = () => {
        auth.logout();
        try {
            // Redirige a la página de inicio de sesión después de cerrar sesión
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <h2>Organiza-"Te"</h2>
            <button onClick={() => { handleLogout() }}>Cerrar sesión</button>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()} // Evita seleccionar fechas anteriores a hoy
                maxDate={new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)} // Evita seleccionar fechas posteriores al último día del mes
                tileDisabled={({ date }) => date.getDay() !== 1} // Deshabilita los días que no son lunes
                calendarType="US"
                returnValue="start"
                view="month"
            />
        </div>
    );
}

export default Home;
*/
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const auth = useAuth(); // Asegúrate de que estás usando el contexto de autenticación

    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleLogout = async () => {
        try {
            await auth.logout();
            // Redirige a la página de inicio de sesión después de cerrar sesión
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Organiza-"Te"</h2>
            <button onClick={() => { handleLogout() }}>Cerrar sesión</button>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()} // Evita seleccionar fechas anteriores a hoy
                maxDate={new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)} // Evita seleccionar fechas posteriores al último día del mes
                tileDisabled={({ date }) => date.getDay() !== 1} // Deshabilita los días que no son lunes
                calendarType="US"
                returnValue="start"
                view="month"
            />
        </div>
    );
}

export default Home;
