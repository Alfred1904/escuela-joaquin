import React from "react";
import PageHeader from "../components/PageHeader.jsx";
import "../Style/indexcontacto.css";

const Contacto = () => {
  return (
    <div className="page page-contacto">

     <PageHeader
        title="Contacto Sede Escuela Joaquín García Monge"
        subtitle="Canales de comunicación con la escuela y el proyecto."
      />
      <section className="contacto-section">
        <p className="contacto-intro">Incluye información básica de la Escuela Joaquín García Monge y del equipo Ruta EA, además de un formulario de contacto.</p>

        <div className="contacto-bloque contacto-bloque-principal">
          <div className="contacto-chip-titulo">Correo institucional</div>
          <p className="contacto-texto">ea.escjoaquingarciamonge@mep.go.cr / educacionabiertajoaquingarciamonge@outlook.es</p>
          <p className="contacto-texto">Teléfono: +506 2259-2296 ext 110</p>
        </div>

        <h2 className="contacto-subtitulo-seccion">Correo electrónico del personal docente y administrativo</h2>

        <div className="contacto-bloque">
          <div className="contacto-chip">Alfabetización - I & II Ciclo</div>
          <div className="contacto-lista">
            <p>alejandro.bolanos.solano@mep.go.cr</p>
            <p>erika.ramirez.gomez@mep.go.cr</p>
            <p>vanessa.gonzalez.lopez@mep.go.cr</p>
          </div>
        </div>

        <div className="contacto-bloque">
          <div className="contacto-chip">Departamento de Idiomas</div>
          <div>
            <div className="contacto-subheading">Español</div>
            <div className="contacto-lista">
              <p>jennifer.loria.valverde@mep.go.cr</p>
              <p>lidia.castillo.vindas@mep.go.cr</p>
            </div>
            <div className="contacto-subheading">Inglés</div>
            <div className="contacto-lista">
              <p>barbara.barquero.moya@mep.go.cr</p>
            </div>
          </div>
        </div>

        <div className="contacto-bloque">
          <div className="contacto-chip">Departamento de Estudios Sociales & Formación ciudadana</div>
          <div className="contacto-lista">
            <p>olga.gamboa.munoz@mep.go.cr</p>
            <p>ronald.arias.rivera@mep.go.cr</p>
            <p>jose.torres.rivera@mep.go.cr</p>
          </div>
        </div>

        <div className="contacto-bloque">
          <div className="contacto-chip">Departamento de Ciencias naturales & Biología</div>
          <div className="contacto-lista">
            <p>deikel.corella.fallas@mep.go.cr</p>
          </div>
        </div>

        <div className="contacto-bloque">
          <div className="contacto-chip">Departamento de Matemáticas</div>
          <div className="contacto-lista">
            <p>danny.rosales.obando@mep.go.cr</p>
          </div>
        </div>

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

export default Contacto;
