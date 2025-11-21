import React from "react";
import PageHeader from "../components/PageHeader.jsx";
import logoRutaEA from "../assets/logo_ruta_ea.png"; // 👈 importar imagen

const Inicio = () => {
  return (
    <div className="page">
      <PageHeader
        title="Ruta EA – Educación Abierta"
        subtitle="Escuela Joaquín García Monge"
      />

      {/* Bloque con imagen */}
      <div className="hero-logo">
        <img
          src={logoRutaEA}
          alt="Logo del proyecto Ruta EA"
          className="hero-logo-img"
        />
      </div>
    </div>
  );
};
