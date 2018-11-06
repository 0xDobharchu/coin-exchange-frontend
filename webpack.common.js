const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: "./src/client", // string | object | array  // defaults to './src'
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js[x]?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', {
                shippedProposals: true, // to support spread operators
                forceAllTransforms: true
              }],
              "@babel/preset-react",
            ],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          }
        }
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    }
  },
  // source-map most detailed at the expense of build speed.
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  target: "web", // enum  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  // lets you provide options for webpack-serve
}