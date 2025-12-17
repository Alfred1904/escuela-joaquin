import React from "react";
// GUÍA: Importa React para poder usar JSX y utilidades como <React.StrictMode>.

import ReactDOM from "react-dom/client";
// GUÍA: ReactDOM se encarga de “montar” tu aplicación React dentro del HTML.
// En Vite/React moderno se usa "react-dom/client" con createRoot (modo concurrent).

import Routing from "./components/Routing.jsx";
// GUÍA: Componente principal de rutas.
// Normalmente aquí se define el <BrowserRouter> y los <Routes>/<Route>.

import "./Style/index.css";
// GUÍA: CSS global de toda la app (variables, layout base, navbar, footer, etc.).
// Se importa aquí para que aplique a TODAS las páginas desde el inicio.

import { AuthProvider } from "./context/AuthContext.jsx";
// GUÍA: Proveedor del contexto de autenticación.
// Permite que cualquier componente hijo use useAuth() para saber si hay usuario, token, rol, etc.

ReactDOM.createRoot(document.getElementById("root")).render(
  // GUÍA: Crea el “root” de React dentro del <div id="root"></div> en tu index.html.
  // Todo lo que renderiza React vive dentro de ese contenedor.

  <React.StrictMode>
    {/* GUÍA: StrictMode ayuda a detectar problemas en desarrollo.
        Nota: en modo desarrollo puede ejecutar ciertos efectos 2 veces (por seguridad),
        pero en producción no ocurre. */}

    <AuthProvider>
      {/* GUÍA: Envuelve la app para que el estado de autenticación esté disponible globalmente.
          Todo lo que esté adentro podrá acceder al contexto. */}

      <Routing />
      {/* GUÍA: Punto de entrada de tu navegación (páginas/rutas).
          Aquí se muestran los componentes según la URL. */}
    </AuthProvider>
  </React.StrictMode>
);