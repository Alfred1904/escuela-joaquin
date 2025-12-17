import React from "react"; 
// GUÍA: React es necesario para definir componentes (App) y usar JSX.

import { Routes, Route } from "react-router-dom";
// GUÍA: Routes/Route permiten definir el enrutamiento (qué componente se muestra según la URL).
// IMPORTANTE: Esto funciona cuando App está dentro de un <BrowserRouter> (normalmente en main.jsx).

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// GUÍA: Navbar y Footer son componentes “globales” que se muestran en todas las páginas.

import Inicio from "./pages/Inicio.jsx";
import Contenido from "./pages/Contenido.jsx";
import Perfiles from "./pages/Perfiles.jsx";
import Convocatorias from "./pages/Convocatorias.jsx";
import Calendario from "./pages/Calendario.jsx";
import Testimonios from "./pages/Testimonios.jsx";
import SobreNosotros from "./pages/SobreNosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Registro from "./pages/Registro.jsx";
import Archivos from "./pages/Archivos.jsx";    
// GUÍA: Estos imports son las “páginas” (vistas) que se renderizan según la ruta.
// Consejo: Mantén consistencia en nombres y rutas (pages/Nombre.jsx).

const App = () => {
  // GUÍA: App es el componente raíz de la parte visual.
  // Aquí se arma el layout general: Navbar arriba, contenido al centro, Footer abajo.
  return (
    <div className="app-container">
      {/* GUÍA: Contenedor principal del layout (flex/alto completo según tu CSS global). */}
      
      <Navbar />
      {/* GUÍA: Barra de navegación fija/global (se mantiene mientras cambias de página). */}

      <main className="app-main">
        {/* GUÍA: Área principal donde se cargan las páginas según la ruta. */}
        
        <Routes>
          {/* GUÍA: Cada <Route> mapea una URL (path) a un componente (element). */}
          
          <Route path="/" element={<Inicio />} />
          {/* GUÍA: Ruta raíz. Cuando entras a tu dominio (/) se muestra Inicio. */}

          <Route path="/contenido" element={<Contenido />} />
          {/* GUÍA: /contenido muestra la página Contenido. */}

          <Route path="/perfiles" element={<Perfiles />} />
          {/* GUÍA: /perfiles muestra la página Perfiles. */}

          <Route path="/convocatorias" element={<Convocatorias />} />
          {/* GUÍA: /convocatorias muestra la página Convocatorias. */}

          <Route path="/calendario" element={<Calendario />} />
          {/* GUÍA: /calendario muestra la página Calendario. */}

          <Route path="/testimonios" element={<Testimonios />} />
          {/* GUÍA: /testimonios muestra la página Testimonios. */}

          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          {/* GUÍA: /sobre-nosotros muestra la página SobreNosotros. */}

          <Route path="/contacto" element={<Contacto />} />
          {/* GUÍA: /contacto muestra la página Contacto. */}

          <Route path="/registro" element={<Registro />} /> {/* 👈 NUEVA RUTA */}
          {/* GUÍA: /registro muestra la página Registro.
              OJO: si no puedes entrar a esta ruta, revisa:
              1) que Registro.jsx exporte correctamente el componente,
              2) que el <BrowserRouter> esté envolviendo App,
              3) que el link del Navbar apunte exactamente a "/registro". */}

          <Route path="/archivos" element={<Archivos />} />
          {/* GUÍA: /archivos muestra la página Archivos (subida/listado de archivos). */}
        </Routes>
      </main>

      <Footer />
      {/* GUÍA: Pie de página global (se mantiene mientras cambias de página). */}
    </div>
  );
};

export default App;
// GUÍA: Exportas App para que main.jsx lo renderice en el DOM.