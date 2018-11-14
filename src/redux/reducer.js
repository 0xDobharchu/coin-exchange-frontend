import { combineReducers } from 'redux';
import app from 'src/screens/app/redux/reducer';
import auth from 'src/screens/auth/redux/reducer';
import homeReducer from 'src/screens/home/reducer';
import screenCoinReducer from 'src/screens/coin/reducer';
import langReducer from '../lang/reducer';
// eslint-disable-next-line
import { reducer as form } from 'redux-form';

const reducers = {
  app,
  auth,
  homeReducer,
  langReducer,
  screenCoinReducer,
  form
};

export default combineReducers(reducers);
