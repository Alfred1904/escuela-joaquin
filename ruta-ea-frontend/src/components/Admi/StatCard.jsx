// src/components/admin/StatCard.jsx
import React from "react"; // React para definir el componente funcional
import "../../Style/indexadmindashboard.css"; // Estilos del dashboard (tarjetas, layout, colores, etc.)

// StatCard: tarjeta reutilizable para mostrar un indicador/KPI en el dashboard
// Props:
// - label: string => texto descriptivo del indicador (ej: "Estudiantes", "Docentes")
// - value: string|number => valor del indicador (ej: 120, "15", "—")
// - icon: ReactNode (opcional) => ícono o elemento visual (SVG, componente, etc.)
// - color: string => sufijo de clase para variar estilo (ej: "blue", "green", "orange")
//   Se usa como: stat-card--{color} y debe existir en tu CSS.
const StatCard = ({ label, value, icon, color }) => {
  return (
    // Contenedor principal de la tarjeta:
    // - "stat-card" aplica la base del estilo
    // - "stat-card--${color}" aplica variante visual según el color recibido
    <div className={`stat-card stat-card--${color}`}>
      {/* Contenido textual de la tarjeta (label + value) */}
      <div className="stat-card__content">
        {/* Etiqueta del indicador (texto pequeño) */}
        <span className="stat-card__label">{label}</span>

        {/* Valor principal del indicador (texto grande) */}
        <span className="stat-card__value">{value}</span>
      </div>

      {/* Render condicional del ícono:
         - Solo se muestra si "icon" existe (no null/undefined/false)
         - Permite pasar componentes de íconos desde el dashboard */}
      {icon && <div className="stat-card__icon">{icon}</div>}
    </div>
  );
};

export default StatCard; // Exporta el componente para usarlo en AdminDashboard u otras vistas