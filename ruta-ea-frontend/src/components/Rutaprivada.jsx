// src/components/RutaPrivada.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const RutaPrivada = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario) {
    // Si no hay sesión, redirige al login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RutaPrivada;
