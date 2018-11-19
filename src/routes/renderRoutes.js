import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'src/screens/notFound';
import ScreenContainer from 'src/components/screenContainer';
import RouteWrapper from './routeWraper';
import PrivateRoute from './privateRoute';

export default ({ routes = [] }) => (
  <Switch>
    { routes && routes.map((route, index) => {
      const Component = route.auth ? PrivateRoute : RouteWrapper;
      return <Component key={`${route.path}-${index}`} {...route} />;
    })}
    <Route render={props => (
      <ScreenContainer><NotFoundPage {...props} /></ScreenContainer>
    )}
    />
  </Switch>
);
