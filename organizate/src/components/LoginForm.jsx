import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";


function LoginForm({ handleLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.login(email, password);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3 className="titulo">Ingresa con tu cuenta</h3>
            <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">
                Ingresar
            </button>
        </form>
    );
}

export { LoginForm };
