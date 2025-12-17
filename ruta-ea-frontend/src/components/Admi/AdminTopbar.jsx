// src/components/admin/AdminTopbar.jsx
import React from "react"; // React para crear el componente funcional
import { useAuth } from "../../context/AuthContext.jsx"; // Hook del contexto de autenticación (provee datos del usuario logueado)
import "../../Style/indexadmindashboard.css"; // Estilos compartidos del dashboard (topbar, sidebar, tarjetas, etc.)

// Topbar del panel administrativo
// - Muestra título y subtítulo del panel (lado izquierdo)
// - Muestra nombre de usuario y rol (lado derecho) usando el AuthContext
const AdminTopbar = () => {
  // Obtenemos el objeto "usuario" desde el contexto de autenticación
  // Nota: "usuario" puede ser null/undefined si aún no cargó o no hay sesión
  const { usuario } = useAuth();

  return (
    // Contenedor superior del panel (barra superior)
    <header className="admin-topbar">
      {/* Sección izquierda: identidad del panel (títulos) */}
      <div className="admin-topbar__left">
        {/* Título principal de la vista admin */}
        <h1 className="admin-topbar__title">Panel Administrativo</h1>

        {/* Subtítulo explicativo para el usuario */}
        <p className="admin-topbar__subtitle">
          Resumen general de Educación Abierta (EGBA / EDAD)
        </p>
      </div>

      {/* Sección derecha: información del usuario autenticado */}
      <div className="admin-topbar__right">
        {/* Nombre del usuario
           - Si "usuario" existe, se muestra usuario.nombre
           - Si no existe, se muestra un fallback para evitar errores en render */}
        <span className="admin-topbar__user">
          {usuario ? usuario.nombre : "Usuario"}
        </span>

        {/* Rol del usuario
           - Si "usuario" existe, se muestra usuario.rol
           - Si no existe, se muestra vacío para no ensuciar la UI */}
        <span className="admin-topbar__role">
          {usuario ? usuario.rol : ""}
        </span>
      </div>
    </header>
  );
};

export default AdminTopbar; // Export para usar la barra superior en el dashboard/admin layout






