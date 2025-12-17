// URL base de tu API (Django/DRF) en entorno local.
// Nota: aquí BASE_URL ya incluye "/api" al final.
const BASE_URL = "http://127.0.0.1:8000/api";

// ======================================================
// apiFetch (wrapper genérico)
// - Unifica fetch + headers por defecto + parse JSON
// - Soporta body como objeto (JSON) o FormData (archivos)
// - Lanza error (throw) si la respuesta no es OK (status 2xx)
// ======================================================
export async function apiFetch(endpoint, options = {}) {
  // Construye la URL final. Si endpoint no empieza con "/", se lo agrega.
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Headers por defecto para indicar que esperamos JSON en la respuesta.
  const defaultHeaders = {
    Accept: "application/json",
  };

  // Configuración final que se envía a fetch()
  const config = {
    // Método por defecto: GET
    method: options.method || "GET",

    // Headers:
    // - Siempre incluye Accept: application/json
    // - Si NO es FormData, agrega Content-Type: application/json
    // - Permite sobrescribir/añadir headers externos con options.headers
    headers: {
      ...defaultHeaders,
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },

    // Body:
    // - Si body es FormData, se envía tal cual (para uploads)
    // - Si body existe y no es FormData, se convierte a JSON string
    // - Si no hay body, se envía null
    body:
      options.body instanceof FormData
        ? options.body
        : options.body
        ? JSON.stringify(options.body)
        : null,
  };

  // Ejecuta la petición HTTP
  const response = await fetch(url, config);

  // Detecta si la respuesta es JSON (por header Content-Type)
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");

  // Si es JSON, parsea; si no, deja data en null
  const data = isJson ? await response.json() : null;

  // Manejo de errores:
  // - Si response.ok es false (status 4xx/5xx), se lanza un Error
  // - Se adjunta status y data para que el caller pueda mostrar detalles
  if (!response.ok) {
    const error = new Error("Error en la petición");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  // Respuesta exitosa (ya parseada si era JSON)
  return data;
}

// ======================================================
// postData
// - Función específica para POST (crear recursos, login, etc.)
// - Usa fetch directo a la misma base local
// - Devuelve el JSON parseado del backend
// ======================================================
async function postData(endpoint, obj) {
  try {
    // Construye URL manualmente (nota: aquí se repite el host/base)
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indica que el body va en JSON
      },
      body: JSON.stringify(obj) // Convierte objeto JS a string JSON
    });

    // Parseo de la respuesta JSON
    const data = await peticion.json();
    console.log(data); // Debug: muestra respuesta del servidor
    return data; // Retorna datos al componente que llamó
  } catch (error) {
    console.error(error); // Manejo básico de errores (red, CORS, etc.)
  }
}

// ======================================================
// getData
// - Función específica para GET (consultar recursos)
// - Devuelve el JSON parseado del backend
// ======================================================
async function getData(endpoint) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Opcional en GET, pero no hace daño
      }
    });

    const data = await peticion.json();
    console.log(data); // Debug
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ======================================================
// deleteData
// - Función específica para DELETE (eliminar recursos)
// - Incluye Authorization Bearer usando access_token del localStorage
// - endpoint e id se concatenan en la URL final
// ======================================================
async function deleteData(endpoint, id) {
  try {
    // En tu uso actual, id suele venir con "/" al final o sin él:
    // aquí se concatena tal cual: .../${endpoint}/${id}
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Token de autenticación para endpoints protegidos en el backend
        "Authorization": "Bearer " + localStorage.getItem("access_token"),
      }
    });

    // Nota: algunos backends responden 204 (sin body). Aquí asumes JSON.
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ======================================================
// pathData (PATCH)
// - Función para actualizar parcialmente un recurso (PATCH)
// - Envía obj como JSON al backend
// ======================================================
async function pathData(endpoint, obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj) // Envia campos parciales para actualización
    });

    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Exportaciones nombradas para usar en tus componentes:
// import { postData, getData, deleteData, pathData } from "../services/api";
export { postData, getData, deleteData, pathData };