import React, { useState } from "react"; // useState para manejar estados del formulario y la lista local
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable de página (título + subtítulo)
import "../Style/indexarchivos.css"; // Estilos específicos de la página de Archivos

// Página: Archivos
// - Columna izquierda: formulario para “subir” (simulado) un archivo
// - Columna derecha: lista de archivos disponibles para descargar
// Nota: actualmente todo funciona en memoria (estado local). Luego se conecta al backend.
const Archivos = () => {
  // Estados básicos solo para estructura (luego los conectas al backend)
  const [selectedFile, setSelectedFile] = useState(null); // Archivo seleccionado desde el input type="file"
  const [categoria, setCategoria] = useState(""); // Categoría elegida en el select
  const [descripcion, setDescripcion] = useState(""); // Descripción opcional escrita en el textarea

  // Lista de ejemplo (luego la reemplazas por datos reales del backend)
  // - Se renderiza en la columna derecha
  // - Por ahora "url" es "#", luego vendrá del servidor (S3, local media, etc.)
  const [archivos, setArchivos] = useState([
    {
      id: 1,
      nombre: "Calendario_examenes_2025.pdf",
      categoria: "Calendarios",
      descripcion: "Fechas de exámenes Educación Abierta 2025.",
      peso: "245 KB",
      fecha: "Actualizado en noviembre 2024",
      url: "#",
    },
    {
      id: 2,
      nombre: "Requisitos_matricula_EGBA.pdf",
      categoria: "Requisitos",
      descripcion: "Lista de documentos para matrícula en Educación Abierta.",
      peso: "180 KB",
      fecha: "Actualizado en octubre 2024",
      url: "#",
    },
  ]);

  // Handler del submit del formulario
  // - Previene recarga
  // - Valida requisitos mínimos (archivo + categoría)
  // - Simula “subida” agregando el archivo a la lista local
  const handleSubmit = (e) => {
    e.preventDefault();

    // Estructura de envío (placeholder)
    // Si no hay archivo o no se eligió categoría, no hace nada
    if (!selectedFile || !categoria) return;

    // Aquí iría la lógica real de subida (fetch/axios hacia tu API)
    // Por ahora solo simulamos agregarlo a la lista local:
    const nuevoArchivo = {
      id: Date.now(), // ID temporal único en frontend (luego lo dará el backend)
      nombre: selectedFile.name, // Nombre real del archivo seleccionado
      categoria, // Categoría elegida por el usuario
      descripcion: descripcion || "Sin descripción", // Fallback si no escribe descripción
      peso: `${Math.round(selectedFile.size / 1024)} KB`, // Tamaño aproximado en KB
      fecha: "Recién subido", // Texto de ejemplo (luego vendrá de backend)
      url: "#", // luego esto vendrá del backend (link real para descargar)
    };

    // Inserta el nuevo archivo al inicio de la lista (más reciente arriba)
    setArchivos([nuevoArchivo, ...archivos]);

    // Limpia estados del formulario (UI)
    setSelectedFile(null);
    setCategoria("");
    setDescripcion("");

    // Resetea el input file visualmente (porque es no-controlado)
    e.target.reset();
  };

  return (
    // Contenedor general de página
    // "page page-panel" se usa en tu sistema de estilos para consistencia
    <div className="page page-panel">
      {/* Encabezado reutilizable */}
      <PageHeader
        title="Archivos"
        subtitle="Sube y descarga documentos oficiales de la Escuela Joaquín García Monge."
      />

      {/* Sección principal de archivos */}
      <section className="archivos-section">
        <div className="archivos-layout">
          {/* Columna izquierda: subir archivos */}
          <div className="archivos-upload">
            <h2 className="archivos-titulo">Subir archivo</h2>
            <p className="archivos-texto-intro">
              Aquí podrás cargar circulares, calendarios, requisitos y otros
              documentos para que la comunidad educativa los descargue de forma
              segura.
            </p>

            {/* Formulario de “subida” */}
            <form className="archivos-form" onSubmit={handleSubmit}>
              {/* Archivo */}
              <div className="archivos-field">
                <label className="archivos-label">
                  Selecciona un archivo
                  <span className="archivos-label-hint">
                    (PDF, imágenes u otros documentos permitidos)
                  </span>
                </label>

                {/* Input file:
                    - No se controla con value (por seguridad del navegador)
                    - onChange guarda el primer archivo seleccionado */}
                <input
                  type="file"
                  className="archivos-input-file"
                  onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                />
              </div>

              {/* Categoría */}
              <div className="archivos-field">
                <label className="archivos-label">Categoría</label>

                {/* Select controlado:
                    - value viene del estado
                    - onChange actualiza el estado */}
                <select
                  className="archivos-input"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Calendarios">Calendarios</option>
                  <option value="Requisitos">Requisitos</option>
                  <option value="Circulares">Circulares</option>
                  <option value="Material de estudio">Material de estudio</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              {/* Descripción */}
              <div className="archivos-field">
                <label className="archivos-label">
                  Descripción breve (opcional)
                </label>

                {/* Textarea controlado */}
                <textarea
                  className="archivos-textarea"
                  rows={3}
                  placeholder="Ejemplo: Calendario de exámenes trimestrales de Educación Abierta."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              {/* Botón submit:
                  - Se deshabilita si falta archivo o categoría */}
              <button
                type="submit"
                className="archivos-button"
                disabled={!selectedFile || !categoria}
              >
                Guardar archivo
              </button>
            </form>
          </div>

          {/* Columna derecha: lista de archivos */}
          <div className="archivos-lista-wrapper">
            <h2 className="archivos-titulo">Archivos disponibles</h2>
            <p className="archivos-texto-intro">
              Descarga los documentos oficiales puestos a disposición por la
              institución.
            </p>

            {/* (Opcional) filtros simples por categoría más adelante */}

            {/* Listado */}
            <div className="archivos-lista">
              {/* Estado vacío: cuando no hay archivos en la lista */}
              {archivos.length === 0 ? (
                <p className="archivos-vacio">
                  Todavía no hay archivos publicados. Una vez que se suban, los
                  verás listados aquí.
                </p>
              ) : (
                // Mapeo de archivos para renderizar cada tarjeta
                archivos.map((archivo) => (
                  <article key={archivo.id} className="archivo-card">
                    {/* Bloque de info del archivo */}
                    <div className="archivo-info">
                      <h3 className="archivo-nombre">{archivo.nombre}</h3>
                      <p className="archivo-descripcion">
                        {archivo.descripcion}
                      </p>

                      {/* Meta info: categoría, peso, fecha */}
                      <div className="archivo-meta">
                        <span className="archivo-categoria">
                          {archivo.categoria}
                        </span>
                        <span className="archivo-detalle">{archivo.peso}</span>
                        <span className="archivo-detalle">{archivo.fecha}</span>
                      </div>
                    </div>

                    {/* Link de descarga:
                        - href usa archivo.url (actualmente "#")
                        - atributo download sugiere descargar en vez de navegar */}
                    <a
                      href={archivo.url}
                      className="archivo-descargar"
                      download
                    >
                      Descargar
                    </a>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Archivos; // Exporta la página para usarla en Routing (ruta /archivos)