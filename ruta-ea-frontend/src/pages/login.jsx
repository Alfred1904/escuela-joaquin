// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../Style/index-auth.css";

const Login = () => {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = iniciarSesion(form.email, form.password);
    if (!ok) {
      alert("Correo o contraseña incorrectos o usuario no registrado.");
      return;
    }

    navigate("/"); // página principal
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-intro">
          <div className="auth-logo">
            <span className="auth-logo-icon">EA</span>
          </div>

          <h1 className="auth-title">Iniciar sesión</h1>
          <p className="auth-subtitle">
            Accede a la ruta de Educación Abierta para ver todo el contenido.
          </p>
        </div>

        <div className="auth-form-wrapper">
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <div className="field-label">Correo electrónico</div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu_correo@example.com"
              />
            </label>

            <label className="auth-field">
              <div className="field-label">Contraseña</div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Tu contraseña"
              />
            </label>

            <button type="submit" className="auth-button">
              ENTRAR
            </button>
          </form>

          <p className="auth-footer-text">
            ¿Aún no tienes cuenta?{" "}
            <Link to="/registro">Regístrate aquí</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
