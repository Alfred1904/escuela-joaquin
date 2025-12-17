import React from "react"; // React para definir el componente funcional

// PageHeader: encabezado reutilizable para páginas
// Props:
// - title: string => título principal de la página (obligatorio)
// - subtitle: string (opcional) => texto complementario/descriptivo debajo del título
const PageHeader = ({ title, subtitle }) => {
  return (
    // Contenedor semántico del encabezado de página
    // La clase "page-header" controla el estilo general (márgenes, tipografía, etc.)
    <section className="page-header">
      {/* Título principal de la página */}
      <h1>{title}</h1>

      {/* Subtítulo opcional:
         - Solo se renderiza si "subtitle" existe
         - Usa una clase específica para estilo diferenciado */}
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </section>
  );
};

export default PageHeader; // Exporta el componente para reutilizarlo en Inicio, Perfiles, Calendario, etc.