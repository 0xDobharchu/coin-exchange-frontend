import React from 'react';
import { Route } from 'react-router-dom';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes({ component: Component, routes, path, ...rest }) {
  return (
    <Route
      {...rest}
      path={path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <Component {...props} routes={routes} />
      )}
    />
  );
}

export default RouteWithSubRoutes;
