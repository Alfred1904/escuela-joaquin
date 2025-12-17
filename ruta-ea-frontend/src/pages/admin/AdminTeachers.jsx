import React, { useEffect, useState } from 'react'; // Hooks: useState para estado, useEffect para cargar datos al montar
import { deleteData, getData } from '../../services/api'; // Helpers API: GET (listar usuarios) y DELETE (eliminar usuario)
import AdminSidebar from '../../components/Admi/AdminSidebar'; // Sidebar del panel admin (navegación)
import "../../Style/indexadmindashboard.css"; // Estilos del dashboard/admin (layout, tipografías, etc.)

// Página/Admin: Gestión de Docentes
// - Lista usuarios con role === "teacher"
// - Muestra el total de docentes
// - Permite eliminar un docente por id
const AdminTeachers = () => {
    // Estado: lista de docentes y contador
    const [Docentes, setDocentes] = useState([]); // Array de docentes filtrados desde /usuario/
    const [cantidadDocentes, setCantidadDocentes] = useState(0) // Total de docentes

    // useEffect: se ejecuta una vez al montar el componente
    // - Consulta el endpoint "usuario/"
    // - Filtra solo docentes (role === "teacher")
    // - Actualiza lista y contador
    useEffect(() => {
        const fetchDocentes = async () => {
            try {
                // 1) Obtener usuarios desde backend
                const response = await getData("usuario/");

                // 2) Filtrar solo docentes
                const filtroDocentes = response.filter((docente) => docente.role === "teacher");

                // 3) Guardar en estado la lista y el total
                setDocentes(filtroDocentes);
                setCantidadDocentes(filtroDocentes.length);
            } catch (error) {
                // Manejo de error: imprime en consola para depuración
                console.error('Error al obtener los docentes:', error);
            }
        };
        fetchDocentes(); // Ejecuta la carga inicial
    }, []);

    // Eliminar profesor por id
    // - Llama al endpoint eliminar-usuario/{id}/
    // Nota: aquí NO se actualiza el estado local (Docentes/cantidadDocentes),
    // por lo que visualmente seguirá apareciendo hasta que recargues o vuelvas a fetch.
    const eliminarProfesor = async (id) => {
        const peticion = await deleteData(`eliminar-usuario`, id+"/");
        console.log(peticion); // Muestra respuesta del backend (útil para verificar éxito)
    }

    return (
        <div>
            <div className="admin-layout">
                {/* Sidebar fijo del panel admin */}
                <AdminSidebar />

                {/* Contenido principal */}
                <main className="admin-main">
                    {/* Encabezado de la sección */}
                    <h1>Gestión de Docentes</h1>

                    {/* KPI simple: total de docentes */}
                    <p>Cantidad de Docentes: {cantidadDocentes}</p>

                    {/* Renderiza la lista de docentes */}
                    {Docentes.map((docente) => (
                        <div key={docente.id}>
                            {/* Nombre del docente */}
                            <h2>{docente.first_name} {docente.last_name}</h2>

                            {/* Botón eliminar:
                                - Al hacer click, llama a eliminarProfesor con el id del docente */}
                            <button
                                    onClick={()=>{eliminarProfesor(docente.id)}}
                            >Eliminar</button>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
}

export default AdminTeachers; // Exporta la página para usarla en Routing (ruta /admin/docentes)