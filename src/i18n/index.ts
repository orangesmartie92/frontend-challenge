import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './resources/en';

export const resources = {
  en,
} as const;

export const defaultNS = 'common';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  defaultNS,
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
