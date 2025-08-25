export interface IProject {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  stack: string;
  technologies: string[];
  imageClass: string;
  buttonClass: string;
  gitHubUrl: string;
  deployUrl?: string;
}
