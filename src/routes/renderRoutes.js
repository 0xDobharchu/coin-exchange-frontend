import React from 'react';
import RouteWrapper from './routeWraper';

export default ({ routes = [] }) => routes && routes.map(route => <RouteWrapper key={route.path} {...route} />);
