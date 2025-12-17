    // src/components/admin/AdminSidebar.jsx
    import React from "react"; // Importa React para definir el componente funcional
    import { NavLink } from "react-router-dom"; // NavLink permite resaltar el enlace activo según la ruta actual
    import "../../Style/indexadmindashboard.css"; // Hoja de estilos del panel/admin (sidebar, menú, etc.)

    // Componente Sidebar del panel de administración
    // - Muestra la marca (título + subtítulo)
    // - Muestra el menú de navegación con enlaces a secciones admin
    const AdminSidebar = () => {
    return (
        // Contenedor lateral del dashboard/admin
        <aside className="admin-sidebar">
        {/* Bloque de marca (branding) */}
        <div className="admin-brand">
            {/* Título corto del área administrativa */}
            <span className="admin-brand__title">Admin EA</span>

            {/* Subtítulo con el nombre de la institución */}
            <span className="admin-brand__subtitle">
            Escuela Joaquín García Monge
            </span>
        </div>

        {/* Menú de navegación del panel admin */}
        <nav className="admin-menu">
            {/* Enlace al dashboard principal (/admin)
                - Usa className como función para agregar la clase "--active" cuando esté activo */}
            <NavLink
            to="/admin"
            className={({ isActive }) =>
                "admin-menu__item" + (isActive ? " admin-menu__item--active" : "")
            }
            >
            Dashboard
            </NavLink>

            {/* Enlace a la gestión de docentes */}
            <NavLink to="/admin/docentes" className="admin-menu__item">
            Docentes
            </NavLink>

            {/* Enlace a la gestión de estudiantes */}
            <NavLink to="/admin/estudiantes" className="admin-menu__item">
            Estudiantes
            </NavLink>
        </nav>
        </aside>
    );
    };

    export default AdminSidebar; // Exporta el componente para usarlo en páginas del panel admin