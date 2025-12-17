import React, { useState } from "react"; // React + Hook useState para controlar el estado del menú móvil (open)
import { Link, NavLink } from "react-router-dom"; // Link: navegación sin recarga | NavLink: permite estilos cuando la ruta está activa
import "../Style/index.css"; // Estilos globales (incluye estilos del navbar y enlaces)

const Navbar = () => {
  // Estado para abrir/cerrar el menú en pantallas pequeñas (hamburguesa)
  const [open, setOpen] = useState(false);

  // Lista centralizada de items del menú
  // - to: ruta
  // - label: texto visible
  // Nota: "Cerrar sesión" aquí navega a "/" (no realiza logout real)
  // Si quieres logout real, conviene usar AuthContext y un handler.
  const navItems = [
    { to: "/", label: "Inicio" },
    { to: "/contenido", label: "Contenido EA" },
    { to: "/archivos", label: "Archivos" },
    { to: "/perfiles", label: "Perfiles" },
    { to: "/convocatorias", label: "Convocatorias" },
    { to: "/calendario", label: "Calendario" },
    { to: "/testimonios", label: "Testimonios" },
    { to: "/sobre-nosotros", label: "Sobre nosotros" },
    { to: "/contacto", label: "Contacto" },
    { to: "/registro", label: "Registro" },
  ];

  return (
    <>
      {localStorage.getItem("access_token") && (

        // Contenedor principal del navbar (encabezado)
        <header className="navbar">
          {/* Contenedor interno para alinear logo, botón hamburguesa y links */}
          <div className="navbar-inner">
            {/* Logo / marca del sitio:
           - Link navega a "/" sin recargar */}
            <Link to="/" className="navbar-logo">
              Ruta EA
              <span className="navbar-subtitle">Educación Abierta</span>
            </Link>

            {/* Botón hamburguesa (visible normalmente en mobile según tu CSS)
           - Alterna el estado "open" para mostrar/ocultar el menú */}
            <button
              className="navbar-toggle"
              onClick={() => setOpen((p) => !p)}
              aria-label="Abrir menú"
            >
              ☰
            </button>

            {/* Contenedor de enlaces:
           - Agrega la clase "--open" cuando open=true (menú desplegado en mobile) */}
            <nav className={`navbar-links ${open ? "navbar-links--open" : ""}`}>
              {/* Renderiza todos los enlaces definidos en navItems */}
              {navItems.map((item) => (
                <NavLink
                  key={item.to} // key para listas en React (idealmente debería ser único)
                  to={item.to}  // ruta destino
                  className={({ isActive }) =>
                    // Estilo activo para resaltar la sección actual
                    isActive ? "navbar-link navbar-link--active" : "navbar-link"
                  }
                  // Al hacer click en un link, cierra el menú móvil
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Render condicional del link "Panel de administración"
             - Solo aparece si localStorage.rol === "principal"
             - Útil para mostrar opciones según el rol del usuario */}
              {localStorage.getItem("rol") === "principal" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "navbar-link navbar-link--active" : "navbar-link"
                  }
                >
                  Panel de administración
                </NavLink>
              )}
              {localStorage.getItem("access_token") && (
                <NavLink
                  to="/"
                  className="navbar-link"
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("rol");
                    setOpen(false);
                    window.location.reload();
                  }}
                >
                  Cerrar sesión
                </NavLink>
              )}

            </nav>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar; // Exporta el Navbar para usarlo en el layout general (Routing/App)

/* Nota: Esta línea suelta al final normalmente NO debería estar aquí.
   Si la dejas, React marcará error porque está fuera del componente/render.
   Se supone que era un ejemplo de uso. */
<Link to="/archivos">Archivos</Link>