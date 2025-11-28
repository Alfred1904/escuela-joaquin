// src/services/usuarios.js
import { apiFetch } from "./api";

export function crearUsuarioDesdeRegistro(formData) {
  const partesNombre = formData.nombreCompleto.trim().split(" ");
  const first_name = partesNombre[0] || "";
  const last_name = partesNombre.slice(1).join(" ");

  const payload = {
    username: formData.usuario,
    first_name,
    last_name,
    email: formData.email,
    role: "student",
    num_telefono: "",
    num_cedula: "",
    fecha_nacimiento: null,
    password: formData.password,
  };

  return apiFetch("/usuario/", {
    method: "POST",
    body: payload,
  });
}
