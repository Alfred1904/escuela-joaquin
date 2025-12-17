// src/components/Header.jsx
import React from "react"; // React para crear el componente funcional
import { useAuth } from "../context/AuthContext.jsx"; // Hook del contexto de autenticación (permite saber si hay sesión activa)
import BotonCerrarSesion from "./Botoncerrarsesion.jsx" // Botón reutilizable para cerrar sesión (logout) y redirigir a /login

// Header: encabezado principal del sitio
// - Muestra el título del proyecto
// - Si el usuario está autenticado, muestra una zona de sesión con el botón "Cerrar sesión"
const Header = () => {
  // "estaAutenticado" viene del AuthContext
  // - true: el usuario tiene sesión activa
  // - false: el usuario no está logueado (no se muestra el botón de logout)
  const { estaAutenticado } = useAuth();

  return (
    // Contenedor semántico del encabezado
    // La clase "header-principal" controla el estilo (layout, colores, espaciado, etc.)
    <header className="header-principal">
      {/* Título del sitio/proyecto */}
      <h1>Proyecto Educación Abierta</h1>

      {/* Render condicional:
         - Solo se muestra el bloque de sesión si el usuario está autenticado */}
      {estaAutenticado && (
        <div className="zona-sesion">
          {/* Botón que ejecuta cerrarSesion() y redirige a /login */}
          <BotonCerrarSesion />
        </div>
      )}
    </header>
  );
};

export default Header; // Exporta el componente para usarlo en el layout general (Routing/App)