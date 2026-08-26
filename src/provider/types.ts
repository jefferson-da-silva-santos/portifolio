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
  categories: CategoryKey[];
  // NOVO: link do vídeo do YouTube (opcional). Aceita qualquer formato:
  // watch?v=, youtu.be/, shorts/ ou embed/. Configurado direto no dataConsts.ts.
  videoUrl?: string;
}

export interface ModalProjectProviderProps {
  children: React.ReactNode;
  setSelectedProject?: (project: IProject | null) => void;
}