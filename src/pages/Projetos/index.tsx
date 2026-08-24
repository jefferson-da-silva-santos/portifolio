import { useState, useMemo, useEffect } from "react";
import ProjectCard from "../../components/CardProjetos";
import { useProjectsData } from "../../consts/dataConsts";
import useTheme from "../../hooks/useTheme";
import { containerStyles, titleStyles } from "./styles";
import objectTheme from "../../assets/theme.json";
import { useTranslation } from "react-i18next";
import { getFirstLetterTitle, getRestOfTitle } from "../../utils/textUtilites";
import CategoryFilterBar, { type ActiveFilters } from "../../components/Category";
import { categoryTaxonomy, type CategoryGroup, type CategoryKey } from "../../consts/categoryTaxonomy";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";

const ITEMS_PER_PAGE = 6;

const paginationSx = {
  "& .MuiPaginationItem-root": {
    color: "#9ca3af",
    borderColor: "#2e2e2e",
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "rgba(0, 255, 255, 0.08)",
    color: "#00ffff",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "rgba(0, 255, 255, 0.15)",
    color: "#00ffff",
    borderColor: "#00ffff",
  },
  "& .MuiPaginationItem-root.Mui-selected:hover": {
    backgroundColor: "rgba(0, 255, 255, 0.25)",
  },
};

const searchSx = {
  width: 220,
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "#2e2e2e" },
    "&:hover fieldset": { borderColor: "#00ffff" },
    "&.Mui-focused fieldset": { borderColor: "#00ffff" },
  },
  "& .MuiSvgIcon-root": { color: "#9ca3af" },
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

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleGroupChange = (groupId: CategoryGroup["id"], values: CategoryKey[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [groupId]: new Set(values),
    }));
  };

  // Filtro por categoria (facetas) + busca textual combinados com AND:
  // o projeto precisa bater com os filtros de categoria E conter o termo buscado.
  const filteredProjects = useMemo(() => {
    const term = normalize(searchTerm.trim());

    return projectsData.filter((project) => {
      const projectCategories = project.categories ?? [];

      const matchesCategory = categoryTaxonomy.every((group) => {
        const selected = activeFilters[group.id];
        if (!selected || selected.size === 0) return true;
        return Array.from(selected).some((key) => projectCategories.includes(key));
      });

      if (!matchesCategory) return false;
      if (!term) return true;

      // Busca em tudo: título, descrição, stack, technologies, libs e infra.
      const searchableText = normalize(
        [
          project.title,
          project.description,
          project.stack,
          ...(project.technologies ?? []),
          ...(project.libs ?? []),
          ...(project.infra ?? []),
        ].join(" ")
      );

      return searchableText.includes(term);
    });
  }, [activeFilters, searchTerm, projectsData]);

  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));

  // Volta pra página 1 sempre que filtro OU busca mudam.
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchTerm]);

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [pageCount, currentPage]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
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
            sx={searchSx}
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

          <CategoryFilterBar activeFilters={activeFilters} onChange={handleGroupChange} />
        </div>

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
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={paginationSx}
                  shape="rounded"
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Projetos;