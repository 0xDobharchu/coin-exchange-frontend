import { combineReducers } from 'redux';
import app from 'src/screens/app/redux/reducer';
import auth from 'src/screens/auth/redux/reducer';
import reviewListReducer from 'src/components/reviewList/reducer';
import landingReducer from 'src/screens/landingpage/redux/reducer';
import screenCoinReducer from 'src/screens/coin/reducer';
import loginReducer from 'src/screens/login/reducer';
import langReducer from '../lang/reducer';

// eslint-disable-next-line
import { reducer as form } from 'redux-form';

const reducers = {
  app,
  auth,
  langReducer,
  reviewListReducer,
  landingReducer,
  screenCoinReducer,
  loginReducer,
  form,
};

export default combineReducers(reducers);
