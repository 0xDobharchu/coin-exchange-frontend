import React, { Component } from 'react';
import routes, { RenderRoutes } from 'src/routes';
import { BrowserRouter as Router } from 'react-router-dom';

// app styles
import 'src/assets/styles/app.scss';
import 'src/assets/styles/common.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <RenderRoutes routes={routes} />
        </div>
      </Router>
    );
  }
}

export default App;