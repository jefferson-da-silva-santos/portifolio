import ProjectCard from "../../components/CardProjetos";
import { projectsData } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { containerStyles, titleStyles } from "./styles";
import objectTheme from '../../assets/theme.json';
import { useTranslation } from "react-i18next";

interface IProjetos {
  handleOpenModal: () => void
}

const Projetos = ({handleOpenModal}: IProjetos) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const firstLetterTitle = t("project.title").charAt(0).toUpperCase();
  const restOfTitle = t("project.title").slice(1);
  return (
    <div className="groupProjetos" id="project" style={containerStyles(theme, objectTheme)}>
      <section className="projetos">
        <article className="groupProjetos-primary">
          <div className="select-linhas-projeto-title">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
          </div>
          <h2 className="titleProjetos" style={titleStyles(theme, objectTheme)}>
            &#8249; <span className="letraMonoton">{firstLetterTitle}</span>{restOfTitle} &#8260;
            &#8250;
          </h2>
        </article>
        <article className="groupProjetos-secundary">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index} // Use uma chave única para a lista
              title={project.title}
              stack={project.stack}
              imageClass={project.imageClass}
              buttonClass={project.buttonClass}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </article>
      </section>
    </div>
  );
};

export default Projetos;