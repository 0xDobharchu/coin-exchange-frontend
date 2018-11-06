import React from 'react';
import RouteWrapper from './routeWraper';

export default ({ routes = [] }) => {
  return routes && routes.map((route, i) => <RouteWrapper key={i} {...route} />);
};