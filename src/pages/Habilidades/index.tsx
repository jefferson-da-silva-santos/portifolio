import React, { useEffect, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import themeObject from '../../assets/theme.json';

const Habilidades = () => {
  const { theme } = useTheme();
  const [textSkill, setTextSkill] = useState<string>('*  Passe o mouse sobre as habilidades para saber mais*');

  const styleCardSkill = {
    backgroundColor: theme === "light" ? themeObject.themes.light.skills.container.background : themeObject.themes.dark.skills.container.background
  }

  return (
    <div className="groupSkills" id="skills" style={
      theme === "light" ? {
        backgroundColor: themeObject.themes.light.skills.container.background
      } : {
        backgroundColor: themeObject.themes.dark.skills.container.background
      }
    }>
      <section className="skills">
        <article className="groupSkills-primary hidden-scroll-left">
          <div className="dividir-titulo-linha">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
            <h2 className="titleSkills" style={
              theme === "light" ? {
                color: themeObject.themes.light.skills.container.colorTitle
              } : {
                color: themeObject.themes.dark.skills.container.colorTitle
              }
            }>
              &#8249; <span className="letraMonoton">S</span>kills &#8260;
              &#8250;
            </h2>
          </div>
          <p className="textSkills" id="description-skills">
           {textSkill}
          </p>
        </article>
        <article className="groupSkills-secundary hidden-scroll-left">
          <article className={`skill-element nodejs ${theme === "light" ? "skill-element-border-light" : "skill-element-border-dark"}`} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_node.webp"
              alt="Logo do Node.js"
            />
          </article>
          <article className={"skill-element express"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_express.webp"
              alt="Logo do Express"
            />
          </article>
          <article className={"skill-element nestjs"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_nest.webp"
              alt="Logo do NestJS"
            />
          </article>
          <article className={"skill-element react"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_react.webp"
              alt="Logo do React"
            />
          </article>
          <article className={"skill-element nextjs"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_next.webp"
              alt="Logo do Next.js"
            />
          </article>
          <article className={"skill-element sass"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_sass.webp"
              alt="Logo do Sass"
            />
          </article>
          <article className={"skill-element flutter"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_flutter.webp"
              alt="Logo do Flutter"
            />
          </article>
          <article className={"skill-element java"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_java.webp"
              alt="Logo do Java"
            />
          </article>
          <article className={"skill-element postgresql"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_postgres.webp"
              alt="Logo do PostgreSQL"
            />
          </article>
          <article className={"skill-element mysql"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_mysql.webp"
              alt="Logo do MySQL"
            />
          </article>
          <article className={"skill-element git"} style={styleCardSkill}>
            <img
              loading="lazy"
              src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_git.webp"
              alt="Logo do Git"
            />
          </article>
          <article className={"skill-element docker"} style={styleCardSkill}>
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