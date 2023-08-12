import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function LoginForm({ handleLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-container">
                <h3 className="titulo">Ingresa con tu cuenta</h3>
                <div className="input-group">
                    <input
                        className="input"
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Link to={`/home`}>
                    <Button variant="contained" onClick={handleLogin}>Ingresar</Button>
                </Link>
            </div>
        </form>
    );
}

export { LoginForm };
