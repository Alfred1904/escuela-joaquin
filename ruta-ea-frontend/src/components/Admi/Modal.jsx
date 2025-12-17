// src/components/Modals/EditUserModal.jsx
import React, { useEffect, useMemo, useState } from "react"; // Hooks: estado, memoización y efectos (teclado / reset del form)
import { pathData } from "../../services/api"; // Helper para enviar actualización al backend (ojo: suele llamarse patchData)
import "../../Style/indexmodal.css"; // Estilos del modal (overlay, card, inputs, botones, etc.)

// Modal para editar datos de un usuario/estudiante
// Props:
// - open: boolean => controla si el modal se muestra
// - onClose: function => cierra el modal (click fuera, botón X, Escape)
// - onSave: function => callback para enviar datos al componente padre (si se usa)
// - initialData: objeto => datos iniciales del usuario seleccionado (first_name, last_name, email, gradeLevel, id)
// - title: string => título que se muestra en el modal
const EditUserModal = ({
  open,
  onClose,
  onSave,
  initialData,
  title = "Editar información",
}) => {
  // Construye un objeto inicial “seguro” para evitar undefined
  // useMemo evita recomputarlo si initialData no cambia
  const safeInitial = useMemo(
    () => ({
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      email: initialData?.email || "",
      gradeLevel: initialData?.gradeLevel || "",
    }),
    [initialData]
  );

  // Estado del formulario (inputs controlados)
  const [form, setForm] = useState(safeInitial);

  // Estado de errores de validación (por campo)
  const [errors, setErrors] = useState({});

  // Reinicia el formulario cada vez que:
  // - se abre el modal (open)
  // - cambian los datos iniciales (safeInitial)
  useEffect(() => {
    setForm(safeInitial);
    setErrors({});
  }, [safeInitial, open]);

  // Permite cerrar con tecla Escape cuando el modal está abierto
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.(); // cierre seguro (si existe onClose)
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Si open es false, no renderiza nada (modal oculto)
  if (!open) return null;

  // Handler genérico para inputs/select:
  // Usa el atributo "name" para actualizar la propiedad correspondiente en form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Valida campos obligatorios y formato de email
  // Guarda mensajes en "errors" y devuelve true/false
  const validate = () => {
    const next = {};

    if (!form.first_name.trim()) next.first_name = "El nombre es requerido.";
    if (!form.last_name.trim()) next.last_name = "El apellido es requerido.";

    if (!form.email.trim()) next.email = "El correo electrónico es requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Formato de correo inválido.";

    if (!form.gradeLevel.trim())
      next.gradeLevel = "El grado o nivel es requerido.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Submit del formulario:
  // - previene recarga
  // - valida
  // - llama onSave (si el padre lo usa)
  // Nota: aquí se usa fullName, pero tu form guarda first_name/last_name.
  // Si el padre espera fullName, habría que construirlo; si no, enviar first/last.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Entrega payload limpio al padre
    await onSave?.({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      gradeLevel: form.gradeLevel.trim(),
    });
  };

  // Cierra el modal si el click se hace en el fondo (overlay) y no en la tarjeta
  const handleOverlayClick = (e) => {
    // Cerrar solo si hace click fuera del panel
    if (e.target.classList.contains("modal-overlay")) onClose?.();
  };

  // Actualiza en backend directamente (petición HTTP)
  // - arma el objeto con id y campos editados
  // - llama a pathData("editar-usuario/", objActualizar)
  // Nota: aquí no se actualiza el estado del padre; el padre debe refrescar o usar onSave.
  const actualizarEstudiante = async () => {
    const objActualizar = {
      id: initialData.id,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
    };
    const peticion = await pathData("editar-usuario/", objActualizar);
  };

  return (
    // Overlay: cubre toda la pantalla
    // onMouseDown: detecta clicks fuera del modal para cerrar
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      {/* Tarjeta central del modal (diálogo) */}
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-user-modal-title"
      >
        {/* Encabezado del modal */}
        <header className="modal-header">
          <div>
            {/* Título configurable */}
            <h2 id="edit-user-modal-title" className="modal-title">
              {title}
            </h2>

            {/* Texto guía */}
            <p className="modal-subtitle">Edita los campos y guarda los cambios.</p>
          </div>

          {/* Botón cerrar (X) */}
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        {/* Formulario principal del modal */}
        <form className="modal-body" onSubmit={handleSubmit}>
          {/* Campo: Nombre */}
          <div className="modal-field">
            <label htmlFor="">Nombre</label>
            {/* Input controlado: su valor viene del estado "form" */}
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>

          {/* Campo: Apellido */}
          <div className="modal-field">
            <label htmlFor="">Apellido</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

          {/* Campo: Email (con validación visual) */}
          <div className="modal-field">
            <label className="modal-label" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              className={`modal-input ${errors.email ? "is-error" : ""}`}
              type="email"
              placeholder="Ej: correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {/* Mensaje de error si existe */}
            {errors.email && <small className="modal-error">{errors.email}</small>}
          </div>

          {/* Campo: Grado o nivel */}
          <div className="modal-field">
            <label className="modal-label" htmlFor="gradeLevel">
              Grado o nivel
            </label>

            {/* Select controlado */}
            <select
              id="gradeLevel"
              name="gradeLevel"
              className={`modal-select ${errors.gradeLevel ? "is-error" : ""}`}
              value={form.gradeLevel}
              onChange={handleChange}
            >
              <option value="">Seleccionar…</option>
              <option value="EGBA (III Ciclo)">EGBA (III Ciclo)</option>
              <option value="EDAD (Diversificada)">EDAD (Diversificada)</option>
              <option value="Noveno">Noveno</option>
              <option value="Décimo">Décimo</option>
              <option value="Undécimo">Undécimo</option>
              <option value="Duodécimo">Duodécimo</option>
            </select>

            {/* Mensaje de error si existe */}
            {errors.gradeLevel && (
              <small className="modal-error">{errors.gradeLevel}</small>
            )}
          </div>

          {/* Acciones del modal */}
          <footer className="modal-actions">
            {/* Cierra sin guardar */}
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>

            {/* Guarda cambios:
                - actualmente llama actualizarEstudiante (backend directo)
                - NO dispara el submit del form (porque es type="button") */}
            <button
              type="button"
              onClick={() => {
                actualizarEstudiante();
              }}
              className="btn-primary"
            >
              Guardar cambios
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal; // Export para usarlo desde AdminStudent/AdminTeachers/etc.






