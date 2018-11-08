import React, { Component } from 'react';
import routes, { RenderRoutes } from 'src/routes';
import { Provider } from 'react-redux';
import configureStore from 'src/redux/store';
import 'src/assets/styles/app.scss';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RenderRoutes routes={routes} />
      </Provider>
    );
  }
}

export default App;