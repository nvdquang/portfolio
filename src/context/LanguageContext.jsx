import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { getStoredPortfolioData, savePortfolioDataToStorage } from '../data/portfolioData';

const LanguageContext = createContext();

const LANG_STORAGE_KEY = 'nvdquang_portfolio_lang';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
      if (savedLang === 'vi' || savedLang === 'en') {
        return savedLang;
      }
    } catch (e) {
      console.error("Failed to load language setting from localStorage", e);
    }
    return 'vi';
  });

  const [portfolioData, setPortfolioData] = useState(() => getStoredPortfolioData());

  const setLanguage = (lang) => {
    if (lang === 'vi' || lang === 'en') {
      setLanguageState(lang);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
      } catch (e) {
        console.error("Failed to save language setting to localStorage", e);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
    savePortfolioDataToStorage(newData);
  };

  const t = (key) => {
    const langDict = translations[language] || translations.vi;
    if (langDict[key] !== undefined) {
      return langDict[key];
    }
    return translations.vi[key] || key;
  };

  const getLocalized = (obj, fieldName) => {
    if (!obj || typeof obj !== 'object') return '';
    if (language === 'en') {
      const enValue = obj[`${fieldName}En`] || obj[`${fieldName}_en`] || (obj.en && obj.en[fieldName]);
      if (enValue !== undefined && enValue !== null && enValue !== '') {
        return enValue;
      }
    }
    return obj[fieldName] !== undefined ? obj[fieldName] : '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getLocalized,
        portfolioData,
        updatePortfolioData
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
