import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'src/app';
import { Provider } from 'react-redux';
import configureStore from 'src/redux/store';

const store = configureStore();
const container = document.getElementById('root-app');
ReactDom.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
container);