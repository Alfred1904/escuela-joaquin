// src/components/Header.jsx
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import BotonCerrarSesion from "./Botoncerrarsesion.jsx"

const Header = () => {
  const { estaAutenticado } = useAuth();

  return (
    <header className="header-principal">
      <h1>Proyecto Educación Abierta</h1>

      {estaAutenticado && (
        <div className="zona-sesion">
          <BotonCerrarSesion />
        </div>
      )}
    </header>
  );
};

export default Header;
