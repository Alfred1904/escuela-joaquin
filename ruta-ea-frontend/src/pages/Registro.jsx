import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../Style/index-auth.css";
import { postData } from "../services/api.js";

const Registro = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("student");
  const [numTelefono, setNumTelefono] = useState("");
  const [numCedula, setNumCedula] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmarEmail) {
      alert("El correo y la confirmación no coinciden.");
      return;
    }
    if (password !== confirmarPassword) {
      alert("La contraseña y su confirmación no coinciden.");
      return;
    }
    if (!aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      setEnviando(true);

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

      const peticion = await postData("usuario/", objUsuario);
      console.log("Usuario creado en el backend:", peticion);

      alert("Registro completado. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.data) {
        alert("Error al registrar en el servidor: " + JSON.stringify(error.data));
      } else {
        alert("Ocurrió un error al registrar el usuario en el servidor.");
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
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

        <div className="auth-form-wrapper">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-row">
         

              <label className="auth-field">
                <div className="field-label">Nombre de usuario</div>
                <input
                  type="text"
                  name="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  placeholder="Ej: jgarcia.monge"
                />
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Nombre (first_name)</div>
                <input
                  type="text"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Nombre"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Apellidos (last_name)</div>
                <input
                  type="text"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Apellidos"
                />
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Correo electrónico</div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setConfirmarEmail(e.target.value)}
                  required
                  placeholder="Repite tu correo"
                />
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Contraseña</div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Repite la contraseña"
                />
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Número de teléfono</div>
                <input
                  type="tel"
                  name="num_telefono"
                  value={numTelefono}
                  onChange={(e) => setNumTelefono(e.target.value)}
                  placeholder="Ej: 8888-8888"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Número de cédula</div>
                <input
                  type="text"
                  name="num_cedula"
                  value={numCedula}
                  onChange={(e) => setNumCedula(e.target.value)}
                  placeholder="Ej: 1-1111-1111"
                />
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Fecha de nacimiento</div>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Rol</div>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Estudiante</option>
                </select>
              </label>
            </div>

            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                aria-label="Acepto términos"
              />
              <span>
                Acepto los términos de uso y el tratamiento de mis datos según
                el proyecto Ruta EA.
              </span>
            </label>

            <button type="submit" className="auth-button" disabled={enviando}>
              {enviando ? "ENVIANDO..." : "REGISTRARME"}
            </button>
          </form>

          <p className="auth-footer-text">
            ¿Ya tienes una cuenta? Puedes iniciar sesión desde la pantalla de
            acceso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
