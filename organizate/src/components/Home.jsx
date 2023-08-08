import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Importa la biblioteca de calendario que elijas

function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Lógica para mostrar solo el día lunes en el calendario
    const startOfWeek = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <h2>Bienvenido a la página de inicio</h2>
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
