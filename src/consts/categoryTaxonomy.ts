
// src/consts/categoryTaxonomy.ts
//
// Fonte única de verdade da taxonomia de categorias da Linha do Tempo.
// Cada projeto (IProject.categories) referencia essas keys.
//
// mode:
//  - "single" -> comportamento de rádio (só 1 ativo por vez no grupo)
//  - "multi"  -> comportamento de checkbox (vários ativos, unidos por OR)

export type CategoryKey =
  // Curadoria
  | "todos"
  | "destaques"
  // Trajetória
  | "primeiros-passos"
  | "desafios-tecnicos"
  | "experiencia-profissional"
  | "freelancer"
  | "projetos-independentes"
  | "projetos-proposito"
  | "projetos-experimentais"
  | "em-desenvolvimento"
  // Plataforma
  | "frontend"
  | "backend"
  | "mobile"
  | "desktop"
  | "fullstack"
  | "landing-pages";

export interface CategoryItem {
  key: CategoryKey;
  labelKey: string; // chave de tradução (i18next)
  icon: string; // classe boxicons
  color: string; // cor hex usada no pill (border/texto/glow)
}

export interface CategoryGroup {
  id: "curadoria" | "trajetoria" | "plataforma";
  labelKey: string;
  icon: string;
  mode: "single" | "multi";
  items: CategoryItem[];
}

export const categoryTaxonomy: CategoryGroup[] = [
  {
    id: "curadoria",
    labelKey: "project.groups.curadoria",
    icon: "bx bxs-star",
    mode: "single",
    items: [
      {
        key: "todos",
        labelKey: "project.categories.todos",
        icon: "bx bx-grid-alt",
        color: "#9ca3af",
      },
      {
        key: "destaques",
        labelKey: "project.categories.destaques",
        icon: "bx bxs-star",
        color: "#ffd60a",
      },
    ],
  },
  {
    id: "trajetoria",
    labelKey: "project.groups.trajetoria",
    icon: "bx bx-time-five",
    mode: "multi",
    items: [
      {
        key: "primeiros-passos",
        labelKey: "project.categories.primeirosPassos",
        icon: "bx bx-walk",
        color: "#00f7ff",
      },
      {
        key: "desafios-tecnicos",
        labelKey: "project.categories.desafiosTecnicos",
        icon: "bx bx-target-lock",
        color: "#ff9d00",
      },
      {
        key: "experiencia-profissional",
        labelKey: "project.categories.experienciaProfissional",
        icon: "bx bx-briefcase",
        color: "#3dd598",
      },
      {
        key: "freelancer",
        labelKey: "project.categories.freelancer",
        icon: "bx bx-dollar-circle",
        color: "#ff009d",
      },
      {
        key: "projetos-independentes",
        labelKey: "project.categories.projetosIndependentes",
        icon: "bx bx-bulb",
        color: "#a06bff",
      },
      {
        key: "projetos-proposito",
        labelKey: "project.categories.projetosProposito",
        icon: "bx bx-heart",
        color: "#ff5d5d",
      },
      {
        key: "projetos-experimentais",
        labelKey: "project.categories.projetosExperimentais",
        icon: "bx bx-flask",
        color: "#00d4ff",
      },
      {
        key: "em-desenvolvimento",
        labelKey: "project.categories.emDesenvolvimento",
        icon: "bx bx-loader-circle",
        color: "#e2e2e2",
      },
    ],
  },
  {
    id: "plataforma",
    labelKey: "project.groups.plataforma",
    icon: "bx bx-layer",
    mode: "multi",
    items: [
      {
        key: "frontend",
        labelKey: "project.categories.frontend",
        icon: "bx bx-code-alt",
        color: "#61dafb",
      },
      {
        key: "backend",
        labelKey: "project.categories.backend",
        icon: "bx bx-server",
        color: "#339933",
      },
      {
        key: "mobile",
        labelKey: "project.categories.mobile",
        icon: "bx bx-mobile-alt",
        color: "#02569b",
      },
      {
        key: "desktop",
        labelKey: "project.categories.desktop",
        icon: "bx bx-desktop",
        color: "#f89820",
      },
      {
        key: "fullstack",
        labelKey: "project.categories.fullstack",
        icon: "bx bx-git-merge",
        color: "#00ffff",
      },
      {
        key: "landing-pages",
        labelKey: "project.categories.landingPages",
        icon: "bx bx-window-alt",
        color: "#3dd598",
      },
    ],
  },
];

// Helper de lookup rápido (usado pelo card/modal se precisar exibir badges)
export const CATEGORY_MAP: Record<CategoryKey, CategoryItem> =
  categoryTaxonomy.reduce((acc, group) => {
    group.items.forEach((item) => {
      acc[item.key] = item;
    });
    return acc;
  }, {} as Record<CategoryKey, CategoryItem>);