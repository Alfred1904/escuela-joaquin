import React, { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import "../Style/indexcalendario.css";

// 🔧 Función auxiliar para formatear fecha a YYYY-MM-DD
function formatearFecha(fecha) {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 🔧 Nombre del mes en español
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
  const [mesActual, setMesActual] = useState(() => {
    const hoy = new Date();
    return new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  });

  // Día seleccionado
  const [diaSeleccionado, setDiaSeleccionado] = useState(() => {
    const hoy = new Date();
    return formatearFecha(hoy);
  });

  // Lista de actividades: { id, fecha, titulo, nota }
  const [actividades, setActividades] = useState([]);

  // Estado del formulario (crear / editar)
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");

  // Id de la actividad que se está editando (o null si estamos creando)
  const [actividadEnEdicionId, setActividadEnEdicionId] = useState(null);

  // Generar días del mes en una cuadrícula (lunes a domingo)
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
      const tieneActividades = actividades.some(
        (act) => act.fecha === fechaClave
      );
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
  const irAlMesAnterior = () => {
    setMesActual(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const irAlMesSiguiente = () => {
    setMesActual(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  // Actividades del día seleccionado
  const actividadesDelDiaSeleccionado = actividades.filter(
    (act) => act.fecha === diaSeleccionado
  );

  // Manejo del formulario (crear o editar)
  const manejarEnvioActividad = (e) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    if (actividadEnEdicionId === null) {
      // 👉 Modo CREAR
      const nuevaActividad = {
        id: Date.now(),
        fecha: diaSeleccionado,
        titulo: nuevoTitulo.trim(),
        nota: nuevaNota.trim(),
      };

      setActividades((prev) => [...prev, nuevaActividad]);
    } else {
      // ✏️ Modo EDITAR
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
  const seleccionarDia = (fechaClave) => {
    setDiaSeleccionado(fechaClave);
    // Si cambias de día y estabas editando algo, se limpia la edición
    setActividadEnEdicionId(null);
    setNuevoTitulo("");
    setNuevaNota("");
  };

  // 👇 Preparar formulario para editar una actividad
  const empezarEdicion = (actividad) => {
    setActividadEnEdicionId(actividad.id);
    setNuevoTitulo(actividad.titulo);
    setNuevaNota(actividad.nota || "");
    setDiaSeleccionado(actividad.fecha);
  };

  // 👇 Cancelar edición
  const cancelarEdicion = () => {
    setActividadEnEdicionId(null);
    setNuevoTitulo("");
    setNuevaNota("");
  };

  // 🗑 Eliminar actividad
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
    <div className="page page-calendario">
      <PageHeader
        title="Calendario y planificación de estudio"
        subtitle="Panorama general de eventos y plan de estudio."
      />

      <p>
        Utiliza este calendario para planificar tus semanas de estudio, agregar
        simulacros, fechas de exámenes y otras actividades importantes.
      </p>

      <div className="calendario-contenedor">
        {/* Panel del calendario mensual */}
        <section className="calendario-panel">
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

          <div className="calendario-semana-header">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>

          <div className="calendario-grid">
            {generarDiasMes().map((celda) => {
              if (celda.tipo === "vacio") {
                return (
                  <div
                    key={celda.key}
                    className="calendario-celda vacia"
                  />
                );
              }

              const esSeleccionado = celda.fechaClave === diaSeleccionado;

              return (
                <button
                  key={celda.key}
                  type="button"
                  className={`calendario-celda dia ${
                    esSeleccionado ? "seleccionado" : ""
                  } ${celda.tieneActividades ? "con-actividades" : ""}`}
                  onClick={() => seleccionarDia(celda.fechaClave)}
                >
                  <span className="calendario-numero-dia">{celda.dia}</span>
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
          <h3>Actividades para el {diaSeleccionado}</h3>

          {actividadesDelDiaSeleccionado.length === 0 ? (
            <p>No hay actividades registradas para este día.</p>
          ) : (
            <ul className="lista-actividades">
              {actividadesDelDiaSeleccionado.map((act) => (
                <li key={act.id} className="actividad-item">
                  <div className="actividad-textos">
                    <strong>{act.titulo}</strong>
                    {act.nota && <p>{act.nota}</p>}
                  </div>

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

          <h4>
            {actividadEnEdicionId === null
              ? "Agregar nueva actividad"
              : "Editar actividad"}
          </h4>

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

            <div className="botones-formulario">
              <button type="submit" className="btn-primario">
                {actividadEnEdicionId === null
                  ? "Guardar actividad"
                  : "Guardar cambios"}
              </button>

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

export default Calendario;
