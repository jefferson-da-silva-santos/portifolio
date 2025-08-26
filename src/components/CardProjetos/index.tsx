import useTheme from "../../hooks/useTheme";
import themeObject from "../../assets/theme.json";
import {
  buttomCardStyles,
  cardStyles,
  textCardStyles,
  titleCardStyles,
} from "./styles";
import useModalProject from "../../hooks/useModalProject";
import type { IProject } from "../../provider/types";
import { Shines } from "../Shines";
import { useState } from "react";

const ProjectCard: React.FC<IProject> = ({
  imageClass,
  title,
  description,
  stack,
  buttonClass,
  id,
  imgUrl,
  technologies,
}) => {
  const { theme } = useTheme();
  const { openModal } = useModalProject();
  const [isHover, setIsHover] = useState(false);


  const projectData = {
    id,
    imgUrl,
    title,
    description,
    stack,
    technologies,
    imageClass,
    buttonClass,
    gitHubUrl: "",
    deployUrl: "",
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="card-item"
      style={cardStyles(theme, themeObject)}
    >
      <div className={`group-image-project ${imageClass}`}>
        <img src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/NovoPortifolio/cardapio.png" alt="" />
      </div>
      <h3 className="title-project" style={titleCardStyles(theme, themeObject)}>
        {title}
      </h3>
      <p
        className="description-project"
        style={textCardStyles(theme, themeObject)}
      >
        {stack}
      </p>
      <a
        role="button"
        aria-label="Ver projeto"
        className={`btn-project ${buttonClass}`}
        style={buttomCardStyles(theme, themeObject)}
        onClick={() => openModal(projectData)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setTimeout(() => setIsHover(false), 1000)}
      >
        <Shines isHover={isHover} />
        Ver projeto <i className="bi bi-box-arrow-up-right"></i>
      </a>
    </div>
  );
};

export default ProjectCard;
