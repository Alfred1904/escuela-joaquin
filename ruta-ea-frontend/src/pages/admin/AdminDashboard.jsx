// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react"; // Hooks para manejar estado y efectos (fetch a la API)
import AdminSidebar from "../../components/Admi/AdminSidebar.jsx"; // Menú lateral del panel admin
import AdminTopbar from "../../components/Admi/AdminTopbar.jsx"; // Barra superior del panel (título + usuario)
import StatCard from "../../components/Admi/StatCard.jsx"; // Tarjeta KPI reutilizable
import "../../Style/indexadmindashboard.css"; // Estilos del dashboard (layout, tarjetas, paneles, etc.)

import { getData } from "../../services/api.js"; // Helper para consumir el backend (GET)

const AdminDashboard = () => {
    // =========================
    // ESTUDIANTES (estado + contador)
    // =========================
    const [estudiantes,setEstudiantes] = useState([]); // Lista de estudiantes filtrados desde /usuario/
    const [cantidadEstudiantes,setCantidadEstudiantes] = useState(0) // Total de estudiantes activos

    // useEffect: se ejecuta al montar el componente
    // - Llama al backend
    // - Filtra usuarios con role === "student"
    // - Actualiza lista y contador
    useEffect(()=>{
        const fetchEstudiantes = async () => {
            try {
                const response = await getData("usuario/"); // Petición al endpoint (devuelve lista de usuarios)
                const filtroEstudiantes = response.filter((estudiante)=>estudiante.role === "student"); // Filtra solo estudiantes
                setEstudiantes(filtroEstudiantes); // Guarda lista en estado
                setCantidadEstudiantes(filtroEstudiantes.length); // Guarda el total
            } catch (error) {
                console.error('Error al obtener los estudiantes:', error); // Log de error para depuración
            }
        };
            fetchEstudiantes(); // Ejecuta la función asíncrona
  }, []); // Dependencias vacías => corre solo 1 vez

    // =========================
    // DOCENTES (estado + contador)
    // =========================
    const [Docentes,setDocentes] = useState([]);  // Lista de docentes filtrados desde /usuario/
    const [cantidadDocentes,setCantidadDocentes] = useState(0) // Total de docentes

    // useEffect: se ejecuta al montar el componente
    // - Llama al backend (mismo endpoint)
    // - Filtra usuarios con role === "teacher"
    // - Actualiza lista y contador
    useEffect(()=>{
        const fetchDocentes = async () => { 
            try { 
                const response = await getData("usuario/"); // Petición al endpoint (devuelve lista de usuarios)
                const filtroDocentes = response.filter((docente)=>docente.role === "teacher"); // Filtra solo docentes
                setDocentes(filtroDocentes); // Guarda lista en estado
                setCantidadDocentes(filtroDocentes.length); // Guarda el total
            } catch (error) {
                console.error('Error al obtener los docentes:', error); // Log de error para depuración
            }      
         };     
     fetchDocentes(); // Ejecuta la función asíncrona
    }, []);  // Dependencias vacías => corre solo 1 vez


  return (
    // Layout principal del panel admin
    // - Sidebar a la izquierda
    // - Main con topbar y secciones
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminTopbar />

        {/* 1. Tarjetas superiores (KPIs)
            - Muestra métricas rápidas: estudiantes y docentes */}
        <section className="admin-section admin-section--kpis">
          <StatCard
            label="Estudiantes activos"
            value={cantidadEstudiantes} // total calculado desde el estado
            color="blue" // variante visual en CSS: stat-card--blue
          />
          <StatCard
            label="Docentes"
            value={cantidadDocentes} // total calculado desde el estado
            color="green" // variante visual en CSS: stat-card--green
          />
        </section>

        {/* 2. Gráfico principal (placeholder) + barras de progreso
            - Estructura para integrar más adelante un gráfico real (Chart.js/Recharts)
            - Incluye un “avance de objetivos” con barra de progreso */}
        <section className="admin-section admin-section--grid-2">
          <div className="admin-panel">
            <h2 className="admin-panel__title">Resumen mensual de matrículas</h2>
            <p className="admin-panel__subtitle">
              Enero – Diciembre | Datos de ejemplo
            </p>
            <div className="admin-chart-placeholder">
              {/* Aquí luego puedes integrar Chart.js o Recharts */}
              <span>Gráfico de líneas (placeholder)</span>
            </div>
          </div>

          <div className="admin-panel">
            <h2 className="admin-panel__title">Avance de objetivos</h2>

            {/* Bloque de progreso:
                - Header muestra meta actual vs total
                - Barra fill usa style width para representar el avance */}
            <div className="progress-item">
              <div className="progress-item__header">
                <span>Estudiantes inscritos</span>
                <span>50 / {cantidadEstudiantes}</span>
              </div>
              <div className="progress-item__bar">
                <div
                  className="progress-item__bar-fill progress-item__bar-fill--blue"
                  // Nota: aquí se intenta setear el ancho con porcentaje
                  // width espera un string como "30%". Actualmente se arma con {cantidadEstudiantes} + "%"
                  // (La lógica del % depende de cómo quieras calcular el avance)
                  style={{ width: {cantidadEstudiantes}+"%" }}
                />
              </div>
            </div>
              </div>
        </section>

        {/* 3. Sección inferior tipo “mapa + listas + gráfico circular”
            - 3 paneles en grid (placeholder) para futura data real */}
        <section className="admin-section admin-section--grid-3">
          <div className="admin-panel">
            <h2 className="admin-panel__title">Distribución por sede</h2>
            <div className="admin-map-placeholder">
              <span>Mapa / Distribución de sedes (placeholder)</span>
            </div>
          </div>

          <div className="admin-panel">
            <h2 className="admin-panel__title">Últimas interacciones</h2>
            {/* Lista estática de ejemplo (luego puede venir de backend) */}
            <ul className="admin-list">
              <li>
                Nueva matrícula – EGBA I Ciclo
                <span>hace 2 horas</span>
              </li>
              <li>
                Mensaje de estudiante – Consulta requisitos
                <span>hace 5 horas</span>
              </li>
              <li>
                Actualización de horario – Centro Cívico La Capri
                <span>ayer</span>
              </li>
            </ul>
          </div>

          <div className="admin-panel">
            <h2 className="admin-panel__title">Uso del portal</h2>
            <div className="admin-pie-placeholder">
              <span>Gráfico circular (placeholder)</span>
            </div>
            {/* Leyenda estática (luego se puede conectar a data del gráfico) */}
            <ul className="admin-legend">
              <li>Portal público</li>
              <li>Panel estudiantes</li>
              <li>Panel docentes</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard; // Exporta la página para usarla en el Routing (ruta /admin)