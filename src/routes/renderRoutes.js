import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'src/screens/notFound';
import RouteWrapper from './routeWraper';
import PrivateRoute from './privateRoute';

export default ({ routes = [] }) => (
  <Switch>
    { routes && routes.map(route => (route.auth ? <PrivateRoute key={route.path} {...route} /> : <RouteWrapper key={route.path} {...route} />)) }
    <Route component={NotFoundPage} />
  </Switch>
);
