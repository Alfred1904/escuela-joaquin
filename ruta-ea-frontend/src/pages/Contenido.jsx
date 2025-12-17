import React from "react"; // React para definir el componente funcional
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable (título + subtítulo)
import "../Style/indexcontenidoea.css"; // Estilos específicos de la sección “Contenido EA”

// Página: Contenido EA (Misión y Visión)
// - Componente estático (no usa estados ni consume API)
// - Presenta información institucional alineada a Educación Abierta (EGBA / EDAD)
const Contenido = () => {
  return (
    // Contenedor principal de la página
    // "page page-panel" mantiene el layout uniforme con otras páginas
    <div className="page page-panel">
      {/* Encabezado de página reutilizable */}
      <PageHeader
        title="Misión y visión sobre Educación Abierta"
        subtitle="Información clave del modelo y sus componentes."
      />

      {/* Sección de contenido principal */}
      <section className="contenido-section">
        {/* Bloque introductorio: describe qué se encontrará en la página */}
        <div className="contenido-intro">
          <h4>
            Aquí se describen estructura, fortalezas, áreas de mejora y
            recomendaciones del modelo de Educación Abierta (EGBA / EDAD).
          </h4>
        </div>

        {/* Grid de tarjetas: misión + visión */}
        <div className="contenido-grid">
          {/* Tarjeta 1: Misión */}
          <article className="contenido-card">
            <h3 className="contenido-titulo">Misión</h3>
            <p>
              Somos una institución que ofrece una educación integral fundamentada en los
              valores y el pensamiento crítico, a través de una enseñanza de calidad e
              innovación, mediante el desarrollo de destrezas y habilidades, que permitan a
              los estudiantes brindar aportes constructivos a nuestra sociedad.
            </p>
          </article>

          {/* Tarjeta 2: Visión */}
          <article className="contenido-card">
            <h3 className="contenido-titulo">Visión</h3>
            <p>
              Ser una institución educativa que fomente el desarrollo, la autonomía, el
              liderazgo, la solidaridad y el espíritu emprendedor de los estudiantes,
              promoviendo la construcción de su propia identidad para que se logren
              proyectarse favorablemente en la sociedad.
            </p>
          </article>
        </div>
      </section>
    
    </div>
  );
};

export default Contenido; // Exporta la página para usarla en el Routing (ruta /contenido)