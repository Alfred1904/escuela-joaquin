import React, { useEffect, useState } from "react"; // Hooks: useState para estado, useEffect para cargar datos al montar
import { deleteData, getData, pathData } from "../../services/api"; // Helpers API: GET (listar), DELETE (eliminar), PATCH/PUT (editar)
import AdminSidebar from "../../components/Admi/AdminSidebar"; // Sidebar del panel administrativo
import EditUserModal from "../../components/Admi/Modal"; // Modal para editar datos del estudiante
import "../../Style/indexstudent.css"; // Estilos de la vista de administración de estudiantes

// Página/Admin: Gestión de estudiantes
// - Lista estudiantes (role === "student")
// - Permite eliminar estudiante
// - Permite abrir modal para editar estudiante
const AdminStudent = () => {
  // Estado: lista de estudiantes y conteo
  const [Estudiantes, setEstudiantes] = useState([]); // Array de estudiantes filtrados
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState(0); // Número total de estudiantes

  // Estado: control de visibilidad del modal
  const [mostrarModal,setMostrarModal]= useState(false);

  // Modal state (extra):
  // Nota: en este código "editOpen" se setea, pero en el render estás usando "mostrarModal"
  // (puede quedar como futuro refactor, pero aquí solo lo documentamos)
  const [editOpen, setEditOpen] = useState(false); // Bandera alternativa para abrir/cerrar (actualmente no se usa en el render)
  const [selectedStudent, setSelectedStudent] = useState(null); // Estudiante seleccionado para editar (objeto completo)

  // useEffect: cargar estudiantes una sola vez cuando se monta el componente
  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        // 1) Pedir usuarios al backend
        const response = await getData("usuario/");

        // 2) Filtrar solo estudiantes (role === "student")
        const filtroEstudiantes = response.filter(
          (estudiante) => estudiante.role === "student"
        );

        // 3) Guardar lista y conteo en estado
        setEstudiantes(filtroEstudiantes);
        setCantidadEstudiantes(filtroEstudiantes.length);
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error); // Log para depuración
      }
    };
    fetchEstudiantes();
  }, []);

  // Eliminar estudiante por id
  // - Llama a deleteData en el endpoint "eliminar-usuario/{id}/"
  // - Actualiza la UI sin recargar (filtra el estado local)
  const eliminarEstudiante = async (id) => {
    try {
      const peticion = await deleteData(`eliminar-usuario`, id + "/");
      console.log(peticion); // Útil para ver respuesta del backend

      // Actualiza UI sin recargar
      setEstudiantes((prev) => prev.filter((e) => e.id !== id)); // Quita el eliminado de la lista
      setCantidadEstudiantes((prev) => Math.max(0, prev - 1)); // Ajusta conteo sin bajar de 0
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  // Abrir modal en modo edición
  // - Guarda el estudiante seleccionado
  // - Muestra el modal
  // Nota: actualmente no se llama desde el botón "Editar" (se hace manual abajo)
  const openEdit = (estudiante) => {
    setMostrarModal(true);
    setSelectedStudent(estudiante);
    setEditOpen(true);
  };

  // Cerrar modal y limpiar selección
  // Nota: esto afecta editOpen y selectedStudent, pero tu modal se cierra con mostrarModal
  const closeEdit = () => {
    setEditOpen(false);
    setSelectedStudent(null);
  };

  // Helpers: utilidades para nombre completo (no afectan UI directamente)
  // - buildFullName: arma un string con first_name + last_name
  const buildFullName = (e) =>
    `${e?.first_name || ""} ${e?.last_name || ""}`.trim();

  // - splitFullName: separa un fullName en {first_name, last_name}
  //   (útil si el modal enviara un campo fullName, pero aquí realmente editas first/last separados)
  const splitFullName = (fullName) => {
    const cleaned = (fullName || "").trim().replace(/\s+/g, " ");
    if (!cleaned) return { first_name: "", last_name: "" };

    const parts = cleaned.split(" ");
    const first_name = parts.shift() || "";
    const last_name = parts.join(" ") || "";
    return { first_name, last_name };
  };

  // Guardar cambios del modal
  // - Recibe "payload" desde EditUserModal (lo que el modal envía)
  // - Construye un body para el backend
  // - Llama a pathData para actualizar en el servidor
  // - Actualiza la lista local con la respuesta
  const handleSave = async (payload) => {
    // Si no hay estudiante seleccionado, no hay nada que guardar
    if (!selectedStudent?.id) return;

    try {
      // payload = { fullName, email, gradeLevel }
      // Nota: Aquí se calcula splitFullName pero luego no se usa en "body"
      const { first_name, last_name } = splitFullName(payload.fullName);

      // Body que se envía al backend
      // Ajusta los nombres de campos si tu backend usa otros
      const body = {
        first_name: payload.first_name, // se espera que el modal envíe first_name
        last_name: payload.last_name,   // se espera que el modal envíe last_name
        email: payload.email,
        grade_level: payload.gradeLevel, 
      };

      // Petición de actualización al backend (endpoint por id)
      const updated = await pathData(`usuario/${selectedStudent.id}/`, body);

      // Actualiza UI con respuesta del backend (o con body si tu API no devuelve el objeto)
      setEstudiantes((prev) =>
        prev.map((e) => (e.id === selectedStudent.id ? { ...e, ...updated } : e))
      );

      // Cierra modal y limpia selección
      closeEdit();
    } catch (error) {
      console.error("Error al editar estudiante:", error);
    }
  };

  return (
    <div>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <h1>Gestión de Estudiantes</h1>
          <p>Cantidad de Estudiantes: {cantidadEstudiantes}</p>

          {/* Renderiza la lista de estudiantes */}
          {Estudiantes.map((estudiante) => (
            <div key={estudiante.id}>
              <h2>
                {estudiante.first_name} {estudiante.last_name}
              </h2>

              {/* Botón eliminar: borra en backend y actualiza UI */}
              <button onClick={() => eliminarEstudiante(estudiante.id)}>
                Eliminar
              </button>

              {/* Botón editar:
                  - Abre el modal
                  - Guarda el estudiante seleccionado en selectedStudent */}
              <button onClick={() =>{
                setMostrarModal(true);
                console.log("boton editar");
                setSelectedStudent(estudiante);
              }}>Editar</button>
            </div>
          ))}
        </main>
      </div>

      {/* Render condicional del modal:
          - Solo se muestra si mostrarModal es true
          - initialData recibe el estudiante seleccionado
          - onSave llama handleSave */}
      {mostrarModal && (
      <EditUserModal
        open={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSave={handleSave}
        title="Editar estudiante"
        initialData={selectedStudent}
      />
      )}
    </div>
  );
};

export default AdminStudent; // Exporta la página para usarla en Routing (/admin/estudiantes)