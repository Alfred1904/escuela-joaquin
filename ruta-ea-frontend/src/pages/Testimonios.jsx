import React, { useState } from "react"; // React + hook useState para manejar estado local
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable de página (título + subtítulo)
import "../Style/indextestimonios.css"; // Estilos específicos de la vista de testimonios

// ================================
// Datos base (mock/local)
// En producción: esto podría venir de un backend (API) o CMS
// ================================
const testimoniosData = [
  {
    id: 1, // Identificador único del testimonio (útil para render en listas)
    tipo: "estudiante", // Categoría usada para filtrar ("estudiante", "egresado", "docente")
    nombreMostrar: "María", // Nombre público a mostrar (puede ser parcial por privacidad)
    perfil: "Estudiante actual EGBA – 9°", // Rol/estado del testimonio
    anioReferencia: "2024", // Año para contexto temporal
    fraseDestacada:
      "Pensé que ya era tarde para estudiar, pero en la Joaquín García descubrí que nunca es tarde.", // Titular corto (headline)
    relatoCompleto:
      "Trabajo todo el día y en las noches vengo a la escuela. Al inicio me daba miedo no entender las materias, pero las explicaciones de los docentes y el acompañamiento de Ruta EA me ayudaron a organizarme. Hoy siento que el bachillerato ya no es un sueño lejano.", // Texto largo del testimonio
    etiquetas: ["Trabajo y estudio", "Motivación"], // Tags para resaltar temas (UI chips)
    destacado: true, // Si es true, se muestra como “hero” arriba
  },

  {
    id: 2,
    tipo: "egresado",
    nombreMostrar: "Carlos R.",
    perfil: "Egresado EDAD 2023",
    anioReferencia: "2023",
    fraseDestacada:
      "Terminar el bachillerato me abrió puertas de trabajo que antes ni siquiera podía solicitar.",
    relatoCompleto:
      "Dejé el colegio hace varios años y creía que ya no tenía sentido retomar. Con Educación Abierta pude avanzar a mi ritmo, traer mi experiencia de trabajo a las clases y prepararme para las pruebas. Ahora tengo un empleo formal y planeo seguir estudiando en la universidad.",
    etiquetas: ["Bachillerato", "Proyecto de vida"],
    destacado: false,
  },
  {
    id: 3,
    tipo: "docente",
    nombreMostrar: "Profa. Elena",
    perfil: "Docente de Estudios Sociales",
    anioReferencia: "2025",
    fraseDestacada:
      "Cada estudiante trae una historia de vida; nuestra tarea es que la escuela se adapte a esa historia y no al revés.",
    relatoCompleto:
      "En Educación Abierta veo madres, padres, personas trabajadoras y jóvenes que se dan una segunda oportunidad. El reto es acompañarles con empatía, claridad en los contenidos y flexibilidad en el proceso. Cuando reciben su título, también se transforma la vida de sus familias.",
    etiquetas: ["Docencia", "Acompañamiento"],
    destacado: false,
  },
];

// ================================
// Configuración de filtros de UI
// Estos valores deben coincidir con testimoniosData.tipo
// ================================
const filtros = [
  { id: "todos", label: "Todos los testimonios" }, // Muestra todos los registros
  { id: "estudiante", label: "Estudiantes" }, // Filtra por tipo "estudiante"
  { id: "egresado", label: "Egresados" }, // Filtra por tipo "egresado"
  { id: "docente", label: "Docentes" }, // Filtra por tipo "docente"
];

