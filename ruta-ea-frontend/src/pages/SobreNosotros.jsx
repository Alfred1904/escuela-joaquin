import React from "react"; // React para definir el componente funcional
import PageHeader from "../components/PageHeader.jsx"; // Encabezado reutilizable de páginas (título + subtítulo)
import "../Style/indexsobrenosotros.css"; // Hoja de estilos específica para esta página/sección

const SobreNosotros = () => {
  return (
    // Contenedor principal de la página: usa clases globales (page/page-panel) para layout consistente
    <div className="page page-panel">
      {/* Encabezado superior: título y descripción breve de la sección */}
      <PageHeader
        title="Sobre nosotros"
        subtitle="La Escuela Joaquín García Monge y el maestro que le dio nombre: crónica de un símbolo desamparadeño."
      />

      {/* Sección principal del contenido "Sobre nosotros" */}
      <section className="sobre-section">
        {/* Título general del bloque histórico */}
        <h2>Historia y legado</h2>

        {/* 1. Un edificio que sostiene la memoria de un cantón */}
        {/* Cada <article> representa un bloque temático independiente (ideal para lectura y accesibilidad) */}
        <article className="sobre-bloque">
          {/* Subtítulo numerado del bloque */}
          <h3>1. Un edificio que sostiene la memoria de un cantón</h3>

          {/* Párrafo 1: contexto geográfico y relevancia simbólica del edificio en Desamparados */}
          <p>
            En el centro de Desamparados, a pocos metros de la iglesia y del parque,
            se levanta un edificio que para muchas personas pasa desapercibido en
            medio del tráfico y las ventas ambulantes. Sin embargo, su silueta es tan
            representativa del cantón que aparece dibujada en el escudo oficial de
            Desamparados: se trata de la Escuela Joaquín García Monge, una institución
            pública del Ministerio de Educación Pública que, desde hace décadas,
            forma a la niñez desamparadeña.
          </p>

          {/* Párrafo 2: transición narrativa hacia el trasfondo histórico y comunitario */}
          <p>
            Hoy, cuando se habla de la escuela, se piensa en aulas, recreos y actos
            cívicos. Pero detrás del edificio hay una larga historia de luchas
            comunitarias por la educación, decisiones políticas de diferentes
            gobiernos y la figura de un intelectual cuyo nombre terminó bautizando no
            solo a la escuela, sino también a la Casa de la Cultura del cantón y a
            una biblioteca pública.
          </p>
        </article>

        {/* 2. ¿Cuándo nació la Escuela Joaquín García Monge? */}
        <article className="sobre-bloque">
          {/* Bloque 2: aborda el tema de la fundación y discrepancias en fuentes */}
          <h3>2. ¿Cuándo nació la Escuela Joaquín García Monge?</h3>

          {/* Expone la dificultad de fijar una fecha única y destaca la continuidad histórica */}
          <p>
            La primera sorpresa al investigar la historia de la escuela es que no
            todas las fuentes concuerdan en la misma fecha de fundación. Unas hablan
            de las primeras décadas del siglo XX; otras recuerdan que, incluso antes,
            ya existía en el centro del cantón un edificio escolar mixto que daba
            servicio a la comunidad desamparadeña.
          </p>

          {/* Aporta hipótesis temporales y el marco de inversión estatal en educación */}
          <p>
            En algunos relatos se señala que la escuela funcionaba desde inicios del
            siglo XX y que el edificio actual se consolidó en la década de 1940, en
            un contexto de fuerte inversión estatal en educación. Lo que las
            versiones sí comparten es la idea de continuidad: más allá de la fecha
            exacta, la presencia de una escuela pública en el corazón de
            Desamparados tiene más de un siglo de historia.
          </p>

          {/* Conecta la continuidad institucional con la memoria colectiva de las familias */}
          <p>
            Esa continuidad educativa ha hecho que la Escuela Joaquín García Monge
            se convierta en un punto de referencia para el cantón. Generaciones
            enteras de estudiantes han pasado por sus aulas, y muchas familias
            recuerdan la institución como el lugar donde aprendieron a leer, donde
            participaron en los desfiles del 15 de setiembre o donde se realizó el
            acto cívico más importante de su infancia.
          </p>
        </article>

        {/* 3. De escuela a símbolo cantonal */}
        <article className="sobre-bloque">
          {/* Bloque 3: explica por qué la escuela es un referente identitario */}
          <h3>3. De escuela a símbolo cantonal</h3>

          {/* Enfatiza el valor cultural más allá de lo educativo */}
          <p>
            Más allá de las fechas, la Escuela Joaquín García Monge se convirtió en
            un referente identitario. Cientos de generaciones de niños y niñas han
            pasado por sus aulas, y la comunidad la reconoce como una institución
            icónica del cantón.
          </p>

          {/* Relación directa con el escudo del cantón: educación como pilar del desarrollo local */}
          <p>
            Esa importancia simbólica explica que el edificio haya sido escogido como
            uno de los elementos centrales del escudo de Desamparados, junto con
            otros íconos religiosos y geográficos. Incluir la imagen de la escuela en
            el escudo es una forma explícita de reconocer el papel de la educación en
            la historia local y de recordar que el desarrollo del cantón ha estado
            ligado, desde sus orígenes, a la existencia de una escuela pública
            fuerte.
          </p>

          {/* Conecta la institución con programas y enfoques actuales (lectura, comunidad, ODS 4) */}
          <p>
            En la actualidad, la escuela funciona como una institución pública de
            primaria adscrita al MEP y mantiene actividades vinculadas a proyectos de
            lectura, cultura y participación comunitaria. La biblioteca escolar, por
            ejemplo, se articula con programas nacionales para promover la lectura en
            casa, el acompañamiento a las familias y el cumplimiento del Objetivo de
            Desarrollo Sostenible 4: una educación de calidad para todas las
            personas.
          </p>
        </article>

        {/* 4. El hombre detrás del nombre */}
        <article className="sobre-bloque">
          {/* Bloque 4: biografía resumida y aportes principales de Joaquín García Monge */}
          <h3>4. El hombre detrás del nombre: Joaquín García Monge</h3>

          {/* Presentación del personaje: origen, roles, e importancia cultural */}
          <p>
            Para entender por qué una escuela, una casa de la cultura y otros
            espacios de Desamparados llevan el mismo nombre, hay que mirar a la vida
            de Joaquín García Monge. Nacido en Desamparados el 20 de enero de 1881,
            fue un escritor, educador, periodista y editor que llegó a ser
            considerado una de las figuras centrales de la cultura costarricense del
            siglo XX.
          </p>

          {/* Trayectoria temprana: formación + obra literaria (uso de <em> para énfasis) */}
          <p>
            De origen humilde, cursó la primaria en una pequeña escuela local y luego
            obtuvo el bachillerato en el Liceo de Costa Rica. Muy joven, a finales
            del siglo XIX, publicó su novela{" "}
            <em>El moto</em>, considerada una de las obras fundacionales de la
            narrativa costarricense por su retrato realista de la vida rural y de los
            conflictos sociales del país. A esta se sumó el libro de relatos{" "}
            <em>La mala sombra y otros sucesos</em>, que consolidó su lugar en la
            literatura nacional.
          </p>

          {/* Formación pedagógica y retorno al país: docencia y liderazgo educativo */}
          <p>
            En 1901 obtuvo una beca para estudiar pedagogía en el Instituto
            Pedagógico de la Universidad de Chile. De regreso en Costa Rica, trabajó
            como maestro y luego como profesor de secundaria; más tarde llegó a
            dirigir la Escuela Normal de Heredia, el principal centro formador de
            docentes de la época.
          </p>

          {/* Aportes institucionales y proyecto editorial continental (Repertorio Americano) */}
          <p>
            Entre 1920 y 1936 fue director de la Biblioteca Nacional, cargo desde el
            cual impulsó políticas de acceso al libro y fortaleció la infraestructura
            cultural del país. Sin embargo, su proyecto más influyente fue la revista{" "}
            <em>Repertorio Americano</em>, fundada en 1919 y publicada durante casi
            cuatro décadas. El Repertorio se convirtió en un foro continental de
            debate intelectual, con colaboraciones de figuras como Gabriela Mistral,
            José Carlos Mariátegui y otros pensadores latinoamericanos.
          </p>

          {/* Reconocimiento oficial del Estado costarricense */}
          <p>
            En 1958, el mismo año de su muerte, la Asamblea Legislativa lo declaró
            Benemérito de la Patria, reconocimiento reservado para quienes han hecho
            aportes extraordinarios a Costa Rica.
          </p>
        </article>

        {/* 5. ¿Por qué una escuela con su nombre? */}
        <article className="sobre-bloque">
          {/* Bloque 5: relación simbólica escuela-personaje y origen del homenaje */}
          <h3>5. ¿Por qué una escuela con su nombre?</h3>

          {/* Explica que el vínculo no es de fundación, sino de homenaje y pertenencia cantonal */}
          <p>
            La conexión entre el intelectual y la escuela no es solo geográfica:
            ambos están ligados a Desamparados, pero también se relacionan en el
            plano simbólico. La tradición histórica señala que el primer edificio
            escolar mixto del cantón fue rebautizado con el nombre de Joaquín García
            Monge en homenaje a este “ilustre hijo del cantón”.
          </p>

          {/* Cierra la idea: renombramiento + consolidación del edificio y del símbolo cantonal */}
          <p>
            En otras palabras, la escuela no fue fundada por García Monge, pero sí
            fue renombrada para honrar a un maestro que llevó las ideas de educación,
            cultura y democracia mucho más allá de las fronteras del barrio donde
            aprendió a leer. La posterior construcción del edificio actual en la
            década de 1940 y su consolidación como símbolo en el escudo cantonal
            terminaron de unir para siempre su figura con la vida cotidiana de la
            comunidad.
          </p>
        </article>

        {/* 6. Herencia viva */}
        <article className="sobre-bloque">
          {/* Bloque 6: lectura contemporánea de la escuela como espacio de ciudadanía */}
          <h3>6. Herencia viva: la escuela como laboratorio de ciudadanía</h3>

          {/* Explica la escuela como memoria viva: fotografías, actas, proyectos actuales */}
          <p>
            Hoy, la Escuela Joaquín García Monge es, al mismo tiempo, un centro
            educativo y un pequeño museo vivo. Sus paredes guardan fotografías
            antiguas, actas escolares y recuerdos de generaciones que han pasado por
            sus aulas. Los proyectos recientes de la escuela se alinean con la idea
            de educación inclusiva y de calidad, con énfasis en la lectura, la
            participación estudiantil y el vínculo con la comunidad.
          </p>

          {/* Relaciona el ideario de García Monge con la realidad social de la comunidad educativa */}
          <p>
            Si se mira la trayectoria de Joaquín García Monge —un maestro que defendió
            la educación pública, la lectura y el pensamiento crítico, y que usó una
            revista para conectar a América Latina— no resulta casual que su nombre
            esté asociado a un centro educativo donde se forman niños y niñas de
            diferentes contextos sociales, muchos de ellos hijos de trabajadores,
            personas migrantes y familias que ven en la escuela su principal puerta
            al futuro.
          </p>

          {/* Conclusión: escuela como materialización local de educación, cultura y ciudadanía */}
          <p>
            En ese sentido, la investigación sobre la escuela y sobre su homónimo
            permite una conclusión clara: la Escuela Joaquín García Monge no es solo
            un edificio histórico en el centro de Desamparados, sino la
            materialización local de un proyecto más amplio de cultura, educación y
            ciudadanía. Es un proyecto que empezó con la lucha de vecinos por tener
            una escuela, continuó con el trabajo de un maestro convertido en
            intelectual continental y hoy se sostiene en cada estudiante que entra
            por la puerta con el morral al hombro.
          </p>
        </article>
      </section>
    </div>
  );
};

export default SobreNosotros; // Exporta la página para usarla en el Router (ruta /sobre-nosotros)