import { combineReducers } from 'redux';
import app from 'src/screens/app/redux/reducer';
import homeReducer from 'src/screens/home/reducer';
import screenCoinReducer from 'src/screens/coin/reducer';
import langReducer from '../lang/reducer';

const reducers = {
  app,
  homeReducer,
  langReducer,
  screenCoinReducer
};

export default combineReducers(reducers);
