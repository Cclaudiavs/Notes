import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function RegisterForm() {
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const auth = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(emailRegister, passwordRegister);
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
            {/* Resto del código... */}
        </form>
    );
}

export { RegisterForm };
