// src/Routes/Routing.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//   import { AuthProvider } from "../context/AuthContext.jsx";
import RutaPrivada from "./Rutaprivada.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import Inicio from "../pages/Inicio.jsx";
import Contenido from "../pages/Contenido.jsx";
import Perfiles from "../pages/Perfiles.jsx";
import Convocatorias from "../pages/Convocatorias.jsx";
import Calendario from "../pages/Calendario.jsx";
import Testimonios from "../pages/Testimonios.jsx";
import SobreNosotros from "../pages/SobreNosotros.jsx";
import Contacto from "../pages/Contacto.jsx";
import Registro from "../pages/Registro.jsx";
import Login from "../pages/login.jsx";

const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="page-wrapper">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <RutaPrivada>
                <Inicio />
              </RutaPrivada>
            }
          />
          <Route
            path="/contenido"
            element={
              <RutaPrivada>
                <Contenido />
              </RutaPrivada>
            }
          />
          <Route
            path="/perfiles"
            element={
              <RutaPrivada>
                <Perfiles />
              </RutaPrivada>
            }
          />
          <Route
            path="/convocatorias"
            element={
              <RutaPrivada>
                <Convocatorias />
              </RutaPrivada>
            }
          />
          <Route
            path="/calendario"
            element={
              <RutaPrivada>
                <Calendario />
              </RutaPrivada>
            }
          />
          <Route
            path="/testimonios"
            element={
              <RutaPrivada>
                <Testimonios />
              </RutaPrivada>
            }
          />
          <Route
            path="/sobre-nosotros"
            element={
              <RutaPrivada>
                <SobreNosotros />
              </RutaPrivada>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
