import { createContext } from "react";
import type { IProject } from "../provider/types";

export const ModalProjectContext = createContext({
  isModalOpen: false,
  openModal: (project: IProject) => {},
  closeModal: () => {},
  selectedProject: null as IProject | null,
})

