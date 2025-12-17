import React, { useState } from "react"; // useState para manejar estados del formulario
import { useNavigate } from "react-router-dom"; // navegación programática después de registrar
import { useAuth } from "../context/AuthContext.jsx"; // contexto de autenticación (si lo usas en el proyecto)
import "../Style/indexregistro.css"; // estilos del registro
import { postData } from "../services/api.js"; // helper para enviar POST al backend

const Registro = () => {
  const { registrar } = useAuth(); // (Actualmente no se usa) quedaría para integrar registro vía AuthContext
  const navigate = useNavigate(); // permite redirigir al usuario (ej: /login)

  // =========================
  // Estados del formulario UI
  // =========================
  const [nombreCompleto, setNombreCompleto] = useState(""); // (Actualmente no se usa) campo opcional si decides unificar nombres
  const [usuario, setUsuario] = useState(""); // username
  const [email, setEmail] = useState(""); // correo principal
  const [confirmarEmail, setConfirmarEmail] = useState(""); // confirmación de correo
  const [password, setPassword] = useState(""); // contraseña
  const [confirmarPassword, setConfirmarPassword] = useState(""); // confirmación de contraseña
  const [aceptaTerminos, setAceptaTerminos] = useState(false); // checkbox términos

  // ==============================
  // Estados adicionales (payload)
  // ==============================
  const [firstName, setFirstName] = useState(""); // first_name para backend
  const [lastName, setLastName] = useState(""); // last_name para backend
  const [role, setRole] = useState("student"); // rol por defecto
  const [numTelefono, setNumTelefono] = useState(""); // teléfono
  const [numCedula, setNumCedula] = useState(""); // cédula
  const [fechaNacimiento, setFechaNacimiento] = useState(""); // fecha de nacimiento

  // Estado para bloquear el botón mientras se envía la petición
  const [enviando, setEnviando] = useState(false);

  // ==========================================
  // Envío del formulario: validación + POST API
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita recarga completa de la página

    // Validación: correo y confirmación deben coincidir
    if (email !== confirmarEmail) {
      alert("El correo y la confirmación no coinciden.");
      return;
    }
    // Validación: contraseña y confirmación deben coincidir
    if (password !== confirmarPassword) {
      alert("La contraseña y su confirmación no coinciden.");
      return;
    }
    // Validación: aceptar términos es obligatorio
    if (!aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      setEnviando(true); // bloquea UI y cambia texto del botón

      // Objeto final que se envía al backend (ajusta keys según tu serializer/model)
      const objUsuario = {
        first_name: firstName,
        last_name: lastName,
        username: usuario,
        email: email,
        password: password,
        role: role,
        num_telefono: numTelefono,
        num_cedula: numCedula,
        fecha_nacimiento: fechaNacimiento,
      };

      // Envío al endpoint de creación de usuario
      const peticion = await postData("usuario/", objUsuario);
      console.log("Usuario creado en el backend:", peticion);

      // Feedback al usuario y redirección al login
      alert("Registro completado. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      // Manejo básico de errores (depende de cómo postData lance/retorne errores)
      console.error(error);
      if (error.data) {
        alert("Error al registrar en el servidor: " + JSON.stringify(error.data));
      } else {
        alert("Ocurrió un error al registrar el usuario en el servidor.");
      }
    } finally {
      setEnviando(false); // vuelve a habilitar el botón
    }
  };

  return (
    // Contenedor general del layout auth (pantalla de registro)
    <div className="auth-page">
      <div className="auth-card">
        {/* Columna izquierda: identidad/intro */}
        <div className="auth-intro">
          <div className="auth-logo">
            <span className="auth-logo-icon">EA</span>
          </div>

          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-subtitle">
            Regístrate para acceder a la ruta de Educación Abierta.
          </p>

          <p className="auth-subtitle">
            Completa tus datos para crear un usuario. Podrás consultar
            convocatorias, planes de estudio y material personalizado.
          </p>
        </div>

        {/* Columna derecha: formulario */}
        <div className="auth-form-wrapper">
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Nombre de usuario</div>
                <input
                  type="text"
                  name="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)} // actualiza el estado username
                  required
                  placeholder="Ej: jgarcia.monge"
                />
              </label>
            </div>

            {/* First/Last name */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Nombre (first_name)</div>
                <input
                  type="text"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} // guarda first_name para backend
                  placeholder="Nombre"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Apellidos (last_name)</div>
                <input
                  type="text"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} // guarda last_name para backend
                  placeholder="Apellidos"
                />
              </label>
            </div>

            {/* Email + confirmación */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Correo electrónico</div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // guarda email
                  required
                  placeholder="tu_correo@example.com"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Confirmar correo</div>
                <input
                  type="email"
                  name="confirmarEmail"
                  value={confirmarEmail}
                  onChange={(e) => setConfirmarEmail(e.target.value)} // guarda confirmación
                  required
                  placeholder="Repite tu correo"
                />
              </label>
            </div>

            {/* Password + confirmación */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Contraseña</div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // guarda contraseña
                  required
                  minLength={8}
                  placeholder="Mínimo 8 caracteres"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Confirmar contraseña</div>
                <input
                  type="password"
                  name="confirmarPassword"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)} // guarda confirmación contraseña
                  required
                  minLength={8}
                  placeholder="Repite la contraseña"
                />
              </label>
            </div>

            {/* Teléfono + cédula */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Número de teléfono</div>
                <input
                  type="tel"
                  name="num_telefono"
                  value={numTelefono}
                  onChange={(e) => setNumTelefono(e.target.value)} // guarda teléfono
                  placeholder="Ej: 8888-8888"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Número de cédula</div>
                <input
                  type="text"
                  name="num_cedula"
                  value={numCedula}
                  onChange={(e) => setNumCedula(e.target.value)} // guarda cédula
                  placeholder="Ej: 1-1111-1111"
                />
              </label>
            </div>

            {/* Fecha nacimiento + rol */}
            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Fecha de nacimiento</div>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)} // guarda fecha
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Rol</div>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)} // cambia rol que se enviará al backend
                >
                  <option value="student">Estudiante</option>
                  <option value="teacher">Docente</option>
                  <option value="admin">Administrativo</option>
                </select>
              </label>
            </div>

            {/* Aceptación de términos */}
            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)} // guarda true/false
                aria-label="Acepto términos"
              />
              <span>
                Acepto los términos de uso y el tratamiento de mis datos según
                el proyecto Ruta EA.
              </span>
            </label>

            {/* Botón principal (se deshabilita mientras "enviando" es true) */}
            <button type="submit" className="auth-button" disabled={enviando}>
              {enviando ? "ENVIANDO..." : "REGISTRARME"}
            </button>
          </form>

          {/* Texto final de ayuda (podrías convertirlo en Link a /login si deseas) */}
          <p className="auth-footer-text">
            ¿Ya tienes una cuenta? Puedes iniciar sesión desde la pantalla de
            acceso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro; // Exporta el componente para usarlo en tu Routing (ruta /registro)