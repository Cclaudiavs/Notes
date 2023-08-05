import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function RegisterForm() {
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar la longitud de la contraseña
        if (passwordRegister.length < 6) {
            setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        // Verificar si el correo electrónico ya está registrado
        try {
            const signInMethods = await auth.fetchSignInMethodsForEmail(emailRegister);

            if (signInMethods.length > 0) {
                setErrorMessage("El correo electrónico ya está registrado. Por favor, inicia sesión.");
            } else {
                // Si el correo electrónico no está registrado y la contraseña tiene la longitud adecuada, continuar con el registro
                await auth.register(emailRegister, passwordRegister);
                setSuccessMessage("¡Registro exitoso!");
                setEmailRegister(""); // Limpiar los campos de email y contraseña después del registro exitoso
                setPasswordRegister("");
                setErrorMessage(""); // Limpiar el mensaje de error en caso de que haya aparecido antes
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Ocurrió un error al verificar el correo electrónico. Por favor, intenta de nuevo más tarde.");
        }
    };

    return (
        <form className="forms" onSubmit={handleSubmit}>
            <h3 className="titulo">No tienes cuenta, Registrate acá</h3>
            <input
                className="input"
                type="email"
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
            />
            <input
                className="input"
                type="password"
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
            />
            <button className="button" type="submit">
                Ingresar
            </button>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
            {/* Resto del código... */}
        </form>
    );
}

export { RegisterForm };
