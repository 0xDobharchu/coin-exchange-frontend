const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isDev = process.env.NODE_ENV === 'development';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = merge(isDev ? devConfig : prodConfig, {
  entry: "./src/client", // string | object | array  // defaults to './src'
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist/client/"), // string
    publicPath: PUBLIC_PATH,
  },
  devServer: isDev ? {
    port: 1337,
    publicPath: PUBLIC_PATH,
    // contentBase: path.resolve(__dirname, 'src'),
    compress: true, // enable gzip compression
    // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    open: true, // Tells dev-server to open the browser after server had been started
  } : {},
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  target: "web", // enum  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  // lets you provide options for webpack-serve
  plugins: [
    ...(!isDev ? [new CleanWebpackPlugin(path.resolve(__dirname, 'dist/client'))] : []),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\/(dist|node_modules|bower_components)/,
        // include: /\/(src)/,
        uglifyOptions: {
          compress: {
            // Drop console statements
            drop_console: true
          },
          // Eliminate comments
          comments: false,
        },
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
});