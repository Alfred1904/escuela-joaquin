import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Inicio from "./pages/Inicio.jsx";
import Contenido from "./pages/Contenido.jsx";
import Perfiles from "./pages/Perfiles.jsx";
import Convocatorias from "./pages/Convocatorias.jsx";
import Calendario from "./pages/Calendario.jsx";
import Testimonios from "./pages/Testimonios.jsx";
import SobreNosotros from "./pages/SobreNosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Registro from "./pages/Registro.jsx"; // 👈 NUEVO

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contenido" element={<Contenido />} />
          <Route path="/perfiles" element={<Perfiles />} />
          <Route path="/convocatorias" element={<Convocatorias />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} /> {/* 👈 NUEVA RUTA */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
