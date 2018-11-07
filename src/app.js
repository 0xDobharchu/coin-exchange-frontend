import React, { Component } from 'react';
import routes, { RenderRoutes } from 'src/routes';


// app styles
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