// src/pages/Perfiles.jsx
import React, { useState } from "react"; // useState para manejar el formulario y la lista local de perfiles
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable (título + subtítulo)
import "../Style/indexperfiles.css"; // Estilos específicos de la página de Perfiles

// ==============================
// Catálogos de opciones (selects)
// ==============================

// Perfiles de ESTUDIANTE (opciones base para el <select>)
const opcionesEstudiante = ["Estudiante actual EGBA", "Estudiante EDAD"];

// Perfiles de DOCENTE (se identifican con texto que inicia con "Docente")
const opcionesDocente = [
  "Docente de Matemática",
  "Docente de Estudios Sociales",
  "Docente de Español",
  "Docente de Ciencias",
  "Docente de Biología",
  "Docente de Inglés",
  "Docente de Formación Ciudadana",
];

// Otros perfiles (actores relacionados a la plataforma)
const opcionesOtros = [
  "Coordinador de sede",
  "Orientador(a)",
  "Director(a) del centro",
  "Gestor(a) local / comunidad",
  "Voluntario(a) / mentor(a)",
  "Equipo técnico Ruta EA",
  "Administrativo de matrícula",
  "Egresado(a) del programa",
];

// Opciones de grado / nivel para estudiantes (value = valor interno, label = texto visible)
const opcionesGrado = [
  { value: "7°", label: "7°" },
  { value: "8°", label: "8°" },
  { value: "9°", label: "9°" },
  { value: "Bachillerato", label: "Bachillerato" },
];

