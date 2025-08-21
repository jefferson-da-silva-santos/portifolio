import type { ReactNode } from "react";

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