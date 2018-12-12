import React from 'react';
import { Route } from 'react-router-dom';
import ScreenContainer from 'src/components/screenContainer';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes({ component: Component, routes, path, componentProps, containerProps, ...rest }) {
  return (
    <Route
      {...rest}
      path={path}
      render={props => {
        // pass the sub-routes down to keep nesting
        const COM = <Component {...props} {...componentProps} routes={routes} />;
        return <ScreenContainer {...containerProps}>{COM}</ScreenContainer>;
      }}
    />
  );
}

export default RouteWithSubRoutes;
