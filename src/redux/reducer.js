import { combineReducers } from 'redux';
import homeReducer from 'src/screens/home/reducer';
import langReducer from '../lang/reducer';

const reducers = {
  homeReducer,
  langReducer
};

export default combineReducers(reducers);
