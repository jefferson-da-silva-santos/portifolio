
// src/consts/categoryTaxonomy.ts
//
// Fonte única de verdade da taxonomia de categorias da Linha do Tempo.
// Cada projeto (IProject.categories) referencia essas keys.
//
// mode:
//  - "single" -> comportamento de rádio (só 1 ativo por vez no grupo)
//  - "multi"  -> comportamento de checkbox (vários ativos, unidos por OR)

export type CategoryKey =
  | "todos"
  | "autorais"
  | "freelancer"
  | "pessoais"
  | "desafios-tecnicos"
  | "estudo"
  | "inicio-carreira";

export interface CategoryItem {
  key: CategoryKey;
  labelKey: string; // chave de tradução (i18next)
  icon: string; // classe boxicons
  color: string; // cor hex usada no pill (border/texto/glow)
}

export interface CategoryGroup {
  id: "categoria";
  labelKey: string;
  icon: string;
  mode: "single" | "multi";
  items: CategoryItem[];
}

export const categoryTaxonomy: CategoryGroup[] = [
  {
    id: "categoria",
    labelKey: "project.groups.categoria",
    icon: "bx bx-category",
    mode: "single",
    items: [
      { key: "todos", labelKey: "project.categories.todos", icon: "bx bx-grid-alt", color: "#9ca3af" },
      { key: "autorais", labelKey: "project.categories.autorais", icon: "bx bx-rocket", color: "#a06bff" },
      { key: "freelancer", labelKey: "project.categories.freelancer", icon: "bx bx-briefcase", color: "#ff009d" },
      { key: "pessoais", labelKey: "project.categories.pessoais", icon: "bx bx-user", color: "#00d4ff" },
      { key: "desafios-tecnicos", labelKey: "project.categories.desafiosTecnicos", icon: "bx bx-target-lock", color: "#ff9d00" },
      { key: "estudo", labelKey: "project.categories.estudo", icon: "bx bx-book-open", color: "#3dd598" },
      { key: "inicio-carreira", labelKey: "project.categories.inicioCarreira", icon: "bx bx-walk", color: "#00f7ff" },
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