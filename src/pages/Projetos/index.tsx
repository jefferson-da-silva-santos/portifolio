import ProjectCard from "../../components/CardProjetos";
import { useProjectsData } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { containerStyles, titleStyles } from "./styles";
import objectTheme from "../../assets/theme.json";
import { useTranslation } from "react-i18next";
import { getFirstLetterTitle, getRestOfTitle } from "../../utils/textUtilites";

const Projetos = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const projectsData = useProjectsData();
  
  return (
    <div
      className="groupProjetos"
      id="project"
      style={containerStyles(theme, objectTheme)}
    >
      <section className="projetos">
        <article className="groupProjetos-primary" data-aos="fade-right">
          <div className="select-linhas-projeto-title">
            <div className="linhas"></div>
            <div className="linhas"></div>
            <div className="linhas"></div>
          </div>
          <h2 className="titleProjetos" style={titleStyles(theme, objectTheme)}>
            &#8249;{" "}
            <span className="letraMonoton">
              {getFirstLetterTitle(t("project.title"))}
            </span>
            {getRestOfTitle(t("project.title"))} &#8260; &#8250;
          </h2>
        </article>
        <article className="groupProjetos-secundary">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              id={project.id}
              technologies={project.technologies}
              imgUrl={project.imgUrl}
              title={project.title}
              description={project.description}
              stack={project.stack}
              imageClass={project.imageClass}
              buttonClass={project.buttonClass}
              gitHubUrl={project.gitHubUrl}
              deployUrl={project.deployUrl}
            />
          ))}
        </article>
      </section>
    </div>
  );
};

export default Projetos;
