import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fr, en } from './locales';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true, // Aide à identifier les problèmes de traduction
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fr: fr,
      en: en,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;