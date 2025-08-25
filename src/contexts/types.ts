import type { ReactNode } from "react";
import type { IProject } from "../provider/types";

export type LanguageType = 'pt' | 'en' | 'es' | 'it' | 'fr';

export interface LanguageMap {
  [key: string]: { icon: string; locale: string };
}

export interface LanguageContextProps {
  language: LanguageType;
  icon: string;
  toggleLanguage: () => void;
}

export interface LanguageProviderProps {
  children: ReactNode;
}

export interface MenuContextProps {
  isMenuMobileVisible: boolean;
  toggleMenuVisibility: () => void;
  classMenuList: string;
  iconMenu: string;
}

export interface ModalProjectContextProps {
  isModalOpen: boolean;
  openModal: (project: IProject) => void; 
  closeModal: () => void;
  selectedProject: IProject | null;
}