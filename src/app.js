import React from 'react';
import routes, { RenderRoutes } from 'src/routes';
import 'src/assets/styles/app.scss';


const App = () => (
  <div>
    <RenderRoutes routes={routes} />
  </div>
);

export default App;
