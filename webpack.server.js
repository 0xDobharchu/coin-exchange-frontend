const path = require('path');
const prodConfig = require('./webpack.prod');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isDev = process.env.NODE_ENV === 'development';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = merge(prodConfig, {
  devServer: {},
  entry: "./src/server.js", // string | object | array  // defaults to './src'
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist/server"), // string
    filename: "server.js", 
    publicPath: PUBLIC_PATH,
  },
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  target: "node", // enum  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  // lets you provide options for webpack-serve
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    ...(!isDev ? [new CleanWebpackPlugin(path.resolve(__dirname, 'dist/server'))] : []),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
});