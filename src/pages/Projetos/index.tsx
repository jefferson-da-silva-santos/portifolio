import { useState, useMemo } from "react";
import ProjectCard from "../../components/CardProjetos";
import { categoryProjects, useProjectsData } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { containerStyles, titleStyles } from "./styles";
import objectTheme from "../../assets/theme.json";
import { useTranslation } from "react-i18next";
import { getFirstLetterTitle, getRestOfTitle } from "../../utils/textUtilites";
import Category from "../../components/Category";

const Projetos = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const projectsData = useProjectsData();

  // 1. Estado para controlar o filtro ativo
  const [activeCategory, setActiveCategory] = useState("all");

  // 2. Lógica de Filtragem
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projectsData;

    return projectsData.filter((project) => {
      // Normaliza os textos para comparação (remove espaços e deixa tudo minúsculo)
      const projectStack = project.category?.toLowerCase().trim();
      const targetCategory = activeCategory.toLowerCase().trim();

      return projectStack === targetCategory;
    });
  }, [activeCategory, projectsData]);
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

        {/* Listagem de Categorias */}
        <div className="groupProjetos-categorys">
          <Category
            category="Todos"
            isActive={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {categoryProjects.map((category, index) => (
            <Category
              key={index}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        {/* Listagem de Projetos Filtrados */}
        <article className="groupProjetos-secundary">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              id={project.id}
              technologies={project.technologies}
              libs={project.libs}
              infra={project.infra}
              imgUrl={project.imgUrl}
              title={project.title}
              description={project.description}
              stack={project.stack}
              imageClass={project.imageClass}
              buttonClass={project.buttonClass}
              gitHubUrl={project.gitHubUrl}
              deployUrl={project.deployUrl}
              isApi={project.isApi}
            />
          ))}
        </article>
      </section>
    </div>
  );
};

export default Projetos;