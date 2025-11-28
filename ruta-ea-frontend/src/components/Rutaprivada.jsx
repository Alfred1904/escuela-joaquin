// src/components/RutaPrivada.jsx
import React from "react";
// import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const RutaPrivada = ({ children }) => {
  const { estaAutenticado } = useAuth();

  // Si no está autenticado, redirigir al login
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si sí está autenticado, mostrar el contenido protegido
  return children;
};

// PropTypes removed to avoid extra dev dependency requirement.

export default RutaPrivada;
