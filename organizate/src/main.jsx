import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Home from './components/Home';
import { LoginForm } from './components/LoginForm'; // Importa LoginForm
import { RegisterForm } from './components/RegisterForm'; // Importa RegisterForm
import { GoogleLoginButton } from './components/GoogleLoginButton'; // Importa GoogleLoginButton
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<App />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="google-login" element={<GoogleLoginButton />} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
);
