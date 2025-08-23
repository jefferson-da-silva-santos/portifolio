import ProjectCard from "../../components/CardProjetos";
import { projectsData } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { containerStyles, titleStyles } from "./styles";
import objectTheme from '../../assets/theme.json';

const Projetos = () => {
  const { theme } = useTheme();
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
            &#8249; <span className="letraMonoton">P</span>rojects &#8260;
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
            />
          ))}
        </article>
      </section>
    </div>
  );
};

export default Projetos;