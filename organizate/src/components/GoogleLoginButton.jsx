
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const GoogleLoginButton = ({ onError }) => {
    const auth = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await auth.loginWithGoogle();
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            onError("Error al iniciar sesión con Google. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <Link to={`/home`}>
                    <Button variant="contained">Ir a Home</Button>
                </Link>
            ) : (
                <Button variant="contained" onClick={handleGoogleLogin}>Iniciar sesión con Google</Button>
            )}
        </div>
    );
};

export { GoogleLoginButton };




