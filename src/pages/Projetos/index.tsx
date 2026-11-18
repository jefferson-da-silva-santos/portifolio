import { useState, useMemo, useEffect } from "react";
import ProjectCard from "../../components/CardProjetos";
import { useProjectsData } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { containerStyles, titleStyles } from "./styles";
import objectTheme from "../../assets/theme.json";
import { useTranslation } from "react-i18next";
import { getFirstLetterTitle, getRestOfTitle } from "../../utils/textUtilites";
import CategoryFilterBar from "../../components/Category";
import { categoryTaxonomy, type CategoryKey } from "../../consts/categoryTaxonomy";
import Pager from "../../components/Pager";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";

const ITEMS_PER_PAGE = 6;

const searchSx = {
  width: 220,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "#2e2e2e" },
    "&:hover fieldset": { borderColor: "rgb(var(--ac-cyan))" },
    "&.Mui-focused fieldset": { borderColor: "rgb(var(--ac-cyan))" },
  },
  "& .MuiSvgIcon-root": { color: "#9ca3af" },
};

const searchSxLight = {
  ...searchSx,
  "& .MuiOutlinedInput-root": {
    color: "#111",
    "& fieldset": { borderColor: "#d9d9d9" },
    "&:hover fieldset": { borderColor: "rgb(var(--ac-dark))" },
    "&.Mui-focused fieldset": { borderColor: "rgb(var(--ac-dark))" },
  },
  "& .MuiSvgIcon-root": { color: "#6b7280" },
};

// Remove acentos e caixa pra busca não ser sensível a "café" vs "cafe".
const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const Projetos = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const projectsData = useProjectsData();

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Busca em tudo: título, descrição, stack, technologies, libs e infra.
  const searchedProjects = useMemo(() => {
    const term = normalize(searchTerm.trim());
    if (!term) return projectsData;
    return projectsData.filter((project) =>
      normalize(
        [
          project.title,
          project.description,
          project.stack,
          ...(project.technologies ?? []),
          ...(project.libs ?? []),
          ...(project.infra ?? []),
        ].join(" ")
      ).includes(term)
    );
  }, [searchTerm, projectsData]);

  // Quantos projetos cada categoria tem (já considerando a busca)
  const counts = useMemo(() => {
    const result: Partial<Record<CategoryKey, number>> = { todos: searchedProjects.length };
    categoryTaxonomy[0].items.forEach(({ key }) => {
      if (key !== "todos")
        result[key] = searchedProjects.filter((p) => (p.categories ?? []).includes(key)).length;
    });
    return result;
  }, [searchedProjects]);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "todos"
        ? searchedProjects
        : searchedProjects.filter((p) => (p.categories ?? []).includes(activeCategory)),
    [activeCategory, searchedProjects]
  );

  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));

  // Volta pra página 1 sempre que filtro OU busca mudam.
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [pageCount, currentPage]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

        {/* Busca + filtros por facetas, tudo na mesma linha */}
        <div className="groupProjetos-filterGroups">
          <TextField
            sx={theme === "light" ? searchSxLight : searchSx}
            size="small"
            variant="outlined"
            placeholder={t("project.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label={t("project.clearSearch")}
                      onClick={() => setSearchTerm("")}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
              },
            }}
          />

        </div>

        <CategoryFilterBar
          active={activeCategory}
          counts={counts}
          onChange={setActiveCategory}
          theme={theme}
        />

        {filteredProjects.length === 0 ? (
          <div className="groupProjetos-empty">
            <i className="bx bx-search-alt" aria-hidden="true" />
            <p>{t("project.emptyState")}</p>
          </div>
        ) : (
          <>
            <article className="groupProjetos-secundary">
              {paginatedProjects.map((project, index) => (
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
                  categories={project.categories}
                />
              ))}
            </article>

            {pageCount > 1 && (
              <div className="groupProjetos-pagination">
                <Pager count={pageCount} page={currentPage} onChange={handlePageChange} theme={theme} />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Projetos;