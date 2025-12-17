import React from "react"; // React para definir el componente funcional

// Footer: pie de página del sitio
// - Contiene información institucional del proyecto y la escuela
// - Incluye contexto del programa (Educación Abierta EGBA/EDAD)
// - Incluye créditos y enlace de referencia
const Footer = () => {
  return (
    // Contenedor semántico del pie de página
    // La clase "footer" controla el estilo (fondo, tipografía, espaciado, etc.)
    <footer className="footer">
      {/* Descripción general del proyecto */}
      <p>
        Proyecto “Ruta EA” – Plataforma de orientación, matrícula y estudio
        guiado para Educación Abierta (EGBA / EDAD).
      </p>

      {/* Información de la institución y ubicación */}
      <p>
        Escuela Joaquín García Monge · Educación Abierta · Desamparados, San
        José, Costa Rica · Horario nocturno: Lunes a miércoles, 6:00 p.m. – 9:45
        p.m.
      </p>

      {/* Créditos del marco académico / programa */}
      <p>
        Desarrollado en el marco de Forward Costa Rica – Tech & Freedom (Proyecto
        Final FullStack).
      </p>

      {/* Enlace de referencia (DGEC / MEP) */}
      {/* Recomendación: si luego quieres que sea clicable, puedes convertirlo en <a href="..."> */}
      <p>
        https://dgec.mep.go.cr/educacion-abierta/
      </p>

      {/* Agradecimientos */}
      <p>
        Agradecimientos alequipo de Fordward Costa Rica y al apoyo de JeanCarlo Barberena.
      </p>
    </footer>
  );
};

export default Footer; // Exporta el Footer para incluirlo en el layout general (Navbar + contenido + Footer)