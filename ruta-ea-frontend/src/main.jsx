import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./components/Routing.jsx";
import "./Style/index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Routing />
    </AuthProvider>
  </React.StrictMode>
);
