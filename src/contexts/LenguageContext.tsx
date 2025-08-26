import { createContext } from 'react';
import { listIconLenguage } from '../consts/dataConsts';
import type { LanguageContextProps } from './types';

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'pt',
  icon: listIconLenguage[0],
  toggleLanguage: () => {},
});
