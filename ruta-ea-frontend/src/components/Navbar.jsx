import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../Style/index.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Inicio" },
    { to: "/contenido", label: "Contenido EA" },
    { to: "/perfiles", label: "Perfiles" },
    { to: "/convocatorias", label: "Convocatorias" },
    { to: "/calendario", label: "Calendario" },
    { to: "/testimonios", label: "Testimonios" },
    { to: "/sobre-nosotros", label: "Sobre nosotros" },
    { to: "/contacto", label: "Contacto" },
    { to: "/registro", label: "Registro" },
    { to: "/", label: "Cerrar sesión" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          Ruta EA
          <span className="navbar-subtitle">Educación Abierta</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setOpen((p) => !p)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <nav className={`navbar-links ${open ? "navbar-links--open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "navbar-link navbar-link--active" : "navbar-link"
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
