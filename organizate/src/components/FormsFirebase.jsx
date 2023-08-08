import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useAuth } from "../context/AuthContext";
import { GoogleLoginButton } from "./GoogleLoginButton";


function FormsFirebase() {
    const auth = useAuth();


    const handleGoogleLoginSuccess = () => {
        // Redirige a la página de inicio después de un inicio de sesión exitoso con Google
        history.push("/home");
    };

    const handleGoogleLoginError = (error) => {
        // Maneja el error, si es necesario
        console.log(error);
    };
    return (
        <div className="app">
            <LoginForm />
            <RegisterForm />
            <GoogleLoginButton
                onGoogleLoginSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError} />
        </div>
    );
}

export default FormsFirebase;
