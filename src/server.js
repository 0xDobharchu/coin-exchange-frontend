import { renderToString } from 'react-dom/server';
import React from 'react';
import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import rootReducer from 'src/redux/reducer';
import { Provider } from 'react-redux';
import App from './app';

const app = express();
app.use(morgan('short'));
app.use('/public', express.static(path.join(__dirname, '../client')));
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

global.__SERVER__ = true;
global.__CLIENT__ = false;

function renderFullPage(appString, preloadedState, callback) {
  fs.readFile(
    path.resolve(__dirname, '../client/index.html'),
    'utf8',
    (er, html) => {
      if (er) return callback(er.message);
      const newHtml = html.replace(
        '<div id="root-app"></div>',
        `<div id="root-app">${appString}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>`
      );
      return callback(newHtml);
    }
  );
}

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(rootReducer);
  const context = {};
  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    renderFullPage(html, preloadedState, (fullHTML) => {
      res.send(fullHTML);
    });
  }
}

app.use(handleRender);

app.listen(8000, () => {
  console.log(path.dirname(__filename));
  console.log('App is running on 8000');
});
