import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'src/app';
import { Provider } from 'react-redux';
import configureStore from 'src/redux/store';

if (__CLIENT__) {
  // Service worker register, implement workbox
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('SW registered: ', registration);
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }

  // listen "Add to home screen" event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    // Stash the event so it can be triggered later.
    e.prompt();
    // Wait for the user to respond to the prompt
    e.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          alert('Nice! Now you can access Coinbowl via home screen');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
  });
}

const store = configureStore();
const container = document.getElementById('root-app');
const render = COM => ReactDom.render(
  <Router>
    <Provider store={store}>
      <COM />
    </Provider>
  </Router>, container
);

render(App);

if (module.hot) {
  module.hot.accept('src/app', () => {
    render(App);
  });
}