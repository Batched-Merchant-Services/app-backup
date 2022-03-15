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
function push(name, params) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 2,
      routes: [
        { name: 'Login' },
        {
          name: 'Login',
          params: { user: 'jane' },
        },
      ],
    })
  );
  
}

// add other navigation functions that you need and export them

export default {
  navigate,
  push,
  setTopLevelNavigator,
};