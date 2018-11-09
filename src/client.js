import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'src/app';
import { Provider } from 'react-redux';
import configureStore from 'src/redux/store';

/** Temporary disbabled */
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('sw.js').then((registration) => {
//       console.log('SW registered: ', registration);
//     }).catch((registrationError) => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

const store = configureStore();
const container = document.getElementById('root-app');
ReactDom.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, container
);
