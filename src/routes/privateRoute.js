import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import currentUser from 'src/utils/authentication';

/**
 * Mock func
 */
const checkAuth = () => {
  return currentUser.isLogin();
};

const PrivateRoute = ({ component: Component, routes, path, componentProps, ...rest }) => (
  <Route
    {...rest}
    path={path}
    render={props => (checkAuth() ? <Component {...props} {...componentProps} routes={routes} /> : (
      <Redirect
        to={{
          pathname: '/login',
          state: {from: props.location}
        }}
      />))
      }
  />
);

export default PrivateRoute;
