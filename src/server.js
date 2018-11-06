const ReactDomServer = require('react-dom/server');
const React = require('react');
const App = require('./app').default;
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

function renderFullPage(appString, preloadedState, callback) {
  fs.readFile(
    path.resolve(__dirname, "../../build/index.html"),
    "utf8",
    (er, html) => {
      if (er) return res.send(er.message);

      html = html.replace(
        `<div id="root"></div>`,
        `<div id="root">${appString}</div>
        <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          "\\u003c"
        )}
      </script>
        `
      );

      html = html.replace(
        `<title>React App</title>`,
        `<title>Server side rendering</title>`
      );

      callback(html);
    }
  );
}

function handleRender(req, res) {
  // // Create a new Redux store instance
  // let store = createStore(reducer);
  // let context = {};
  // // Render the component to a string
  // const html = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={req.originalUrl} context={context}>
  //       <App />
  //     </StaticRouter>
  //   </Provider>
  // );

  // // Grab the initial state from our Redux store
  // const preloadedState = store.getState();

  // Send the rendered page back to the client
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    renderFullPage(html, {}, function(fullHTML) {
      res.send(fullHTML);
    });
  }
}

app.use(handleRender)

app.listen(8000, () => {
  console.log('App is running on 8000');
});