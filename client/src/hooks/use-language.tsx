import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, TranslationKey, translations } from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Pobierz język z localStorage lub ustaw domyślny
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const savedLanguage = localStorage.getItem('aurum-language');
    return (savedLanguage as LanguageCode) || 'pl';
  });

  // Funkcja do zmiany języka
  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('aurum-language', lang);
  };

  // Funkcja do tłumaczenia tekstów
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  // Zapisz język do localStorage przy zmianie
  useEffect(() => {
    localStorage.setItem('aurum-language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};