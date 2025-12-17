// src/components/BotonCerrarSesion.jsx
import React from "react"; // React para crear el componente funcional
import { useNavigate } from "react-router-dom"; // Hook para navegar programáticamente a otra ruta
import { useAuth } from "../context/AuthContext.jsx"; // Hook del contexto de autenticación (provee cerrarSesion y datos del usuario)

// Botón reutilizable para cerrar sesión
// - Ejecuta la función cerrarSesion() del AuthContext
// - Redirige al usuario a /login luego de cerrar sesión
const BotonCerrarSesion = () => {
  // Extrae la función "cerrarSesion" desde tu AuthContext
  // Esta función normalmente limpia tokens, usuario en memoria y/o localStorage
  const { cerrarSesion } = useAuth();

  // Hook de React Router para redireccionar sin recargar la página
  const navigate = useNavigate();

  // Handler del click:
  // 1) Cierra sesión (limpia la autenticación)
  // 2) Envía al usuario al login
  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    // Botón con clase CSS para estilo consistente en toda la web
    // onClick llama a handleLogout al presionar
    <button className="boton-cerrar-sesion" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default BotonCerrarSesion; // Export para usar en Navbar, AdminTopbar, Sidebar, etc.