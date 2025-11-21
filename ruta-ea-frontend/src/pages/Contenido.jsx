import React from "react";
import PageHeader from "../components/PageHeader.jsx";
import "../Style/indexcontenidoea.css";
const Contenido = () => {
  return (
    <div className="page page-panel">
      <PageHeader
        title="Misión y visión sobre Educación Abierta"
        subtitle="Información clave del modelo y sus componentes."
      />
      <section className="contenido-section">
        <div className="contenido-intro">
          <h4>
            Aquí se describen estructura, fortalezas, áreas de mejora y
            recomendaciones del modelo de Educación Abierta (EGBA / EDAD).
          </h4>
        </div>

        <div className="contenido-grid">
          <article className="contenido-card">
            <h3 className="contenido-titulo">Misión</h3>
            <p>
              Somos una institución que ofrece una educación integral fundamentada en los
              valores y el pensamiento crítico, a través de una enseñanza de calidad e
              innovación, mediante el desarrollo de destrezas y habilidades, que permitan a
              los estudiantes brindar aportes constructivos a nuestra sociedad.
            </p>
          </article>

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


export default Contenido;

