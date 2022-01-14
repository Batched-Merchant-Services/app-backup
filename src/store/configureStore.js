import { applyMiddleware, createStore,compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer'
import localStorage from '@utils/localStorage';
import to from 'await-to-js';
import Colors from '@styles/Colors';
import { AsyncStorage } from 'react-native';
/**
 * Take all the middlewares and apply them,
 * if is in develop mode it adds the devtools middleware
 *
 * @param  {...Function} middlewares Redux middleares
 */
function applyMiddlewares(...middlewares) {
  const appliedMiddlewares = applyMiddleware(...middlewares);
  // If is develop mode apply devtools middleware
  return composeWithDevTools(appliedMiddlewares);
}

/**
 * Creates and returns the redux store, using the given root reducer
 * @param {Function} rootReducer Redux root reducer
 */



 const configureStore = async() => {

  const REDUX_STORE_KEY = 'redux-state';

  const [error, state] = await to(localStorage.get(REDUX_STORE_KEY));
  const initialState = state ? JSON.parse(state) : {};

  error && console.log('Error loading redux state', error);

 
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
       rootReducer, 
       initialState, 
       composeEnhancers(
        applyMiddlewares(thunkMiddleware, promiseMiddleware)
      )
       //applyMiddlewares(thunkMiddleware, promiseMiddleware)
      )
    
      store.subscribe(
        async () =>{
          await to(
            localStorage.set(REDUX_STORE_KEY, JSON.stringify(store.getState()))
          )}
      );
      

  return store;
  }

 export default configureStore;
