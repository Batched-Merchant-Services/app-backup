
import React, { NativeModules,Platform } from 'react-native'
import { AsyncStorage } from 'react-native';

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;    
const sliceLanguage = deviceLanguage.slice(0,2);

export default {
  init  : Function.prototype,
  type  : 'languageDetector',
  async : true, // flags below detection to be async
  detect: (callback) => { 
    AsyncStorage.getItem('lang').then((value) => {
      const lng = (value) ? value: null;
      const selectLanguage = lng || sliceLanguage;
      callback(selectLanguage);
    }).then(res => {
      //do something else
    });  
  },
  cacheUserLanguage: function(lng) {
    AsyncStorage.setItem('lang', lng);
    //return  lng;
  }
};

