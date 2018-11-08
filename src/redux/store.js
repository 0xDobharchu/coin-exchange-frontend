import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
const logger = createLogger();
const isProd = process.env.NODE_ENV === 'production';

export default function configureStore(preloadedState) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = isProd ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [
    ...(isProd ? [] : [logger]),
    reduxThunk
  ];
  let store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer))
  }
  return store;
}
