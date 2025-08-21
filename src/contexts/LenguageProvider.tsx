// src/contexts/LanguageContext.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languageMap, listIconLenguage } from '../consts/dataConsts';
import type { LanguageProviderProps, LanguageType } from './types';
import { LanguageContext } from './LenguageContext';


export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const languages = Object.keys(languageMap) as LanguageType[];

  // 1. Leia o valor do localStorage na inicialização
  const getInitialLanguage = (): LanguageType => {
    // Verifique se o código está sendo executado no navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLanguage = localStorage.getItem('appLanguage') as LanguageType;
      // Use o idioma salvo se for válido, caso contrário, use o padrão do i18n
      if (savedLanguage && languages.includes(savedLanguage)) {
        return savedLanguage;
      }
    }
    // Retorne o idioma do i18n ou o padrão 'pt' como fallback
    return (i18n.language as LanguageType) || 'pt';
  };

  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(getInitialLanguage);
  
  // O useEffect abaixo garantirá que o i18n seja atualizado com o valor inicial
  
  const [currentIcon, setCurrentIcon] = useState<string>(languageMap[currentLanguage as LanguageType]?.icon || listIconLenguage[0]);

  const toggleLanguage = () => {
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    setCurrentLanguage(nextLanguage);
  };
  
  // 2. Use um useEffect para sincronizar o estado com o i18n e o localStorage
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('appLanguage', currentLanguage);
    }
    const icon = languageMap[currentLanguage as LanguageType]?.icon || listIconLenguage[0];
    setCurrentIcon(icon);
  }, [currentLanguage, i18n]); // Dependência em i18n é importante para casos de SSR

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, icon: currentIcon, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};