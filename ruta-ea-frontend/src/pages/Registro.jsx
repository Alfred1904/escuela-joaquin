// src/pages/Registro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../Style/index-auth.css";

const Registro = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    usuario: "",
    email: "",
    confirmarEmail: "",
    password: "",
    confirmarPassword: "",
    aceptaTerminos: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email !== formData.confirmarEmail) {
      alert("El correo y la confirmación no coinciden.");
      return;
    }
    if (formData.password !== formData.confirmarPassword) {
      alert("La contraseña y su confirmación no coinciden.");
      return;
    }
    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Guardamos datos básicos del usuario
    registrar({
      nombreCompleto: formData.nombreCompleto,
      usuario: formData.usuario,
      email: formData.email,
      password: formData.password,
    });

    alert("Registro completado. Ahora puedes iniciar sesión.");
    navigate("/login");
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
                <div className="field-label">Nombre completo</div>
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                  placeholder="Nombre y apellidos"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Nombre de usuario</div>
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                  placeholder="Ej: jgarcia.monge"
                />
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-field">
                <div className="field-label">Correo electrónico</div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu_correo@example.com"
                />
              </label>

              <label className="auth-field">
                <div className="field-label">Confirmar correo</div>
                <input
                  type="email"
                  name="confirmarEmail"
                  value={formData.confirmarEmail}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  placeholder="Repite la contraseña"
                />
              </label>
            </div>

            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                aria-label="Acepto términos"
              />
              <span>
                Acepto los términos de uso y el tratamiento de mis datos según
                el proyecto Ruta EA.
              </span>
            </label>

            <button type="submit" className="auth-button">
              REGISTRARME
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
