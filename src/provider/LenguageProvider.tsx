import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languageMap, listIconLenguage } from '../consts/dataConsts';
import { LanguageContext } from '../contexts/LenguageContext';
import type { LanguageProviderProps, LanguageType } from '../contexts/types';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const languages = Object.keys(languageMap) as LanguageType[];

  const getInitialLanguage = (): LanguageType => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLanguage = localStorage.getItem('appLanguage') as LanguageType;
      if (savedLanguage && languages.includes(savedLanguage)) {
        return savedLanguage;
      }
    }
    return (i18n.language as LanguageType) || 'pt';
  };

  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(getInitialLanguage);
  
  const [currentIcon, setCurrentIcon] = useState<string>(languageMap[currentLanguage as LanguageType]?.icon || listIconLenguage[0]);

  const toggleLanguage = () => {
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    setCurrentLanguage(nextLanguage);
  };
  
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('appLanguage', currentLanguage);
    }
    const icon = languageMap[currentLanguage as LanguageType]?.icon || listIconLenguage[0];
    setCurrentIcon(icon);
  }, [currentLanguage, i18n]); 

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, icon: currentIcon, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};