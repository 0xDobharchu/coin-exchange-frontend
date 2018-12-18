import React, { Component } from 'react';
import routes, { RenderRoutes } from 'src/routes';
import zopim from 'src/services/zopim';
import Root from 'src/screens/app/components/App/Root';
import 'src/assets/styles/_app.scss';
// import 'src/components/FileUploader/styles.css';
// import '../node_modules/dropzone/dist/min/dropzone.min.css';

class App extends Component {
  componentDidMount() {
    zopim.init();

    // hidden overload init loading
    const overlayEl = window.document.getElementById('init-overlay');
    overlayEl && (overlayEl.style.display = 'none');
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
