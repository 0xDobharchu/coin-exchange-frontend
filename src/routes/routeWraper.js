import React from 'react';
import { Route } from 'react-router-dom';
import ScreenContainer from 'src/components/screenContainer';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes({ component: Component, routes, path, noContainer, componentProps, ...rest }) {
  return (
    <Route
      {...rest}
      path={path}
      render={props => {
        const COM = <Component {...props} {...componentProps} routes={routes} />;
        // pass the sub-routes down to keep nesting
        if (noContainer) {
          return COM;
        }
        return <ScreenContainer>{COM}</ScreenContainer>;
      }}
    />
  );
}

export default RouteWithSubRoutes;
