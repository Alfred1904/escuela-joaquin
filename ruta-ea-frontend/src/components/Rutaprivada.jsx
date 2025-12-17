// src/components/RutaPrivada.jsx
import React from "react"; // React para definir el componente wrapper
// import PropTypes from "prop-types"; // (Opcional) Validación de props; comentado para evitar dependencia extra
import { Navigate } from "react-router-dom"; // Componente para redireccionar a otra ruta
import { useAuth } from "../context/AuthContext.jsx"; // Hook del contexto de autenticación (expone estaAutenticado, usuario, etc.)

// RutaPrivada: componente “guard” para proteger rutas
// Uso típico:
// <RutaPrivada>
//   <PaginaProtegida />
// </RutaPrivada>
//
// Qué hace:
// - Verifica si el usuario está autenticado
// - Si NO lo está, redirige a /login
// - Si SÍ lo está, renderiza el contenido (children)
const RutaPrivada = ({ children }) => {
  // Obtiene el estado de autenticación desde el AuthContext
  const { estaAutenticado } = useAuth();

  // Si no está autenticado, redirigir al login
  // replace evita que el usuario pueda volver a la página protegida usando “Atrás”
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si sí está autenticado, mostrar el contenido protegido
  // children representa el componente/página que se quiere proteger
  return children;
};

// PropTypes removed to avoid extra dev dependency requirement.
// Si en algún momento decides usar PropTypes, puedes descomentar la importación
// y definir: RutaPrivada.propTypes = { children: PropTypes.node.isRequired };

export default RutaPrivada; // Exporta el componente para usarlo en Routing.jsx