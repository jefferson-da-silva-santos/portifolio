import type { CategoryKey } from "../consts/categoryTaxonomy";

export interface IProject {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  stack: string;
  technologies: string[];
  libs: string[];
  infra: string[];
  imageClass: string;
  buttonClass: string;
  gitHubUrl: string;
  deployUrl: string;
  isApi: boolean;
  // NOVO: substitui o antigo `category: string` único.
  // Um projeto agora pode pertencer a várias categorias ao mesmo tempo
  // (ex: um desafio técnico que também é destaque e é frontend).
  categories: CategoryKey[];
}

export interface ModalProjectProviderProps {
  children: React.ReactNode;
  setSelectedProject?: (project: IProject | null) => void;
}