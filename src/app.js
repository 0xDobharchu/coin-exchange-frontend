import React from 'react';
import Root from 'src/screens/app/components/App/Root';
import routes, { RenderRoutes } from 'src/routes';
import 'src/assets/styles/app.scss';


const App = () => (
  <Root>
    <RenderRoutes routes={routes} />
  </Root>
);
export default App;
