import React from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; // Importar correctamente la función

function FormsFirebase() {
    const auth = useAuth();

    const handleLogin = async (email, password) => {
        try {
            // Lógica para el inicio de sesión con Firebase
            await signInWithEmailAndPassword(auth, email, password);
            // Aquí puedes realizar acciones adicionales después del inicio de sesión exitoso
        } catch (error) {
            console.log(error);
            // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error en el formulario
        }
    };

    const handleSubmit = async (emailRegister, passwordRegister) => {
        try {
            // Lógica para el registro con Firebase
            await createUserWithEmailAndPassword(auth, emailRegister, passwordRegister);
            // Aquí puedes realizar acciones adicionales después del registro exitoso
        } catch (error) {
            console.log(error);
            // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error en el formulario
        }
    };

    return (
        <div className="app">
            <LoginForm handleLogin={handleLogin} />
            <RegisterForm handleSubmit={handleSubmit} />
        </div>
    );
}

export default FormsFirebase;
