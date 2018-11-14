import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Mock func
 */
const checkAuth = () => true;

const PrivateRoute = ({ component: Component, routes, path, componentProps, ...rest }) => (
  <Route
    {...rest}
    path={path}
    render={props => (checkAuth() ? <Component {...props} {...componentProps} routes={routes} /> : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />))
    }
  />
);

export default PrivateRoute;
