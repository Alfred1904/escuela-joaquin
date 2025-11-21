// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Llaves usadas en localStorage:
const LS_REGISTRO = "usuarioRutaEA"; // datos registrados (persistentes)
const LS_SESSION = "usuarioRutaEA_session"; // sesión activa (opcional)

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar sesión al inicio (si existe)
  useEffect(() => {
    try {
      const sesion = localStorage.getItem(LS_SESSION);
      if (sesion) {
        setUsuario(JSON.parse(sesion));
        return;
      }

      // si no hay sesión activa, pero sí hay registro, no iniciar sesión automáticamente
    } catch (e) {
      console.warn("Error leyendo sesión de localStorage", e);
    }
  }, []);

  // Registrar usuario (guardamos los datos para que el login pueda verificarlos)
  const registrar = (datosUsuario) => {
    try {
      localStorage.setItem(LS_REGISTRO, JSON.stringify(datosUsuario));
      // opcional: iniciar sesión automáticamente tras registrar
      setUsuario(datosUsuario);
      localStorage.setItem(LS_SESSION, JSON.stringify(datosUsuario));
    } catch (e) {
      console.warn("No se pudo guardar el registro en localStorage", e);
    }
  };

  // Iniciar sesión (firma: iniciarSesion(email, password))
  const iniciarSesion = (email, password) => {
    try {
      const guardado = localStorage.getItem(LS_REGISTRO);
      if (!guardado) return false;

      const datos = JSON.parse(guardado);
      if (datos.email === email && datos.password === password) {
        setUsuario(datos);
        localStorage.setItem(LS_SESSION, JSON.stringify(datos));
        return true;
      }
      return false;
    } catch (e) {
      console.warn("Error verificando credenciales", e);
      return false;
    }
  };

  // Cerrar sesión (mantiene el registro pero elimina la sesión activa)
  const cerrarSesion = () => {
    setUsuario(null);
    try {
      localStorage.removeItem(LS_SESSION);
    } catch (e) {
      console.warn("Error eliminando sesión en localStorage", e);
    }
  };

  const estaAutenticado = !!usuario;

  return (
    <AuthContext.Provider
      value={{ usuario, estaAutenticado, registrar, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
