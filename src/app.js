import React from 'react';
import routes, { RenderRoutes } from 'src/routes';
import IntlCustomProvider from './lang'
import 'src/assets/styles/app.scss';


class App extends Component {
  render() {
    return (
      <div>
        <IntlCustomProvider>
          <RenderRoutes routes={routes} />
        </IntlCustomProvider>
      </div>
    );
  }
}

export default App;
