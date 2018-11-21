import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';

const logger = createLogger();
const isProd = process.env.NODE_ENV === 'production';

export default function configureStore() {
  // eslint-disable-next-line no-underscore-dangle
  let __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = __CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = isProd ? compose : __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [
    reduxThunk,
    ...(isProd ? [] : [logger]),
  ];
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }
  return store;
}
