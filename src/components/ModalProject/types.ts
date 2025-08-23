export interface ModalProjectProps {
  isVisible: boolean;
  onClose: () => void;
  projectData: {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    deployUrl: string;
  };
}