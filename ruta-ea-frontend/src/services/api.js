const BASE_URL = "http://127.0.0.1:8000/api";

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultHeaders = {
    Accept: "application/json",
  };

  const config = {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
    body:
      options.body instanceof FormData
        ? options.body
        : options.body
        ? JSON.stringify(options.body)
        : null,
  };

  const response = await fetch(url, config);

  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error("Error en la petición");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}


async function postData(endpoint,obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    })
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    
  }
}
async function getData(endpoint) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    
  }
}

async function deleteData(endpoint,id) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    
  }
}
async function pathData(endpoint,id,obj) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/api/${endpoint}/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    })
    const data = await peticion.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    
  }
}
export {postData, getData, deleteData, pathData};