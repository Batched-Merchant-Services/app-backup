import i18next from 'i18next';
import en from './translations/en.json';
import es from './translations/es.json';
import i18nextReactNative from './localDetector';
import { AsyncStorage } from 'react-native';
import { NativeModules, Platform } from "react-native";


const i18n = i18next.createInstance();

i18n
  .use(i18nextReactNative)
  .init({
    debug        : true,
    fallbackLng  : 'en',
    ns           : ['translation'],
    resources    : { en: en, es: es },
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      wait: true,
    },
  });



export default i18n;