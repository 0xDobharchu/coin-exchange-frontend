import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
const logger = createLogger();

export default function configureStore(preloadedState) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, reduxThunk)));
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer))
  }
  return store;
}
