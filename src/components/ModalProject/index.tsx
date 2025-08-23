// components/ModalProject.tsx
import React from 'react';
import type { ModalProjectProps } from './types';

const ModalProject: React.FC<ModalProjectProps> = ({ isVisible, onClose, projectData }) => {
  if (!isVisible) {
    return null;
  }

  const { title, description, technologies, githubUrl, deployUrl } = projectData;

  return (
    <aside
      className="group-project-options-box"
      role="dialog"
      aria-label="Ver projeto"
    >
      <section className="project-options-box">
        <article className="group-texts-options-box">
          <h1 className="name-project-option">{title}</h1>
          <button
            className="close-options"
            onClick={onClose}
            aria-label="Fechar"
            aria-description="Fechar opções de visualização do projeto"
          >
            <i className='bx bx-x'></i>
          </button>
        </article>
        <p className="description-option-project">{description}</p>
        <p className="text-tecnologias-options">Tecnologias:</p>
        <ul className="list-options-box-tec">
          {/* {technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))} */}
          <li className='react-item-list'>
            <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="" /> React
          </li>

           <li className='sass-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_sass.webp" alt="" /> SASS
          </li>

          <li className='java-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_java.webp" alt="" /> Java
          </li>

           <li className='nest-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_nest.webp" alt="" /> NestJs
          </li>

           <li className='next-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_next.webp" alt="" /> NextJs
          </li>
           <li className='express-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_express.webp" alt="" /> Express
          </li>
           <li className='mysql-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_mysql.webp" alt="" /> MySQL
          </li>
           <li className='postgres-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_postgres.webp" alt="" /> PostgreSQL
          </li>
           <li className='git-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_git.webp" alt="" /> GIT/GitHub
          </li>
           <li className='docker-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_docker.webp" alt="" /> Docker
          </li>
           <li className='flutter-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_flutter.webp" alt="" /> Flutter
          </li>
           <li className='node-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_node.webp" alt="" /> NodeJs
          </li>
           <li className='vite-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_vite.webp" alt="" /> Vite
          </li>
           <li className='css-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_css.webp" alt="" /> CSS
          </li>
           <li className='js-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_js.webp" alt="" /> JavaScript
          </li>
           <li className='ts-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_ts.webp" alt="" /> TypesScript
          </li>
           <li className='html-item-list'>
            <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/skill_html.webp" alt="" /> HTML
          </li>

        </ul>
        <p className="text-see-in-options">Veja em:</p>
        <article className="groupBtn-options-box">
          <a
            className="btn-options-git"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="Ver projeto no github"
          >
            <i className='bx bxl-github'></i> GitHub
          </a>
          <a
            className="btn-options-deploy"
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label="Ver o site"
          >
            <i className='bx bx-link-external'></i> Visitar
          </a>
        </article>
      </section>
    </aside>
  );
};

export default ModalProject;