// components/ModalProject.tsx
import React from 'react';
import type { ModalProjectProps } from './types';
import useTheme from '../../hooks/useTheme';
import themeObject from '../../assets/theme.json';
import {
  containerModalStyles,
  sectionModalStyles,
  skillModalStyles,
  textModalStyles,
  titleModalStyles,
} from './styles';

// Assumindo que a interface para technologiesData está em '../../consts/dataConsts'
import { technologiesData } from '../../consts/dataConsts';

const ModalProject: React.FC<ModalProjectProps> = ({ isVisible, onClose, projectData }) => {
  const { theme } = useTheme();

  if (!isVisible || !projectData) {
    return null;
  }

  const { title, description, technologies, githubUrl, deployUrl } = projectData;

  const projectTechnologies: string[] = technologies || [];

  return (
    <aside
      className="group-project-options-box"
      role="dialog"
      aria-label="Ver projeto"
      style={containerModalStyles(theme, themeObject)}
    >
      <section className="project-options-box" style={sectionModalStyles(theme, themeObject)}>
        <article className="group-texts-options-box">
          <h1 style={titleModalStyles(theme, themeObject)} className="name-project-option">{title}</h1>
          <button
            className="close-options"
            onClick={onClose}
            aria-label="Fechar"
            aria-description="Fechar opções de visualização do projeto"
          >
            <i className='bx bx-x'></i>
          </button>
        </article>
        <p className="description-option-project" style={textModalStyles(theme, themeObject)}>{description}</p>
        <p className="text-tecnologias-options" style={textModalStyles(theme, themeObject)}>Tecnologias:</p>
        <ul className="list-options-box-tec">
          {projectTechnologies.map((techKey: string, index: number) => {
            const techInfo = technologiesData[techKey.toLowerCase()];

            if (!techInfo) {
              return null;
            }

            return (
              <li key={index} className={techInfo.className} style={skillModalStyles(theme, themeObject)}>
                <img src={techInfo.imageSrc} alt={`${techInfo.text} logo`} /> {techInfo.text}
              </li>
            );
          })}
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