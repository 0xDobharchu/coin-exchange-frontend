import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'src/screens/notFound';
import RouteWrapper from './routeWraper';

export default ({ routes = [] }) => (
  <Switch>
    { routes && routes.map(route => <RouteWrapper key={route.path} {...route} />) }
    <Route component={NotFoundPage} />
  </Switch>
);
