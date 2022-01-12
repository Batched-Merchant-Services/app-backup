import React, { NativeModules } from 'react-native'
const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;    
const sliceLanguage = deviceLanguage.slice(0,2);


const languageValue = {
  es: {
    apiLanguaje: 2,
    systemLanguage: 'es',
    phoneCode: '52'
  },
  en: {
    apiLanguaje: 3,
    systemLanguage: 'en',
    phoneCode: '1'
  }
}


export const getLanguage =() => {
  return languageValue[sliceLanguage].apiLanguaje;
}

export const getLanguageName =() => {
  return languageValue[sliceLanguage].systemLanguage;
}

