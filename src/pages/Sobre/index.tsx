const Sobre = () => {
  return (
    <div className="groupSobre" id="about">
      <section className="sobre">
        <article className="groupSobre-primary hidden-scroll-right">
          <div className="dividir-titulo-linha">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
            <h2 className="titleSobre">
              &#8249; <span className="letraMonoton">A</span>bout &#8260;
              &#8250;
            </h2>
          </div>
          <p className="textSobre">
            My name is <strong>Jefferson Santos</strong> and I am a technology
            enthusiast who decided to pursue a career in programming. Over the
            last <strong>four years</strong>, I have dedicated myself to
            understanding the main technologies on the market and applying
            <strong>agile development methodologies</strong> (I&#8217;m a coffee
            lover).
          </p>
          <p className="textSobre">
            I completed a technical course in
            <strong>Systems Development (DS)</strong> with a focus on
            <strong>Full Stack development</strong>. Since then, I have worked
            on projects as a freelancer and contributed to open source projects,
            continually improving my skills and experience in the field.
          </p>
        </article>
        <article className="groupSobre-secundary hidden-scroll-right">
          <div className="circle"></div>
          <img
            loading="lazy"
            className="minha-img"
            src="src/img/cafe_semfundo.webp"
            alt="xicara de café flutuante"
          />
        </article>
      </section>
    </div>
  );
};

export default Sobre;
