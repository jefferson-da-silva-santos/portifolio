import svgTailwind from '../../assets/image/tailwind-css-svgrepo-com.svg';

const Habilidades = () => {
  return (
    <div className="groupSkills" id="skills">
      <section className="skills">
        <article className="groupSkills-primary hidden-scroll-left">
          <div className="dividir-titulo-linha">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
            <h2 className="titleSkills">
              &#8249; <span className="letraMonoton">S</span>kills &#8260;
              &#8250;
            </h2>
          </div>
          <p className="textSkills" id="description-skills"></p>
        </article>
        <article className="groupSkills-secundary hidden-scroll-left">
          <article className="skill-element html">
            <img loading="lazy" src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/html-5.webp" alt="logo do HTML5" />
          </article>
          <article className="skill-element css">
            <img loading="lazy" src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/css-3.webp" alt="logo do CSS3" />
          </article>
          <article className="skill-element javascript">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/logotipo-do-java-script.webp"
              alt="logo do JavaScript"
            />
          </article>
          <article className="skill-element nodejs">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/nodejs.webp"
              alt="logo do NodeJs"
            />
          </article>
          <article className="skill-element react">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/biblioteca.webp"
              alt="logo do ReactJs"
            />
          </article>
          <article className="skill-element bootstrap">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/bootstrap.webp"
              alt="logo do Bootstrap"
            />
          </article>
          <article className="skill-element taiwind">
            <img
              loading="lazy"
              src={svgTailwind}
              alt="logo do Taiwind"
            />
          </article>
          <article className="skill-element sql">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/servidor-sql.webp"
              alt="logo da linguagem de consulta SQL"
            />
          </article>
          <article className="skill-element mysql">
            <img loading="lazy" src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/mysql.webp" alt="logo do MySQL" />
          </article>
          <article className="skill-element postgre">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/postgre.webp"
              alt="logo do PostgreSQL"
            />
          </article>
          <article className="skill-element java">
            <img loading="lazy" src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/java.webp" alt="logo do Java" />
          </article>
          <article className="skill-element git">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/confirmar-git.webp"
              alt="logo do controlador de versões Git"
            />
          </article>
        </article>
      </section>
    </div>
  );
};

export default Habilidades;