const Testimonios = () => {
  // ================================
  // Estado de filtro seleccionado (controla qué testimonios se muestran)
  // ================================
  const [filtroSeleccionado, setFiltroSeleccionado] = useState("todos");

  // ================================
  // Estado para comentarios (simulación local tipo YouTube)
  // En producción: se enviaría a backend y se traería desde API
  // ================================
  const [comentarios, setComentarios] = useState([]); // Array de comentarios publicados
  const [nombreComentario, setNombreComentario] = useState(""); // Campo "nombre" del formulario
  const [esAnonimo, setEsAnonimo] = useState(false); // Checkbox para publicar como anónimo
  const [textoComentario, setTextoComentario] = useState(""); // Contenido del comentario

  // Selección del testimonio destacado (hero):
  // - busca el primer testimonio con destacado=true
  // - si no existe, usa el primero del arreglo como fallback
  const hero = testimoniosData.find((t) => t.destacado) || testimoniosData[0];

  // Aplica filtro seleccionado:
  // - "todos": retorna el arreglo completo
  // - otro tipo: filtra por coincidencia con t.tipo
  const testimoniosFiltrados =
    filtroSeleccionado === "todos"
      ? testimoniosData
      : testimoniosData.filter((t) => t.tipo === filtroSeleccionado);

  // ================================
  // Submit del formulario de comentarios
  // - valida que haya texto
  // - construye el autor según "anónimo" o nombre
  // - agrega el comentario al inicio (más reciente arriba)
  // ================================
  const manejarEnviarComentario = (e) => {
    e.preventDefault(); // Evita recarga de página al enviar el form

    // Validación mínima: debe haber texto
    if (!textoComentario.trim()) {
      alert("Por favor escribe un comentario antes de enviarlo.");
      return;
    }

    // Define autor: si es anónimo o no hay nombre, se usa "Anónimo"
    const autor =
      esAnonimo || !nombreComentario.trim()
        ? "Anónimo"
        : nombreComentario.trim();

    // Objeto comentario: id único + autor + texto limpio
    const nuevoComentario = {
      id: Date.now(), // Id temporal para render. En backend vendría un id real.
      autor,
      texto: textoComentario.trim(),
    };

    // Agrega al inicio (comment newest first)
    setComentarios((prev) => [nuevoComentario, ...prev]);

    // Limpia solo el texto (opcional: podrías limpiar el nombre también)
    setTextoComentario("");
  };

  return (
    // Contenedor general de la página (layout consistente con el resto del sitio)
    <div className="page page-panel">
      {/* Encabezado reutilizable */}
      <PageHeader
        title="Testimonios e impacto"
        subtitle="Historias reales de estudiantes, egresados y docentes que participan en la Educación Abierta de la Escuela Joaquín García Monge."
      />

      {/* Sección principal de testimonios */}
      <section className="testimonios-section">
        {/* Intro: texto descriptivo para contextualizar la sección */}
        <p className="testimonios-intro">
          Recoge testimonios narrativos de personas jóvenes y adultas, personas
          trabajadoras y personal docente que forman parte de la modalidad de
          Educación Abierta (EGBA / EDAD). Estos relatos muestran el impacto del
          estudio nocturno, la validación por suficiencia y el acompañamiento que
          brinda la sede.
        </p>

        {/* Testimonio destacado (hero):
            Se muestra de forma prominente en la parte superior */}
        {hero && (
          <article className="testimonio-card testimonio-hero">
            {/* Titular del testimonio */}
            <h3>{hero.fraseDestacada}</h3>

            {/* Meta: nombre + perfil + año */}
            <p className="testimonio-meta">
              {hero.nombreMostrar} · {hero.perfil} · {hero.anioReferencia}
            </p>

            {/* Relato completo */}
            <p>{hero.relatoCompleto}</p>

            {/* Etiquetas (chips): se muestran solo si existen */}
            {hero.etiquetas?.length > 0 && (
              <div className="testimonio-tags">
                {hero.etiquetas.map((tag) => (
                  <span key={tag} className="testimonio-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        )}

        {/* Filtros por tipo de testimonio:
            Cada botón cambia el estado filtroSeleccionado */}
        <div className="testimonios-filtros">
          {filtros.map((f) => (
            <button
              key={f.id}
              type="button"
              className={
                // Marca visualmente el filtro activo
                f.id === filtroSeleccionado
                  ? "filtro-boton filtro-boton-activo"
                  : "filtro-boton"
              }
              onClick={() => setFiltroSeleccionado(f.id)} // Cambia el filtro actual
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Listado de testimonios (excluye el hero para no repetirlo):
            - usa el arreglo filtrado
            - remueve el elemento hero por id
            - renderiza el resto en grid */}
        <div className="testimonios-grid">
          {testimoniosFiltrados
            .filter((t) => t.id !== hero.id)
            .map((t) => (
              <article key={t.id} className="testimonio-card">
                <h3>{t.fraseDestacada}</h3>

                <p className="testimonio-meta">
                  {t.nombreMostrar} · {t.perfil} · {t.anioReferencia}
                </p>

                <p>{t.relatoCompleto}</p>

                {t.etiquetas?.length > 0 && (
                  <div className="testimonio-tags">
                    {t.etiquetas.map((tag) => (
                      <span key={tag} className="testimonio-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
        </div>

        {/* Sección de comentarios (tipo YouTube):
            - muestra contador
            - formulario de publicación
            - lista de comentarios */}
        <section className="comentarios-section">
          {/* Título con contador dinámico */}
          <h3 className="comentarios-titulo">
            Comentarios ({comentarios.length})
          </h3>

          {/* Formulario controlado por estado (inputs/textarea controlados) */}
          <form
            className="comentarios-form"
            onSubmit={manejarEnviarComentario}
          >
            {/* Nombre: opcional; se deshabilita si "Anónimo" está activo */}
            <div className="comentarios-form-row">
              <label className="comentarios-label">
                <span>Nombre (opcional):</span>
                <input
                  type="text"
                  className="comentarios-input"
                  value={nombreComentario}
                  onChange={(e) => setNombreComentario(e.target.value)}
                  placeholder="Escribe tu nombre o déjalo en blanco"
                  disabled={esAnonimo} // Si es anónimo, bloquea el input para coherencia
                />
              </label>
            </div>

            {/* Checkbox: controlar si se publica como anónimo */}
            <div className="comentarios-form-row comentarios-checkbox-row">
              <label className="comentarios-checkbox-label">
                <input
                  type="checkbox"
                  checked={esAnonimo}
                  onChange={(e) => setEsAnonimo(e.target.checked)}
                />
                <span>Comentar como Anónimo</span>
              </label>
            </div>

            {/* Texto del comentario: requerido por validación en submit */}
            <div className="comentarios-form-row">
              <label className="comentarios-label">
                <span>Tu comentario:</span>
                <textarea
                  className="comentarios-textarea"
                  value={textoComentario}
                  onChange={(e) => setTextoComentario(e.target.value)}
                  placeholder="Comparte tu experiencia, mensaje o consulta relacionada con los testimonios."
                  rows={4}
                />
              </label>
            </div>

            {/* Botón de publicar: dispara onSubmit del formulario */}
            <button type="submit" className="comentarios-boton">
              Publicar comentario
            </button>
          </form>

          {/* Lista de comentarios:
              - si está vacía, muestra un mensaje
              - si tiene elementos, renderiza cada comentario */}
          <div className="comentarios-lista">
            {comentarios.length === 0 ? (
              <p className="comentarios-vacio">
                Todavía no hay comentarios. Sé la primera persona en escribir
                uno.
              </p>
            ) : (
              comentarios.map((c) => (
                <article key={c.id} className="comentario-item">
                  {/* Autor (nombre o "Anónimo") */}
                  <p className="comentario-autor">{c.autor}</p>
                  {/* Texto del comentario */}
                  <p className="comentario-texto">{c.texto}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Testimonios; // Exporta la página para usarla en el Router (ruta /testimonios)