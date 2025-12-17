import React from "react"; // React para definir el componente funcional

// Card: componente reutilizable para mostrar contenido en forma de “tarjeta”
// Props:
// - title: string (opcional) => título que se muestra en la parte superior de la tarjeta
// - tag: string (opcional) => etiqueta pequeña (badge) para destacar categoría/estado (ej: "Nuevo", "Importante")
// - children: ReactNode => contenido interno de la tarjeta (texto, listas, botones, etc.)
const Card = ({ title, children, tag }) => {
  return (
    // Contenedor semántico del bloque de contenido (tarjeta)
    // La clase "card" define el estilo base en tu CSS
    <article className="card">
      {/* Tag opcional:
         - Solo se renderiza si "tag" existe
         - Útil para mostrar badges/etiquetas arriba del contenido */}
      {tag && <span className="card-tag">{tag}</span>}

      {/* Título opcional:
         - Solo se renderiza si "title" existe
         - Encabezado principal de la tarjeta */}
      {title && <h3 className="card-title">{title}</h3>}

      {/* Cuerpo de la tarjeta:
         - Renderiza todo el contenido que envíes dentro de <Card> ... </Card> */}
      <div className="card-body">{children}</div>
    </article>
  );
};

export default Card; // Exporta el componente para reutilizarlo en Inicio, Perfiles, Convocatorias, etc.