import { combineReducers } from 'redux';
import appReducer from 'src/screens/app/redux/reducer';
import homeReducer from 'src/screens/home/reducer';
import screenCoinReducer from 'src/screens/coin/reducer';
import langReducer from '../lang/reducer';

const reducers = {
  appReducer,
  homeReducer,
  langReducer,
  screenCoinReducer
};

export default combineReducers(reducers);
