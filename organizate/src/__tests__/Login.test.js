import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LoginForm } from '../components/LoginForm';


describe("LoginForm", () => {
    it("llama a la función handleLogin con las credenciales ingresadas al enviar el formulario", () => {
        // Mock de la función handleLogin
        const handleLogin = jest.fn();

        const { getByPlaceholderText, getByText } = render(
            <LoginForm handleLogin={handleLogin} />
        );

        // Simula la entrada de texto en los campos de correo y contraseña
        fireEvent.change(getByPlaceholderText("Correo electrónico"), {
            target: { value: "correo@example.com" },
        });
        fireEvent.change(getByPlaceholderText("Contraseña"), {
            target: { value: "contraseña123" },
        });

        // Simula el envío del formulario
        fireEvent.submit(getByText("Ingresar"));

        // Verifica que handleLogin haya sido llamado con las credenciales ingresadas
        expect(handleLogin).toHaveBeenCalledWith("correo@example.com", "contraseña123");
    });
});
