import { CommonActions } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(name, params) {

  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    })
  );
  
}
// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};