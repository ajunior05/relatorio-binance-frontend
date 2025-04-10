// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutos

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Logout automático após inatividade
  useEffect(() => {
    const timeout = setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [token]); // reinicia quando o token muda (login/renovação)

  const login = (newToken) => {
    const fullToken = `Bearer ${newToken}`;
    console.log("Login com token:", fullToken);
    localStorage.setItem('token', fullToken);
    setToken(fullToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};