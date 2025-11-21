// src/components/BotonCerrarSesion.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const BotonCerrarSesion = () => {
  const { cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <button className="boton-cerrar-sesion" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default BotonCerrarSesion;
