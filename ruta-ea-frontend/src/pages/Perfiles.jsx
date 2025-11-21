import React, { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import "../Style/indexperfiles.css";

// Lista de perfiles que se mostrarán en las tarjetas
const perfilesData = [
  { id: 1, titulo: "Perfil 01 – Estudiante actual EGBA" },
  { id: 2, titulo: "Perfil 02 – Estudiante EDAD" },
  { id: 3, titulo: "Perfil 03 – Docente de Matemática" },
  { id: 4, titulo: "Perfil 04 – Docente de Estudios Sociales" },
  { id: 5, titulo: "Perfil 05 – Docente de Español" },
  { id: 6, titulo: "Perfil 06 – Docente de Ciencias" },
  { id: 7, titulo: "Perfil 07 – Orientador(a)" },
  { id: 8, titulo: "Perfil 08 – Director(a) del centro" },
  { id: 9, titulo: "Perfil 09 – Gestor(a) local / comunidad" },
  { id: 10, titulo: "Perfil 10 – Voluntario(a) / mentor(a)" },
  { id: 11, titulo: "Perfil 11 – Equipo técnico Ruta EA" },
  { id: 12, titulo: "Perfil 12 – Administrativo de matrícula" },
  { id: 13, titulo: "Perfil 13 – Egresado(a) del programa" },
];

// Tarjeta individual, editable de forma independiente
const PerfilCard = ({ titulo }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [editando, setEditando] = useState(true);

  const manejarGuardar = () => {
    // Aquí podrías enviar la info al backend más adelante
    setEditando(false);
  };

  const manejarEditar = () => {
    setEditando(true);
  };

  return (
    <article className="perfil-card">
      {/* Espacio para foto profesional */}
      <div className="perfil-foto">
        {/* Aquí luego puedes colocar un <img src="..." alt="Foto profesional" /> */}
        <span className="perfil-foto-texto">Foto profesional</span>
      </div>

      {/* Información del perfil */}
      <div className="perfil-info">
        <h2 className="perfil-titulo">{titulo}</h2>

        {editando ? (
          <>
            <label className="perfil-label">
              <strong>Nombre completo:</strong>
              <input
                type="text"
                className="perfil-input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escriba el nombre completo"
              />
            </label>

            <label className="perfil-label">
              <strong>Correo electrónico:</strong>
              <input
                type="email"
                className="perfil-input"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="ejemplo@correo.com"
              />
            </label>

            <label className="perfil-label">
              <strong>Especialidad / rol:</strong>
              <input
                type="text"
                className="perfil-input"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                placeholder="Indique la especialidad o rol"
              />
            </label>

            <button className="perfil-boton" onClick={manejarGuardar}>
              Guardar
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Nombre completo:</strong>{" "}
              {nombre || "Sin definir"}
            </p>
            <p>
              <strong>Correo electrónico:</strong>{" "}
              {correo || "Sin definir"}
            </p>
            <p>
              <strong>Especialidad / rol:</strong>{" "}
              {rol || "Sin definir"}
            </p>

            <button className="perfil-boton secundario" onClick={manejarEditar}>
              Editar
            </button>
          </>
        )}
      </div>
    </article>
  );
};

const Perfiles = () => {
  return (
    <div className="page page-panel">
      <PageHeader
        title="Perfiles de usuarios de la plataforma"
        subtitle="Personas y actores involucrados en la ruta de Educación Abierta."
      />

      <p>
        Incluye estudiantes, docentes, orientadores, gestores locales, ciudadanía y
        equipo técnico del proyecto Ruta EA.
      </p>

      <section className="perfiles-section">
        <h4 className="perfiles-intro">
          A continuación se presentan 13 tarjetas de perfiles. Cada tarjeta deja espacio
          para registrar nombre completo, correo electrónico y especialidad o rol dentro
          de la Ruta de Educación Abierta.
        </h4>

        <div className="perfiles-grid">
          {perfilesData.map((perfil) => (
            <PerfilCard key={perfil.id} titulo={perfil.titulo} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Perfiles;
