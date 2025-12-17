import React from "react";
// GUÍA: Importa React para poder definir componentes y usar JSX.

import PageHeader from "../components/PageHeader.jsx";
// GUÍA: Componente reutilizable para mostrar el encabezado (título + subtítulo) de la página.

import logoRutaEA from "../assets/logo_ruta_ea.png"; // 👈 importar imagen
// GUÍA: Importa la imagen desde la carpeta assets.
// En React/Vite, esto devuelve una URL lista para usar en <img src="...">.

const Inicio = () => {
  // GUÍA: Componente funcional que representa la página de inicio.
  // Normalmente se renderiza cuando la ruta es "/".
  return (
    <div className="page">
      {/* GUÍA: Contenedor general de página (clase usada para márgenes/espaciado en CSS global). */}

      <PageHeader
        title="Ruta EA – Educación Abierta"
        subtitle="Escuela Joaquín García Monge"
      />
      {/* GUÍA: Encabezado de la página.
          - title: texto principal (h1 normalmente)
          - subtitle: texto secundario debajo */}

      {/* Bloque con imagen */}
      <div className="hero-logo">
        {/* GUÍA: Contenedor de la imagen “hero”.
            Útil para centrar, limitar tamaño y aplicar padding con CSS. */}

        <img
          src={logoRutaEA}
          alt="Logo del proyecto Ruta EA"
          className="hero-logo-img"
        />
        {/* GUÍA: Imagen del logo.
            - src: la ruta/URL importada
            - alt: texto alternativo (accesibilidad y SEO)
            - className: estilos específicos (tamaño, borde, sombra, etc.) */}
      </div>
    </div>
  );
};

export default Inicio;
// GUÍA: Exportación por defecto para poder importarlo en las rutas (App/Routing).