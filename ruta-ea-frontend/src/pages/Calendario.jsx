import React, { useState } from "react"; // useState para manejar estado interno (mes actual, día seleccionado, actividades, formulario)
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable (título + subtítulo)
import "../Style/indexcalendario.css"; // Estilos específicos de la página Calendario

// 🔧 Función auxiliar para formatear fecha a YYYY-MM-DD
// - Se usa para comparar fechas en forma de string (clave estable)
function formatearFecha(fecha) {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 🔧 Nombre del mes en español
// - Recibe un objeto Date y devuelve el nombre del mes (Enero...Diciembre)
function nombreMes(fecha) {
  const nombres = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return nombres[fecha.getMonth()];
}

const Calendario = () => {
  // Fecha del mes que se está mostrando (primer día del mes)
  // - Guardamos siempre un Date apuntando al día 1 del mes en pantalla
  const [mesActual, setMesActual] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  });

  // Día seleccionado
  // - Se maneja como string "YYYY-MM-DD" para comparaciones fáciles
  const [diaSeleccionado, setDiaSeleccionado] = useState(() => {
    const hoy = new Date();
    return formatearFecha(hoy);
  });

  // Lista de actividades: { id, fecha, titulo, nota }
  // - fecha es "YYYY-MM-DD"
  // - id se usa como key y para editar/eliminar
  const [actividades, setActividades] = useState([]);

  // Estado del formulario (crear / editar)
  // - Inputs controlados para título y nota
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");

  // Id de la actividad que se está editando (o null si estamos creando)
  // - null => modo “crear”
  // - number => modo “editar” esa actividad
  const [actividadEnEdicionId, setActividadEnEdicionId] = useState(null);

  // Generar días del mes en una cuadrícula (lunes a domingo)
  // - Produce un arreglo de celdas: vacías + días reales del mes
  // - Cada celda día trae: fechaClave y si tiene actividades
  const generarDiasMes = () => {
    const year = mesActual.getFullYear();
    const month = mesActual.getMonth();

    const primerDiaMes = new Date(year, month, 1);
    const ultimoDiaMes = new Date(year, month + 1, 0);
    const diasEnMes = ultimoDiaMes.getDate();

    // En JS, getDay(): 0 = domingo, 1 = lunes, ..., 6 = sábado
    // Queremos que la semana empiece en lunes (0 = lunes)
    const desplazamiento = (primerDiaMes.getDay() + 6) % 7;

    const celdas = [];

    // Celdas vacías antes del día 1 (para alinear lunes-domingo)
    for (let i = 0; i < desplazamiento; i++) {
      celdas.push({ tipo: "vacio", key: `vacio-${i}` });
    }

    // Celdas de los días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(year, month, dia);
      const fechaClave = formatearFecha(fecha);

      // Verifica si en ese día hay al menos una actividad registrada
      const tieneActividades = actividades.some(
        (act) => act.fecha === fechaClave
      );

      // Objeto “celda día” para render
      celdas.push({
        tipo: "dia",
        key: `dia-${dia}`,
        dia,
        fecha,
        fechaClave,
        tieneActividades,
      });
    }

    return celdas;
  };

  // Navegación entre meses
  // - Cambia el mes actual al mes anterior, siempre en día 1
  const irAlMesAnterior = () => {
    setMesActual(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  // - Cambia el mes actual al mes siguiente, siempre en día 1
  const irAlMesSiguiente = () => {
    setMesActual(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  // Actividades del día seleccionado
  // - Filtra la lista total para mostrar solo las del día en pantalla
  const actividadesDelDiaSeleccionado = actividades.filter(
    (act) => act.fecha === diaSeleccionado
  );

  // Manejo del formulario (crear o editar)
  // - Si actividadEnEdicionId es null => crea actividad nueva
  // - Si tiene id => actualiza (edita) esa actividad
  const manejarEnvioActividad = (e) => {
    e.preventDefault(); // Evita recarga de página
    if (!nuevoTitulo.trim()) return; // Validación mínima: título requerido

    if (actividadEnEdicionId === null) {
      // 👉 Modo CREAR
      const nuevaActividad = {
        id: Date.now(), // ID temporal (luego backend puede asignar)
        fecha: diaSeleccionado, // día al que se asigna
        titulo: nuevoTitulo.trim(), // título limpio
        nota: nuevaNota.trim(), // nota limpia (puede quedar vacía)
      };

      // Agrega al final de la lista (puedes cambiar a [nuevaActividad, ...prev] si quieres más reciente primero)
      setActividades((prev) => [...prev, nuevaActividad]);
    } else {
      // ✏️ Modo EDITAR
      // Recorre actividades y reemplaza la que coincide con actividadEnEdicionId
      setActividades((prev) =>
        prev.map((act) =>
          act.id === actividadEnEdicionId
            ? {
                ...act,
                titulo: nuevoTitulo.trim(),
                nota: nuevaNota.trim(),
              }
            : act
        )
      );
    }

    // Limpiar formulario y salir de modo edición
    setNuevoTitulo("");
    setNuevaNota("");
    setActividadEnEdicionId(null);
  };

  // Cambiar día seleccionado desde el calendario
  // - Actualiza la fecha seleccionada
  // - Limpia modo edición y formulario (para evitar editar en el día equivocado)
  const seleccionarDia = (fechaClave) => {
    setDiaSeleccionado(fechaClave);
    // Si cambias de día y estabas editando algo, se limpia la edición
    setActividadEnEdicionId(null);
    setNuevoTitulo("");
    setNuevaNota("");
  };

  // 👇 Preparar formulario para editar una actividad
  // - Carga datos de la actividad en el formulario
  // - Cambia a modo edición guardando el id
  // - Selecciona el día de esa actividad
  const empezarEdicion = (actividad) => {
    setActividadEnEdicionId(actividad.id);
    setNuevoTitulo(actividad.titulo);
    setNuevaNota(actividad.nota || "");
    setDiaSeleccionado(actividad.fecha);
  };

  // 👇 Cancelar edición
  // - Vuelve a modo “crear” limpiando id y campos
  const cancelarEdicion = () => {
    setActividadEnEdicionId(null);
    setNuevoTitulo("");
    setNuevaNota("");
  };

  // 🗑 Eliminar actividad
  // - Elimina por id filtrando el estado
  // - Si estabas editando esa misma actividad, limpia el formulario
  const eliminarActividad = (id) => {
    setActividades((prev) => prev.filter((act) => act.id !== id));

    // Si justo estábamos editando esa actividad, limpiamos el formulario
    if (actividadEnEdicionId === id) {
      setActividadEnEdicionId(null);
      setNuevoTitulo("");
      setNuevaNota("");
    }
  };

  return (
    // Contenedor general de la página calendario
    <div className="page page-calendario">
      {/* Encabezado de página */}
      <PageHeader
        title="Calendario y planificación de estudio"
        subtitle="Panorama general de eventos y plan de estudio."
      />

      {/* Texto descriptivo */}
      <p>
        Utiliza este calendario para planificar tus semanas de estudio, agregar
        simulacros, fechas de exámenes y otras actividades importantes.
      </p>

      {/* Contenedor principal: Panel calendario + panel detalle */}
      <div className="calendario-contenedor">
        {/* Panel del calendario mensual */}
        <section className="calendario-panel">
          {/* Header: navegación de meses */}
          <header className="calendario-header">
            <button type="button" onClick={irAlMesAnterior}>
              ←
            </button>
            <h2>
              {nombreMes(mesActual)} {mesActual.getFullYear()}
            </h2>
            <button type="button" onClick={irAlMesSiguiente}>
              →
            </button>
          </header>

          {/* Encabezado de días de la semana */}
          <div className="calendario-semana-header">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>

          {/* Grid de días */}
          <div className="calendario-grid">
            {generarDiasMes().map((celda) => {
              // Render de celdas vacías (alineación del calendario)
              if (celda.tipo === "vacio") {
                return (
                  <div
                    key={celda.key}
                    className="calendario-celda vacia"
                  />
                );
              }

              // Determina si este día es el seleccionado
              const esSeleccionado = celda.fechaClave === diaSeleccionado;

              return (
                // Celda día es un botón para seleccionar día
                <button
                  key={celda.key}
                  type="button"
                  className={`calendario-celda dia ${
                    esSeleccionado ? "seleccionado" : ""
                  } ${celda.tieneActividades ? "con-actividades" : ""}`}
                  onClick={() => seleccionarDia(celda.fechaClave)}
                >
                  {/* Número del día */}
                  <span className="calendario-numero-dia">{celda.dia}</span>

                  {/* Indicador visual cuando hay actividades */}
                  {celda.tieneActividades && (
                    <span className="calendario-indicador-actividad">•</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Panel de detalle y formulario */}
        <section className="calendario-detalle">
          {/* Muestra el día seleccionado */}
          <h3>Actividades para el {diaSeleccionado}</h3>

          {/* Estado vacío: si no hay actividades en el día */}
          {actividadesDelDiaSeleccionado.length === 0 ? (
            <p>No hay actividades registradas para este día.</p>
          ) : (
            // Lista de actividades del día seleccionado
            <ul className="lista-actividades">
              {actividadesDelDiaSeleccionado.map((act) => (
                <li key={act.id} className="actividad-item">
                  <div className="actividad-textos">
                    <strong>{act.titulo}</strong>
                    {act.nota && <p>{act.nota}</p>}
                  </div>

                  {/* Botones de acciones (editar/eliminar) */}
                  <div className="actividad-botones">
                    <button
                      type="button"
                      className="btn-secundario"
                      onClick={() => empezarEdicion(act)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-peligro"
                      onClick={() => eliminarActividad(act.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <hr />

          {/* Título del formulario cambia según si estamos creando o editando */}
          <h4>
            {actividadEnEdicionId === null
              ? "Agregar nueva actividad"
              : "Editar actividad"}
          </h4>

          {/* Formulario controlado:
              - onSubmit maneja crear/editar según actividadEnEdicionId */}
          <form className="form-actividad" onSubmit={manejarEnvioActividad}>
            <div className="campo-formulario">
              <label htmlFor="titulo">Título de la actividad</label>
              <input
                id="titulo"
                type="text"
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                placeholder="Ej: Simulacro de Matemática, Repaso de lecturas..."
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="nota">Nota / detalle (opcional)</label>
              <textarea
                id="nota"
                rows="3"
                value={nuevaNota}
                onChange={(e) => setNuevaNota(e.target.value)}
                placeholder="Ej: Temas a repasar, materiales que necesitas, hora, etc."
              />
            </div>

            {/* Botones del formulario */}
            <div className="botones-formulario">
              <button type="submit" className="btn-primario">
                {actividadEnEdicionId === null
                  ? "Guardar actividad"
                  : "Guardar cambios"}
              </button>

              {/* Botón cancelar solo aparece en modo edición */}
              {actividadEnEdicionId !== null && (
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Calendario; // Exporta la página para usarla en Routing (/calendario)