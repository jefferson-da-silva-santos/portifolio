// components/ProjectCard.tsx
import React from 'react';
import type { ProjectCardProps } from './types';
import useTheme from '../../hooks/useTheme';
import themeObject from '../../assets/theme.json';
import { buttomCardStyles, cardStyles, textCardStyles, titleCardStyles } from './styles';

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageClass,
  title,
  stack,
  buttonClass,
}) => {
  const {theme} = useTheme();

  return (
    <div className="card-item" style={cardStyles(theme, themeObject)}>
      <div className={`group-image-project ${imageClass}`}></div>
      <h3 className="title-project" style={titleCardStyles(theme, themeObject)}>{title}</h3>
      <p className="description-project" style={textCardStyles(theme, themeObject)}>{stack}</p>
      <a
        role="button"
        aria-label="Ver projeto"
        className={`btn-project ${buttonClass}`}
        style={buttomCardStyles(theme, themeObject)}
      >
        Ver projeto <i className="bi bi-box-arrow-up-right"></i>
      </a>
    </div>
  );
};

export default ProjectCard;