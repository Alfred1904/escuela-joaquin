import React from "react"; // React para definir el componente funcional
import PageHeader from "../components/PageHeader.jsx"; // Componente reutilizable para encabezado de página (título + subtítulo)
import "../Style/indexcontacto.css"; // Estilos específicos de la página de contacto

// Página: Contacto
// - Muestra información de contacto institucional de la sede
// - Lista correos del personal por departamento
// Nota: Este componente es estático (no usa estados ni consumo de API)
const Contacto = () => {
  return (
    // Contenedor general de la página
    // Clases: "page" (layout base) + "page-contacto" (estilo específico)
    <div className="page page-contacto">

     {/* Encabezado reutilizable de página */}
     <PageHeader
        title="Contacto Sede Escuela Joaquín García Monge"
        subtitle="Canales de comunicación con la escuela y el proyecto."
      />

      {/* Sección principal de contenido de contacto */}
      <section className="contacto-section">
        {/* Texto introductorio de la sección */}
        <p className="contacto-intro">
          Incluye información básica de la Escuela Joaquín García Monge y del equipo Ruta EA, además de un formulario de contacto.
        </p>

        {/* Bloque principal (destacado) con datos institucionales generales */}
        <div className="contacto-bloque contacto-bloque-principal">
          {/* “Chip” o etiqueta visual para resaltar el tipo de información */}
          <div className="contacto-chip-titulo">Correo institucional</div>

          {/* Correos oficiales (institucional + alternativo) */}
          <p className="contacto-texto">
            ea.escjoaquingarciamonge@mep.go.cr / educacionabiertajoaquingarciamonge@outlook.es
          </p>

          {/* Teléfono de contacto */}
          <p className="contacto-texto">Teléfono: +506 2259-2296 ext 110</p>
        </div>

        {/* Título de sección para la lista de correos del personal */}
        <h2 className="contacto-subtitulo-seccion">
          Correo electrónico del personal docente y administrativo
        </h2>

        {/* Bloque: Alfabetización (I & II Ciclo) */}
        <div className="contacto-bloque">
          <div className="contacto-chip">Alfabetización - I & II Ciclo</div>
          <div className="contacto-lista">
            <p>alejandro.bolanos.solano@mep.go.cr</p>
            <p>erika.ramirez.gomez@mep.go.cr</p>
            <p>vanessa.gonzalez.lopez@mep.go.cr</p>
          </div>
        </div>

        {/* Bloque: Departamento de Idiomas */}
        <div className="contacto-bloque">
          <div className="contacto-chip">Departamento de Idiomas</div>
          <div>
            {/* Sub-sección: Español */}
            <div className="contacto-subheading">Español</div>
            <div className="contacto-lista">
              <p>jennifer.loria.valverde@mep.go.cr</p>
              <p>lidia.castillo.vindas@mep.go.cr</p>
            </div>

            {/* Sub-sección: Inglés */}
            <div className="contacto-subheading">Inglés</div>
            <div className="contacto-lista">
              <p>barbara.barquero.moya@mep.go.cr</p>
            </div>
          </div>
        </div>

        {/* Bloque: Estudios Sociales & Formación Ciudadana */}
        <div className="contacto-bloque">
          <div className="contacto-chip">
            Departamento de Estudios Sociales & Formación ciudadana
          </div>
          <div className="contacto-lista">
            <p>olga.gamboa.munoz@mep.go.cr</p>
            <p>ronald.arias.rivera@mep.go.cr</p>
            <p>jose.torres.rivera@mep.go.cr</p>
          </div>
        </div>

        {/* Bloque: Ciencias Naturales & Biología */}
        <div className="contacto-bloque">
          <div className="contacto-chip">
            Departamento de Ciencias naturales & Biología
          </div>
          <div className="contacto-lista">
            <p>deikel.corella.fallas@mep.go.cr</p>
          </div>
        </div>

        {/* Bloque: Matemáticas */}
        <div className="contacto-bloque">
          <div className="contacto-chip">Departamento de Matemáticas</div>
          <div className="contacto-lista">
            <p>danny.rosales.obando@mep.go.cr</p>
          </div>
        </div>

        {/* Bloque: Coordinación de sede */}
        <div className="contacto-bloque">
          <div className="contacto-chip">Coordinador de la Sede</div>
          <div className="contacto-lista">
            <p>angie.gomez.guzman@mep.go.cr</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto; // Exporta la página para ser usada en el Routing (ruta /contacto)