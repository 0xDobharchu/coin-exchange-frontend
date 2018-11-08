import React, { Component } from 'react';
import routes, { RenderRoutes } from 'src/routes';
import 'src/assets/styles/app.scss';


class App extends Component {
  render() {
    return (
      <div>
        <RenderRoutes routes={routes} />
      </div>
    );
  }
}

export default App;