import React from "react";
import PageHeader from "../components/PageHeader.jsx";
import Card from "../components/Card.jsx";

const Inicio = () => {
  return (
    <div className="page page-panel">
      <PageHeader
        title="Ruta EA – Educación Abierta para Jóvenes y Adultos"
        subtitle="Portal informativo y de acompañamiento para quienes desean concluir sus estudios mediante Educación Abierta (EGBA / EDAD)."
      />

      <section className="grid-2">
        <Card title="¿Qué es Educación Abierta?">
          <p>
            La Educación Abierta del MEP certifica aprendizajes de personas
            jóvenes y adultas mediante evaluaciones estandarizadas y rutas
            flexibles.
          </p>
        </Card>

        <Card title="Escuela Joaquín García Monge">
          <ul>
            <li>Modalidad: Educación Abierta (validación por suficiencia).</li>
            <li>Horario: Lunes a miércoles, 6:00 p.m. – 9:45 p.m.</li>
            <li>Ubicación: Desamparados, San José, Costa Rica.</li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default Inicio;