const Perfiles = () => {
  // PERFIL DEL USUARIO ACTUAL (en producción vendría de AuthContext / login)
  // Aquí solo simulamos que la persona que usa la pantalla es docente:
  const [perfilUsuarioActual] = useState("Docente de Matemática");

  // Bandera simple de UI:
  // - Si el perfil actual inicia con "Docente", habilita edición de estudiantes en la interfaz
  const usuarioEsDocente = perfilUsuarioActual.startsWith("Docente");

  // ==============================
  // Estados del formulario (inputs)
  // ==============================
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(""); // tipo de perfil elegido (estudiante/docente/otros)
  const [nombre, setNombre] = useState(""); // nombre completo
  const [correo, setCorreo] = useState(""); // correo electrónico
  const [rol, setRol] = useState(""); // estudiantes: grado/nivel | otros: especialidad/rol

  // Estado para identificar si se está editando un estudiante existente
  // - null: modo crear
  // - id: modo edición
  const [editandoEstudianteId, setEditandoEstudianteId] = useState(null);

  // Lista local de perfiles registrados en la sesión
  // En producción esto podría venir del backend
  const [perfilesRegistrados, setPerfilesRegistrados] = useState([]);

  // Bandera rápida para saber si el perfil seleccionado pertenece a estudiantes
  const esEstudianteSeleccionado = opcionesEstudiante.includes(perfilSeleccionado);

  // =======================
  // SUBMIT DEL FORMULARIO
  // =======================
  const manejarSubmit = (e) => {
    e.preventDefault(); // evita recarga del navegador

    // Validación mínima: perfil + nombre + correo
    if (!perfilSeleccionado || !nombre.trim() || !correo.trim()) {
      alert("Selecciona un perfil y completa nombre y correo.");
      return;
    }

    // Determina el tipo de perfil según los catálogos definidos arriba
    const esEstudiante = opcionesEstudiante.includes(perfilSeleccionado);
    const esDocente = opcionesDocente.includes(perfilSeleccionado);

    // Reglas adicionales: si es estudiante, debe escoger grado/nivel
    if (esEstudiante && !rol) {
      alert("Selecciona el grado o nivel del estudiante.");
      return;
    }

    // Construcción del objeto que se guardará en la lista local
    // - Si estamos editando, conserva el id actual; si no, genera id con Date.now()
    const nuevoPerfil = {
      id: editandoEstudianteId || Date.now(),
      perfil: perfilSeleccionado,
      nombre: nombre.trim(),
      correo: correo.trim(),
      rol,           // estudiantes: grado/nivel; otros: especialidad
      esEstudiante,
      esDocente,
    };

    // Guarda en el arreglo:
    // - Si está editando un estudiante: reemplaza el registro existente
    // - Si no: agrega uno nuevo
    setPerfilesRegistrados((prev) => {
      // Si estamos editando estudiante, reemplazamos el existente
      if (esEstudiante && editandoEstudianteId) {
        return prev.map((p) =>
          p.id === editandoEstudianteId ? nuevoPerfil : p
        );
      }
      // Si no estamos editando, agregamos uno nuevo
      return [...prev, nuevoPerfil];
    });

    // Reset de formulario y salida de modo edición
    setEditandoEstudianteId(null);
    setPerfilSeleccionado("");
    setNombre("");
    setCorreo("");
    setRol("");
  };

  // Cargar datos de un estudiante para edición (SOLO si el usuario es docente)
  const manejarEditarEstudiante = (estudiante) => {
    if (!usuarioEsDocente) return; // seguridad en la UI

    // Activa modo edición usando el id del estudiante
    setEditandoEstudianteId(estudiante.id);

    // Forzar que el perfil seleccionado sea uno de estudiante (por consistencia del formulario)
    setPerfilSeleccionado(
      opcionesEstudiante.includes(estudiante.perfil)
        ? estudiante.perfil
        : opcionesEstudiante[0]
    );

    // Pre-llenar campos del formulario con los datos existentes
    setNombre(estudiante.nombre);
    setCorreo(estudiante.correo);
    setRol(estudiante.rol); // su grado actual
  };

  // ==========================
  // SEPARAR Y AGRUPAR RESULTADOS
  // ==========================

  // Filtra perfiles por tipo (para renderizar listados separados)
  const estudiantesRegistrados = perfilesRegistrados.filter((p) => p.esEstudiante);
  const docentesRegistrados = perfilesRegistrados.filter((p) => p.esDocente);
  const otrosRegistrados = perfilesRegistrados.filter(
    (p) => !p.esEstudiante && !p.esDocente
  );

  // Agrupar estudiantes por grado/nivel (rol) para mostrar por secciones
  const estudiantesPorGrado = estudiantesRegistrados.reduce((acc, estudiante) => {
    const clave =
      estudiante.rol && estudiante.rol.trim() !== ""
        ? estudiante.rol
        : "Grado / nivel sin especificar";

    if (!acc[clave]) acc[clave] = [];
    acc[clave].push(estudiante);
    return acc;
  }, {});

  return (
    // Contenedor principal de página (layout general)
    <div className="page page-panel">
      {/* Encabezado de la página */}
      <PageHeader
        title="Perfiles de usuarios de la plataforma"
        subtitle="Personas y actores involucrados en la ruta de Educación Abierta."
      />

      {/* Texto introductorio general */}
      <p>
        Incluye estudiantes, docentes, orientadores, gestores locales, ciudadanía y
        equipo técnico del proyecto Ruta EA.
      </p>

      {/* Sección principal */}
      <section className="perfiles-section">
        {/* Explicación/guía para uso del formulario */}
        <h4 className="perfiles-intro">
          Utiliza este formulario para registrar uno o varios perfiles asociados a una
          misma persona. Selecciona el tipo de perfil, completa los datos y presiona
          &quot;Guardar perfil&quot;. Solo los perfiles que inician con
          &nbsp;<strong>&quot;Docente&quot;</strong> pueden editar la información de los
          estudiantes.
        </h4>

        {/* CONTENEDOR PRINCIPAL: FOTO + FORMULARIO */}
        <div className="perfil-form-wrapper">
          {/* Placeholder visual para foto profesional (puede reemplazarse por imagen real) */}
          <div className="perfil-foto">
            <span className="perfil-foto-texto">Foto profesional</span>
          </div>

          {/* Formulario de registro/edición */}
          <form className="perfil-form" onSubmit={manejarSubmit}>
            {/* PERFIL */}
            <div className="perfil-form-row">
              <label className="perfil-label">
                <span className="perfil-label-strong">Perfil:</span>
                {/* Select con optgroup para clasificar opciones */}
                <select
                  className="perfil-select"
                  value={perfilSeleccionado}
                  onChange={(e) => setPerfilSeleccionado(e.target.value)}
                >
                  <option value="">Seleccionar perfil</option>

                  <optgroup label="Perfiles de estudiante">
                    {opcionesEstudiante.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="Docentes">
                    {opcionesDocente.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </optgroup>

                  <optgroup label="Otros perfiles">
                    {opcionesOtros.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </label>
            </div>

            {/* NOMBRE */}
            <div className="perfil-form-row">
              <label className="perfil-label">
                <span className="perfil-label-strong">Nombre completo:</span>
                <input
                  type="text"
                  className="perfil-input"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Escriba el nombre completo"
                />
              </label>
            </div>

            {/* CORREO */}
            <div className="perfil-form-row">
              <label className="perfil-label">
                <span className="perfil-label-strong">Correo electrónico:</span>
                <input
                  type="email"
                  className="perfil-input"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@correo.com"
                />
              </label>
            </div>

            {/* GRADO (SELECT) O ESPECIALIDAD (INPUT) */}
            <div className="perfil-form-row">
              <label className="perfil-label">
                {/* El label cambia según si el perfil seleccionado es estudiante */}
                <span className="perfil-label-strong">
                  {esEstudianteSeleccionado ? "Grado o nivel:" : "Especialidad / rol:"}
                </span>

                {/* Si es estudiante: select con grados; si no: input libre */}
                {esEstudianteSeleccionado ? (
                  <select
                    className="perfil-select"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="">Seleccionar grado o nivel</option>
                    {opcionesGrado.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="perfil-input"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    placeholder="Indique la especialidad o rol"
                  />
                )}
              </label>
            </div>

            {/* Botón principal:
                - Si estás editando un estudiante => texto “Actualizar estudiante”
                - Si no => “Guardar perfil”
            */}
            <button type="submit" className="perfil-boton">
              {esEstudianteSeleccionado && editandoEstudianteId
                ? "Actualizar estudiante"
                : "Guardar perfil"}
            </button>
          </form>
        </div>

        {/* LISTADOS SEPARADOS */}
        {/* Solo se muestran si existe al menos 1 perfil registrado */}
        {perfilesRegistrados.length > 0 && (
          <div className="perfiles-registrados">
            {/* Estudiantes agrupados por grado / nivel */}
            {estudiantesRegistrados.length > 0 && (
              <>
                <h5>Estudiantes registrados por grado o nivel:</h5>
                {/* Object.entries para iterar grupos; sort para orden alfabético */}
                {Object.entries(estudiantesPorGrado)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([grado, lista]) => (
                    <div key={grado} className="grupo-grado">
                      <strong>{grado}</strong>
                      <ul>
                        {lista.map((p) => (
                          <li key={p.id}>
                            {p.nombre} ({p.correo})
                            {/* SOLO LOS PERFILES QUE INICIAN CON "Docente" PUEDEN EDITAR */}
                            {usuarioEsDocente && (
                              <button
                                type="button"
                                className="link-editar"
                                onClick={() => manejarEditarEstudiante(p)}
                              >
                                Editar
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                <hr />
              </>
            )}

            {/* Docentes */}
            {docentesRegistrados.length > 0 && (
              <>
                <h5>Perfiles de docentes registrados:</h5>
                <ul>
                  {docentesRegistrados.map((p) => (
                    <li key={p.id}>
                      <strong>{p.perfil}</strong> – {p.nombre} ({p.correo})
                      {/* rol aquí se usa como “especialidad/rol adicional” si se llenó */}
                      {p.rol && <> – {p.rol}</>}
                    </li>
                  ))}
                </ul>
                <hr />
              </>
            )}

            {/* Otros perfiles */}
            {otrosRegistrados.length > 0 && (
              <>
                <h5>Otros perfiles registrados:</h5>
                <ul>
                  {otrosRegistrados.map((p) => (
                    <li key={p.id}>
                      <strong>{p.perfil}</strong> – {p.nombre} ({p.correo})
                      {/* rol aquí se usa como “especialidad/rol adicional” si se llenó */}
                      {p.rol && <> – {p.rol}</>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Perfiles; // Exporta la página para usarla en el Routing (ruta /perfiles)