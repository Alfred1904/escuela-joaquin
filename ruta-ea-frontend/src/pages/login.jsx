// src/pages/Login.jsx
import React, { useState } from "react"; // useState para manejar los campos del formulario y estados de UI
import { useNavigate, Link } from "react-router-dom"; // useNavigate para redirigir; Link para navegación sin recargar
import "../Style/indexinicio.css"; // CSS donde tienes estilos de auth (auth-page, auth-card, etc.)
import { postData } from "../services/api.js"; // Helper para POST hacia tu backend (endpoint login/)
// Si luego quieres integrar AuthContext, puedes usar esto:
// import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate(); // Permite redirecciones programáticas tras iniciar sesión
  // const { iniciarSesion } = useAuth(); // opcional, si lo llegas a usar

  // Estado controlado del formulario (inputs)
  const [username, setUsername] = useState(""); // Usuario (string)
  const [password, setPassword] = useState(""); // Contraseña (string)

  // Estados de UI para feedback y control de envío
  const [enviando, setEnviando] = useState(false); // Bloquea botón mientras se hace la petición
  const [errorMensaje, setErrorMensaje] = useState(""); // Mensaje de error para mostrar al usuario
  const [exitoMensaje, setExitoMensaje] = useState(""); // Mensaje de éxito para mostrar al usuario

  // Handler principal del formulario (submit)
  // - Valida campos mínimos
  // - Llama al backend (login/)
  // - Guarda token y rol en localStorage
  // - Redirige al inicio si es exitoso
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recarga del navegador
    setErrorMensaje(""); // Limpia errores anteriores
    setExitoMensaje(""); // Limpia mensajes de éxito anteriores

    // Validación rápida en frontend (evita request innecesario)
    if (!username || !password) {
      setErrorMensaje("Debes completar usuario y contraseña.");
      return;
    }

    try {
      setEnviando(true); // Activa modo "cargando" (deshabilita botón)

      // POST al endpoint "login/"
      // Se espera una respuesta del backend con token (access_token) si es correcto
      const respuesta = await postData("login/", {
        username,
        password,
      });
      console.log(respuesta);

      // Si el backend devuelve access_token, consideramos login exitoso
      if (respuesta?.access_token) {
        // Mensaje de éxito (si backend envía message, lo usamos; si no, mensaje por defecto)
        setExitoMensaje(respuesta.message || "Inicio de sesión exitoso.");

        // Persistencia de sesión mínima en el navegador
        // - access_token para autorizar requests posteriores
        // - rol para condicionar UI/rutas (ej: panel admin)
        localStorage.setItem("access_token", respuesta.access_token);
        localStorage.setItem("rol", respuesta.role);
        window.location.reload();
        // Redirección con pequeña pausa para que el usuario vea el mensaje de éxito
        setTimeout(() => {
          navigate("/"); // redirige al inicio o dashboard (según tu flujo)
        }, 800);
      } else {
        // Si no vino token, mostramos el mensaje del backend o uno genérico
        setErrorMensaje(
          respuesta?.message ||
            "No se pudo iniciar sesión. Verifica tus datos."
        );
      }
    } catch (error) {
      // Errores de red / servidor / excepción en postData
      console.error(error);
      setErrorMensaje(
        "Ocurrió un error al conectar con el servidor. Intenta de nuevo."
      );
    } finally {
      // Siempre se ejecuta: apaga el estado de "enviando" para reactivar el botón
      setEnviando(false);
    }
  };

  return (
    // Contenedor general de autenticación
    // "auth-page" y "page-inicio" se apoyan en tu CSS para layout y fondo
    <div className="auth-page page-inicio">
      {/* Tarjeta principal del login (contenedor de 2 columnas) */}
      <div className="auth-card">
        {/* COLUMNA IZQUIERDA: LOGO + TEXTO */}
        <div className="auth-intro">
          {/* Logo/insignia */}
          <div className="auth-logo">
            <span className="auth-logo-icon">EA</span>
          </div>

          {/* Título principal del módulo */}
          <h1 className="auth-title">Iniciar sesión</h1>

          {/* Subtítulos informativos */}
          <p className="auth-subtitle">
            Accede a la ruta de Educación Abierta con tu usuario registrado.
          </p>
          <p className="auth-subtitle">
            Podrás consultar convocatorias, planes de estudio y material
            personalizado.
          </p>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="auth-form-wrapper">
          {/* Formulario controlado: inputs dependen del estado */}
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Campo: username */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Nombre de usuario</div>
                <input
                  type="text"
                  name="username"
                  value={username} // input controlado por estado
                  onChange={(e) => setUsername(e.target.value)} // actualiza estado
                  required // validación HTML básica
                  placeholder="Ej: jgarcia.monge"
                  autoComplete="username" // ayuda al autocompletado del navegador
                />
              </label>
            </div>

            {/* Campo: password */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Contraseña</div>
                <input
                  type="password"
                  name="password"
                  value={password} // input controlado por estado
                  onChange={(e) => setPassword(e.target.value)} // actualiza estado
                  required // validación HTML básica
                  minLength={8} // mínima longitud (también debe validarse en backend)
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password" // autocompletado seguro de password
                />
              </label>
            </div>

            {/* MENSAJES DE ERROR / ÉXITO */}
            {/* Se renderizan condicionalmente según exista texto */}
            {errorMensaje && (
              <p className="auth-message auth-message-error">
                {errorMensaje}
              </p>
            )}
            {exitoMensaje && (
              <p className="auth-message auth-message-success">
                {exitoMensaje}
              </p>
            )}

            {/* Botón de envío: cambia texto si está enviando */}
            <button type="submit" className="auth-button" disabled={enviando}>
              {enviando ? "VERIFICANDO..." : "INICIAR SESIÓN"}
            </button>
          </form>

          {/* Pie: enlace a registro (navegación interna sin recargar) */}
          <p className="auth-footer-text">
            ¿Aún no tienes cuenta?{" "}
            <Link to="/registro" className="auth-link-button">
              Regístrate aquí
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; // Exporta la página para usarla en el Routing (ruta /login)