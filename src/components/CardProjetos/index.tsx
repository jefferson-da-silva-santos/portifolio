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
import { useTranslation } from "react-i18next";

const ProjectCard: React.FC<IProject> = ({
  id,
  technologies,
  imgUrl,
  title,
  description,
  stack,
  imageClass,
  buttonClass,
  gitHubUrl,
  deployUrl
}) => {
  const { theme } = useTheme();
  const { openModal } = useModalProject();
  const [isHover, setIsHover] = useState(false);
  const [isImgHover, setIsImgHover] = useState(false);
  const { t } = useTranslation();

  const projectData = {
    id,
    imgUrl,
    title,
    description,
    stack,
    technologies,
    imageClass,
    buttonClass,
    gitHubUrl,
    deployUrl,
    project: {},
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="card-item"
      style={cardStyles(theme, themeObject)}
    >
      <div className={`group-image-project ${imageClass}`}>
        <img
          onMouseEnter={() => setIsImgHover(true)}
          onMouseLeave={() => setIsImgHover(false)}
          style={
            isImgHover
              ? { transform: "scale(110%)" }
              : { transform: "scale(1)" }
          }
          src={imgUrl}
          alt=""
        />
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
        aria-label={t("project.textButton")}
        className={`btn-project ${buttonClass}`}
        style={buttomCardStyles(theme, themeObject)}
        onClick={() => openModal(projectData)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setTimeout(() => setIsHover(false), 1000)}
      >
        <Shines isHover={isHover} />
        {t("project.textButton")} <i className="bi bi-box-arrow-up-right"></i>
      </a>
    </div>
  );
};

export default ProjectCard;
