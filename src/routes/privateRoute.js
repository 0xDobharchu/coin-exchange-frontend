import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import currentUser from 'src/utils/authentication';
import ScreenContainer from 'src/components/screenContainer';
import { URL } from 'src/resources/constants/url';
/**
 * Mock func
 */
const checkAuth = () => {
  //keep for server site
  if(__CLIENT__){
    return currentUser.isLogin();
  } else {
    return true;
  }
};

const PrivateRoute = ({ component: Component, routes, path, noContainer, componentProps, ...rest }) => (
  <Route
    {...rest}
    path={path}
    render={props => {
      if (checkAuth()) {
        const COM = <Component {...props} {...componentProps} routes={routes} />;
        // pass the sub-routes down to keep nesting
        if (noContainer) {
          return COM;
        }
        return <ScreenContainer>{COM}</ScreenContainer>;
      }
      return (
        <Redirect
          to={{
            pathname: URL.USER_SIGN_IN,
            state: {from: props.location}
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;
