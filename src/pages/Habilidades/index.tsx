import React from 'react';
import useTheme from '../../hooks/useTheme';
import themeObject from '../../assets/theme.json';

const Habilidades = () => {
  const { theme } = useTheme();
  
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
          <p className="textSkills" id="description-skills">
            * Passe o mouse sobre as habilidades para saber mais * 
          </p>
        </article>
        <article className="groupSkills-secundary hidden-scroll-left">
          <article className="skill-element nodejs">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_node.webp"
              alt="Logo do Node.js"
            />
          </article>
          <article className="skill-element express">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_express.webp"
              alt="Logo do Express"
            />
          </article>
          <article className="skill-element nestjs">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_nest.webp"
              alt="Logo do NestJS"
            />
          </article>
          <article className="skill-element react">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_react.webp"
              alt="Logo do React"
            />
          </article>
          <article className="skill-element nextjs">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_next.webp"
              alt="Logo do Next.js"
            />
          </article>
          <article className="skill-element sass">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_sass.webp"
              alt="Logo do Sass"
            />
          </article>
          <article className="skill-element flutter">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_flutter.webp"
              alt="Logo do Flutter"
            />
          </article>
          <article className="skill-element java">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_java.webp"
              alt="Logo do Java"
            />
          </article>
          <article className="skill-element postgresql">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_postgres.webp"
              alt="Logo do PostgreSQL"
            />
          </article>
          <article className="skill-element mysql">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_mysql.webp"
              alt="Logo do MySQL"
            />
          </article>
          <article className="skill-element git">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_git.webp"
              alt="Logo do Git"
            />
          </article>
          <article className="skill-element docker">
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_docker.webp"
              alt="Logo do Docker"
            />
          </article>
        </article>
      </section>
    </div>
  );
};

export default Habilidades;