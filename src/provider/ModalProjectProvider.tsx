import { useState } from "react";
import { ModalProjectContext } from "../contexts/ModalProjectContext";
import type { IProject, ModalProjectProviderProps } from "./types";


export const ModalProjectProvider = ({ children, setSelectedProject }: ModalProjectProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: IProject) => {
    setIsModalOpen(true)
    if (setSelectedProject) setSelectedProject(project);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (setSelectedProject) setSelectedProject(null);
  };

  return (
    <ModalProjectContext.Provider value={{ isModalOpen, openModal, closeModal, selectedProject: null }}>
      {children}
    </ModalProjectContext.Provider>
  );
}
