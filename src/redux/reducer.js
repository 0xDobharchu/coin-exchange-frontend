import { combineReducers } from 'redux';
import homeReducer from 'src/screens/home/reducer';
import screenCoinReducer from 'src/screens/coin/reducer';
import langReducer from '../lang/reducer';

const reducers = {
  homeReducer,
  langReducer,
  screenCoinReducer
};

export default combineReducers(reducers);
