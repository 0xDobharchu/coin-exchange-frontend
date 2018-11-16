import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'src/screens/notFound';
import ScreenContainer from 'src/components/screenContainer';
import RouteWrapper from './routeWraper';
import PrivateRoute from './privateRoute';

export default ({ routes = [] }) => (
  <Switch>
    { routes && routes.map(route => {
      const Component = route.auth ? <PrivateRoute key={route.path} {...route} /> : <RouteWrapper key={route.path} {...route} />;
      if (route.noContainer === true) {
        return Component;
      } else {
        return (
          <ScreenContainer>{Component}</ScreenContainer>
        );
      }
    })}
    <Route component={NotFoundPage} />
  </Switch>
);
