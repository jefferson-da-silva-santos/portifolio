import { createContext } from "react";
import type { IProject } from "../provider/types";
import type { ModalProjectContextProps } from "./types";

export const ModalProjectContext = createContext<ModalProjectContextProps>({
  isModalOpen: false,
  openModal: (_: IProject) => {},
  closeModal: () => {},
  selectedProject: null,
})

