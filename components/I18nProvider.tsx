'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/src/locales/en.json';
import ua from '@/src/locales/ua.json';
import es from '@/src/locales/es.json';
import pt from '@/src/locales/pt.json';
import de from '@/src/locales/de.json';
import fr from '@/src/locales/fr.json';
import pl from '@/src/locales/pl.json';
import ja from '@/src/locales/ja.json';
import ar from '@/src/locales/ar.json';
import tr from '@/src/locales/tr.json';
import hi from '@/src/locales/hi.json';
import it from '@/src/locales/it.json';
import ko from '@/src/locales/ko.json';
import id from '@/src/locales/id.json';

const translations: Record<string, any> = { en, ua, es, pt, de, fr, pl, ja, ar, tr, hi, it, ko, id };

type I18nContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (path: string) => path,
});

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('app_lang');
    if (storedLang && translations[storedLang]) {
      setLangState(storedLang);
    }
  }, []);

  const setLang = (newLang: string) => {
    if (translations[newLang]) {
      setLangState(newLang);
      localStorage.setItem('app_lang', newLang);
    }
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return path; // Fallback to path if not found
      }
    }
    return typeof result === 'string' ? result : path;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
