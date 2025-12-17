import React from "react"; // React para definir el componente funcional
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable (título + subtítulo)
import "../Style/indexconvocatorias.css"; // Estilos específicos de la página de Convocatorias

// Página: Convocatorias
// - Componente informativo y estático (no usa estado ni consume API)
// - Explica fases, requisitos y buenas prácticas para postular (ej. Yo Aplico)
const Convocatorias = () => {
  return (
    // Contenedor principal de la página
    // Clases: "page" (layout general) + "page-convocatorias" (estilos de esta vista)
    <div className="page page-convocatorias">
      {/* Encabezado principal de la página */}
      <PageHeader
        title="Convocatorias de Educación Abierta"
        subtitle="Resumen de fases, requisitos y buenas prácticas."
      />

      {/* Texto introductorio: contextualiza el propósito de la sección */}
      <p className="intro-text">
        En esta sección se presenta, de forma sencilla, cómo funcionan las
        convocatorias en Educación Abierta (EGBA, EDAD, etc.), qué requisitos
        suelen solicitarse y qué buenas prácticas seguir para evitar rechazos en
        plataformas como <strong>Yo Aplico</strong>.
      </p>

      {/* FASES DE UNA CONVOCATORIA */}
      {/* Sección informativa en formato “card” (según tu CSS) */}
      <section className="card-section">
        {/* Título de la sección */}
        <h2>Fases típicas de una convocatoria</h2>

        {/* Lista ordenada: describe el flujo típico de una convocatoria */}
        <ol>
          <li>
            <strong>1. Publicación de la convocatoria</strong> – La institución
            informa fechas, requisitos, cupos disponibles y población a la que
            va dirigida (por ejemplo: III ciclo, bachillerato por madurez, EGBA,
            EDAD, etc.).
          </li>
          <li>
            <strong>2. Difusión de la información</strong> – Se comparte el
            enlace oficial, afiches, redes sociales, comunicados internos y
            otros canales para que las personas interesadas se enteren a tiempo.
          </li>
          <li>
            <strong>3. Recepción de solicitudes (por ejemplo, en Yo Aplico)</strong>{" "}
            – Las personas completan el formulario digital, adjuntan
            documentos y confirman el envío dentro del plazo establecido.
          </li>
          <li>
            <strong>4. Revisión y verificación de requisitos</strong> – El
            equipo encargado revisa que la información esté completa y que los
            documentos cumplan con lo solicitado en la convocatoria.
          </li>
          <li>
            <strong>5. Publicación de resultados</strong> – Se comunican las
            personas aceptadas, listas de espera o casos rechazados con
            observaciones (cuando aplica).
          </li>
          <li>
            <strong>6. Formalización</strong> – Quienes fueron aceptados
            completan los pasos finales: matrícula, entrega de documentos
            físicos, firma de formularios, etc.
          </li>
        </ol>
      </section>

      {/* REQUISITOS FRECUENTES */}
      {/* Sección informativa: agrupa requisitos típicos por categoría */}
      <section className="card-section">
        <h2>Requisitos frecuentes en las convocatorias</h2>

        {/* Sub-sección: datos personales */}
        <h3>1. Datos personales</h3>
        <ul>
          <li>Nombre completo y número de identificación (cédula o pasaporte).</li>
          <li>Fecha de nacimiento y edad.</li>
          <li>Dirección de residencia y medio de contacto (teléfono, correo electrónico).</li>
        </ul>

        {/* Sub-sección: información académica */}
        <h3>2. Información académica</h3>
        <ul>
          <li>Nivel académico actual (II ciclo, III ciclo, bachillerato, etc.).</li>
          <li>Centro educativo de procedencia (si aplica).</li>
          <li>Historial de estudios o certificaciones anteriores.</li>
        </ul>

        {/* Sub-sección: documentos adjuntos típicos */}
        <h3>3. Documentos que suelen solicitar</h3>
        <ul>
          <li>Copia de la cédula o documento de identidad vigente.</li>
          <li>Certificaciones de notas o de conclusión de estudios.</li>
          <li>Comprobantes de condición especial (discapacidad, ayudas sociales, etc.), si la convocatoria lo indica.</li>
          <li>Documentos en formato PDF, legibles y completos.</li>
        </ul>

        {/* Sub-sección: condiciones particulares que pueden variar */}
        <h3>4. Condiciones específicas de cada convocatoria</h3>
        <ul>
          <li>Edad mínima o máxima según el programa.</li>
          <li>Residencia en determinada zona o región.</li>
          <li>Compromiso de asistencia a clases nocturnas o en modalidad abierta.</li>
        </ul>
      </section>

      {/* BUENAS PRÁCTICAS PARA YO APLICO */}
      {/* Sección: recomendaciones para reducir rechazos en plataformas */}
      <section className="card-section">
        <h2>Buenas prácticas para evitar rechazos en Yo Aplico</h2>
        <ul>
          <li>
            <strong>Leer la convocatoria completa</strong> antes de empezar el
            formulario, para entender bien qué se pide y a quién va dirigida.
          </li>
          <li>
            <strong>Revisar todos los campos obligatorios</strong> del
            formulario y no dejar espacios en blanco (especialmente datos de
            contacto y nivel académico).
          </li>
          <li>
            <strong>Subir documentos claros y legibles</strong> en PDF,
            evitando fotos borrosas, cortadas o incompletas.
          </li>
          <li>
            <strong>Verificar fechas</strong> de apertura y cierre de la
            convocatoria; enviar la solicitud con anticipación, no el último día.
          </li>
          <li>
            <strong>Comprobar la información antes de enviar</strong>: nombres
            bien escritos, números de cédula correctos, correos electrónicos sin
            errores.
          </li>
          <li>
            <strong>Guardar el comprobante o captura de pantalla</strong> del
            envío en Yo Aplico, por si luego se necesita comprobar que se
            realizó la postulación en la fecha indicada.
          </li>
        </ul>
      </section>

      {/* ORIENTACIÓN GENERAL */}
      {/* Sección: acciones sugeridas si la postulación fue rechazada */}
      <section className="card-section">
        <h2>¿Qué hacer si mi postulación es rechazada?</h2>
        <ul>
          <li>Leer con atención la razón del rechazo, si se indica.</li>
          <li>Corregir documentos o datos para la próxima convocatoria.</li>
          <li>
            Consultar con la institución o con la persona encargada de
            orientación para recibir apoyo en el proceso.
          </li>
        </ul>

        {/* Cierre de sección: objetivo pedagógico del contenido */}
        <p>
          El objetivo de esta sección es que el estudiantado y las personas
          interesadas en Educación Abierta tengan claridad sobre el proceso y
          aumenten sus posibilidades de que su postulación sea aceptada.
        </p>
      </section>
    </div>
  );
};

export default Convocatorias; // Exporta la página para usarla en el Routing (ruta /convocatorias)






