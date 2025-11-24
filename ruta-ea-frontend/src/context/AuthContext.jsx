// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// import PropTypes from "prop-types";

const AuthContext = createContext(null);

// 🔐 Llaves usadas en localStorage
const LS_REGISTRO = "usuarioRutaEA";          // Datos de registro (email, password, etc.)
const LS_SESSION = "usuarioRutaEA_session";   // Usuario autenticado
const LS_TOKEN = "usuarioRutaEA_token";       // Token "simulado" de autenticación

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // 🔧 Cargar sesión al inicio (si existe)
  useEffect(() => {
    try {
      const tokenGuardado = localStorage.getItem(LS_TOKEN);
      const sesionGuardada = localStorage.getItem(LS_SESSION);

      // Solo iniciamos sesión automática si hay token y datos de sesión
      if (tokenGuardado && sesionGuardada) {
        setToken(tokenGuardado);
        setUsuario(JSON.parse(sesionGuardada));
      }
    } catch (e) {
      console.warn("Error leyendo sesión de localStorage", e);
    }
  }, []);

  // 🔐 Generar un token simple (simulado, sin backend)
  const generarToken = () =>
    `token-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // 📝 Registrar usuario (guardar datos para futuros inicios de sesión)
  const registrar = (datosUsuario) => {
    try {
      // Guardar datos de registro
      localStorage.setItem(LS_REGISTRO, JSON.stringify(datosUsuario));

      // (Opcional) Iniciar sesión automáticamente tras registrar
      const nuevoToken = generarToken();
      setUsuario(datosUsuario);
      setToken(nuevoToken);

      localStorage.setItem(LS_SESSION, JSON.stringify(datosUsuario));
      localStorage.setItem(LS_TOKEN, nuevoToken);
    } catch (e) {
      console.warn("No se pudo guardar el registro en localStorage", e);
    }
  };

  // 🔓 Iniciar sesión: firma iniciarSesion(email, password) → true/false
  const iniciarSesion = (email, password) => {
    try {
      const guardado = localStorage.getItem(LS_REGISTRO);
      if (!guardado) return false;

      const datos = JSON.parse(guardado);

      if (datos.email === email && datos.password === password) {
        const nuevoToken = generarToken();
        setUsuario(datos);
        setToken(nuevoToken);

        localStorage.setItem(LS_SESSION, JSON.stringify(datos));
        localStorage.setItem(LS_TOKEN, nuevoToken);

        return true;
      }

      return false;
    } catch (e) {
      console.warn("Error verificando credenciales", e);
      return false;
    }
  };

  // 🚪 Cerrar sesión (se mantiene el registro, se borra solo la sesión)
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
  const estaAutenticado = !!token;

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        registrar,
        iniciarSesion,
        cerrarSesion,
        estaAutenticado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
