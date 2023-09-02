import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";

jest.mock("../context/AuthContext");

test("Submit button is enabled when valid email and password are entered", () => {
    // Mock de useAuth para controlar el comportamiento de register
    const mockRegister = jest.fn();
    useAuth.mockReturnValue({
        register: mockRegister,
    });

    const { getByPlaceholderText, getByText } = render(<RegisterForm />);
    const emailInput = getByPlaceholderText("Correo electrónico");
    const passwordInput = getByPlaceholderText("Contraseña");
    const submitButton = getByText("Registrarse");

    // Simula la entrada de datos en los campos de correo electrónico y contraseña
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simula el envío del formulario
    fireEvent.submit(submitButton);

    // Verifica que la función register haya sido llamada con los datos correctos
    expect(mockRegister).toHaveBeenCalledWith("test@example.com", "password123");
});

