// src/Routes/Routing.jsx
import React from "react"; // React para definir el componente de ruteo
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router: router principal + definición de rutas

// AuthProvider (Contexto de autenticación)
// - Permite que toda la app tenga acceso a usuario, rol, login/logout, etc.
// - En este archivo está importado, pero actualmente NO está envolviendo la app (ver bloque comentado).
import { AuthProvider } from "../context/AuthContext.jsx";

import RutaPrivada from "../components/RutaPrivada.jsx"; // Componente wrapper para proteger rutas (requiere autenticación y/o roles)
import Navbar from "../components/Navbar.jsx"; // Barra de navegación (se muestra en todas las páginas)
import Footer from "../components/Footer.jsx"; // Pie de página (se muestra en todas las páginas)

// Páginas públicas y protegidas
import Inicio from "../pages/Inicio.jsx";
import Contenido from "../pages/Contenido.jsx";
import Perfiles from "../pages/Perfiles.jsx";
import Convocatorias from "../pages/Convocatorias.jsx";
import Calendario from "../pages/Calendario.jsx";
import Testimonios from "../pages/Testimonios.jsx";
import SobreNosotros from "../pages/SobreNosotros.jsx";
import Contacto from "../pages/Contacto.jsx";
import Registro from "../pages/Registro.jsx";
import Login from "../pages/Login.jsx";
import Archivos from "../pages/Archivos.jsx";

// Páginas del módulo Admin
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminTeachers from "../pages/admin/AdminTeachers.jsx";
import AdminStudent from "../pages/admin/AdminStudent.jsx";

// Componente principal de ruteo
// - Define qué página se renderiza según la URL
// - Controla rutas públicas y rutas protegidas con RutaPrivada
const Routing = () => {
  return (
    // BrowserRouter: habilita navegación SPA (sin recargar página)
    <BrowserRouter>
      {/* Si activas AuthProvider, sería algo así:
          - Envuelves Navbar, Routes y Footer para que todos tengan acceso al contexto.
          - Esto es recomendable si RutaPrivada y Navbar dependen de AuthContext.
      <AuthProvider>
        <Navbar />
        <main className="page-wrapper">
          <Routes>...</Routes>
        </main>
        <Footer />
      </AuthProvider>
      */}

      {/* Navbar se muestra en todas las rutas (públicas y privadas) */}
      <Navbar />

      {/* Contenedor principal del contenido de cada página */}
      <main className="page-wrapper">
        <Routes>
          {/* =========================
             RUTAS PÚBLICAS
             - No requieren autenticación
             ========================= */}
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* =========================
             RUTAS PROTEGIDAS
             - Se envuelven con RutaPrivada
             - Requieren autenticación (y opcionalmente roles)
             ========================= */}
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
          <Route
            path="/archivos"
            element={
              <RutaPrivada>
                <Archivos />
              </RutaPrivada>
            }
          />

          {/* =========================
             RUTAS ADMIN (como están ahora)
             - Estas 3 rutas NO están protegidas en este bloque (acceso directo)
             - Si quieres protegerlas, deberías envolverlas con RutaPrivada y allowedRoles.
             ========================= */}
          <Route
            path="/admin"
            element={
              <AdminDashboard />
            }
          />
          <Route
            path="/admin/docentes"
            element={
              <AdminTeachers />
            }
          />
          <Route
            path="/admin/estudiantes"
            element={
              <AdminStudent />
            }
          />

          {/* =========================
             RUTA ADMIN PROTEGIDA (duplicada)
             - Aquí vuelves a declarar /admin, pero protegida por roles
             - OJO: Tener /admin dos veces puede causar comportamientos confusos.
             - En React Router v6, se renderiza la que mejor coincida, pero
               duplicar la misma ruta es mala práctica y dificulta el mantenimiento.
             ========================= */}
          <Route
            path="/admin"
            element={
              <RutaPrivada allowedRoles={["admin", "teacher"]}>
                <AdminDashboard />
              </RutaPrivada>
            }
          />
        </Routes>
      </main>

      {/* Footer se muestra en todas las rutas (públicas y privadas) */}
      <Footer />
    </BrowserRouter>
  );
};

export default Routing; // Exporta el componente para usarlo en main.jsx/App.jsx