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
}


export interface ModalProjectProviderProps {
  children: React.ReactNode;
  setSelectedProject?: (project: IProject | null) => void;
}