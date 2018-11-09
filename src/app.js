import React from 'react';
import routes, { RenderRoutes } from 'src/routes';
import IntlCustomProvider from './lang';
import 'src/assets/styles/app.scss';

const App = () => (
  <IntlCustomProvider>
    <RenderRoutes routes={routes} />
  </IntlCustomProvider>
);
export default App;
