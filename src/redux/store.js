import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';

const logger = createLogger();
const isProd = APP_ENV.isProduction;
const devMiddleware = [
  ...(APP_ENV.logger ? [logger] : [])
];
const prodMiddleware = [];
let clientStore;

function initStore() {
  console.log('Redux store was created!');
  // eslint-disable-next-line no-underscore-dangle
  let __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = __CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = isProd ? compose : __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [
    reduxThunk,
    ...(isProd ? prodMiddleware : devMiddleware),
  ];
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
}

export default function configureStore() {
  let store;
  if (__CLIENT__) {
    // reuse store on client
    if (!clientStore) {
      clientStore = initStore();
    }
    store = clientStore;

    if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
    }
  } else {
    // create new store on server
    store = initStore();
  }
  return store;
}