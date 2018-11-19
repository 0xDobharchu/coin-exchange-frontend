import React, { Component } from 'react';
import routes, { RenderRoutes } from 'src/routes';
import zopim from 'src/services/zopim';
import Root from 'src/screens/app/components/App/Root';
import 'src/assets/styles/_app.scss';

class App extends Component {
  componentDidMount() {
    zopim.init();
  }

  render() {
    return (
      <Root>
        <RenderRoutes routes={routes} />
      </Root>
    );
  }
}

export default App;
