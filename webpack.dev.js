const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');

const cssLoader = [
  'style-loader',
  { loader: 'css-loader', options: { sourceMap: true, modules: true, camelCase: true, localIdentName: '[path][name]__[local]--[hash:base64:5]' } },
  {
    loader: 'resolve-url-loader',
    options: {
      keepQuery: true,
    },
  },
];
module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "[hash].js", // string    // the filename template for entry chunks
    publicPath: "/", // string    // the url to the output directory resolved relative to the HTML page
    // the name of the exported library
  },
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name(file) {
                    const name = file.replace(`${path.resolve(__dirname, 'src')}/`, '');
                    return name;
                  }
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: cssLoader,
      },
      {
        test: /\.scss$/,
        use: [
          ...cssLoader,
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  performance: {
    hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
  },
  devtool: "source-map", // enum  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  stats: "errors-only",  // lets you precisely control what bundle information gets displayed
  devServer: {
    port: 1337,
    // publicPath: '/',
    contentBase: path.resolve(__dirname, 'src/'),
    compress: true, // enable gzip compression
    // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    open: true, // Tells dev-server to open the browser after server had been started
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Ninja Project',
      template: path.resolve(__dirname, 'src/template/app.html'),
    }),
  ],
});