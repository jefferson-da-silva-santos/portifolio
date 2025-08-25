import type { IProject } from "../../provider/types";

export interface ModalProjectProps {
  isVisible: boolean;
  selectedProject: IProject | null;
}