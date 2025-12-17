import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"; // React + hooks para crear un contexto global de autenticación

// Crea el contexto de autenticación
// - El valor inicial es null para indicar “sin provider” o “sin sesión”
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Estado del usuario autenticado (puede ser objeto con datos del usuario)
  const [usuario, setUsuario] = useState(null);

  // Estado del token (si existe, se considera sesión activa)
  const [token, setToken] = useState(null);

  // 🔧 Cargar sesión al inicio (si existe)
  // Este useEffect corre 1 vez al montar la app ([])
  // - Lee el token almacenado en localStorage
  // - Si existe, lo setea en el estado para reactivar sesión
  useEffect(() => {
    try {
      const tokenGuardado = localStorage.getItem("access_token");

      // Solo iniciamos sesión automática si hay token y datos de sesión
      // Nota: aquí únicamente recuperas el token; el usuario queda null
      // Si quieres persistir usuario, normalmente también guardas y recuperas su info.
      if (tokenGuardado) {
        setToken(tokenGuardado);
      }
    } catch (e) {
      // Si el navegador bloquea localStorage o hay error de lectura
      console.warn("Error leyendo sesión de localStorage", e);
    }
  }, []);

  // 🚪 Cerrar sesión (se mantiene el registro, se borra solo la sesión)
  // - Limpia el estado en memoria (usuario y token)
  // - Intenta borrar claves en localStorage
  // Nota: LS_SESSION y LS_TOKEN deben existir como constantes en algún lugar,
  // o esto lanzará error si no están definidas.
  const cerrarSesion = () => {
    setUsuario(null);
    setToken(null);
    try {
      localStorage.removeItem(LS_SESSION);
      localStorage.removeItem(LS_TOKEN);
    } catch (e) {
      console.warn("Error eliminando sesión en localStorage", e);
    }
  };

  // ✅ Estado de autenticación (true si hay token)
  // - Convierte token a booleano (null/"" => false, string => true)
  const estaAutenticado = !!token;

  return (
    // Provider: expone valores y funciones a toda la app
    // Cualquier componente dentro de AuthProvider puede usar useAuth()
    <AuthContext.Provider
      value={{
        usuario,          // datos del usuario (si se setea desde login)
        token,            // token actual (si existe => sesión activa)
        cerrarSesion,     // función para cerrar sesión
        estaAutenticado,  // boolean: indica si hay sesión activa
      }}
    >
      {/* Renderiza toda la app / subtree envuelto por AuthProvider */}
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes removed to avoid dev dependency requirement in this project.

// Hook helper para acceder al contexto de autenticación
// Uso típico:
// const { usuario, token, estaAutenticado, cerrarSesion } = useAuth();
export const useAuth = () => useContext(AuthContext);