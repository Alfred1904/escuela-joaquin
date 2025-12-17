// src/services/usuarios.js
// Este archivo agrupa funciones de "servicio" relacionadas con usuarios.
// La idea es separar la lógica de llamadas a la API fuera de los componentes.

import { apiFetch } from "./api"; // Importa el wrapper genérico de fetch (maneja JSON, errores, etc.)

// ======================================================
// crearUsuarioDesdeRegistro(formData)
// - Recibe un objeto con los datos del formulario de registro (front-end)
// - Construye un payload con la estructura esperada por el backend (Django/DRF)
// - Ejecuta un POST a /usuario/ para crear el usuario
// ======================================================
export function crearUsuarioDesdeRegistro(formData) {
  // Separa el nombre completo por espacios para armar first_name y last_name.
  // Ejemplo: "Juan Carlos Pérez Mora"
  // first_name = "Juan"
  // last_name  = "Carlos Pérez Mora"
  const partesNombre = formData.nombreCompleto.trim().split(" ");
  const first_name = partesNombre[0] || "";
  const last_name = partesNombre.slice(1).join(" ");

  // Payload final que se enviará al backend.
  // Nota: aquí estás "forzando" role = "student" para que el registro público
  // cree estudiantes por defecto. Si luego quieres permitir docente/admin,
  // deberías tomar role desde formData (y validarlo en backend).
  const payload = {
    username: formData.usuario,      // username del formulario
    first_name,                      // nombre (primer token del nombre completo)
    last_name,                       // apellidos (resto del nombre completo)
    email: formData.email,           // email del formulario
    role: "student",                 // rol por defecto al registrarse
    num_telefono: "",                // placeholders: puedes llenarlos desde el formulario si los capturas
    num_cedula: "",                  // placeholders: idem
    fecha_nacimiento: null,          // placeholder: puede ser Date/ISO string si lo agregas luego
    password: formData.password,     // contraseña del formulario
  };

  // Llamada a la API:
  // - endpoint: "/usuario/" (ojo: apiFetch ya añade BASE_URL)
  // - method: POST (crear)
  // - body: payload (apiFetch lo convierte a JSON automáticamente)
  return apiFetch("/usuario/", {
    method: "POST",
    body: payload,
  });
}