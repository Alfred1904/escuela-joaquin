import React from "react"; // React para definir el componente funcional
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable (título + subtítulo)
import Card from "../components/Card.jsx"; // Componente Card reutilizable para mostrar bloques de contenido
import "../Style/indexinicio.css"; // Estilos específicos de la página de Inicio

// Página: Inicio
// - Vista principal del portal “Ruta EA”
// - Presenta una introducción breve y dos tarjetas informativas
// - Componente estático (no usa estado ni consume API)
const Inicio = () => {
  return (
    // Contenedor general de la página
    // "page" + "page-panel" mantienen el layout estándar del sitio
    // "page-inicio" aplica estilos específicos de esta vista
    <div className="page page-panel page-inicio">
      {/* Contenedor interno para controlar ancho, padding y disposición general */}
      <div className="inicio-contenido">
        {/* Encabezado principal de la página */}
        <PageHeader
          title="Ruta EA – Educación Abierta para Jóvenes y Adultos"
          subtitle="Portal informativo y de acompañamiento para quienes desean concluir sus estudios mediante Educación Abierta (EGBA / EDAD)."
        />

        {/* Sección de tarjetas en grid de 2 columnas (según CSS .grid-2) */}
        <section className="grid-2">
          {/* Tarjeta 1: explicación breve de Educación Abierta */}
          <Card title="¿Qué es Educación Abierta?">
            <p>
              La Educación Abierta del MEP certifica aprendizajes de personas
              jóvenes y adultas mediante evaluaciones estandarizadas y rutas
              flexibles.
            </p>
          </Card>

          {/* Tarjeta 2: información básica de la institución */}
          <Card title="Escuela Joaquín García Monge">
            <ul>
              <li>Modalidad: Educación Abierta (validación por suficiencia).</li>
              <li>Horario: Lunes a miércoles, 6:00 p.m. – 9:45 p.m.</li>
              <li>Ubicación: Desamparados, San José, Costa Rica.</li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Inicio; // Exporta la página para usarla en el Routing (ruta "/")