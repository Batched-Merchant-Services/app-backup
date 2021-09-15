import { applyMiddleware, createStore } from 'redux';
//import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer'

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

 const store = createStore(rootReducer,  applyMiddlewares(thunkMiddleware))
 export default store


// export default async function configureStore(rootReducer) {
//   // const REDUX_STORE_KEY = 'redux-state';
//   // const initialState = state ? JSON.parse(state) : {};

//   const store = createStore(
//     rootReducer,
//     applyMiddlewares(thunkMiddleware)
//   );
//   store.subscribe(
//     async () =>
//       await JSON.stringify(store)
//   );

//   return store
// }
