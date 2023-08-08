/*import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

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
};

export { LoginForm };*/
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
            <Link to={`/home`}>
                <button onClick={handleLogin}>Ingresar</button>
            </Link>
        </form>
    );
}

export { LoginForm };
