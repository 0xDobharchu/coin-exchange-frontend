const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');
const commonEnv = require('./.env/.env.common');
const clientEnv = require('./.env/.env.client');

const env = {
  ...commonEnv,
  ...clientEnv
};

const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        warnings: false,
        compress: {
          comparisons: false,
        },
        parse: {},
        mangle: true,
        output: {
          comments: false,
          ascii_only: true,
        },
      },
      parallel: true,
      cache: true,
      sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  nodeEnv: 'production',
  sideEffects: true,
  concatenateModules: true,
  splitChunks: {
    chunks: 'all',
    minSize: 30000,
    maxSize: 300000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
      },
      main: {
        chunks: 'all',
        minChunks: 2,
        reuseExistingChunk: true,
        enforce: true,
      },
    },
  },
  runtimeChunk: true,
};

module.exports = merge(isDev ? devConfig : prodConfig, {
  entry: './src/client', // string | object | array  // defaults to './src'
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dist/client/'), // string
    publicPath: PUBLIC_PATH,
  },
  devServer: isDev ? {
    port: 1337,
    publicPath: PUBLIC_PATH,
    historyApiFallback: true,
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
  target: 'web', // enum  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  // lets you provide options for webpack-serve
  plugins: [
    ...(!isDev ? [new CleanWebpackPlugin(path.resolve(__dirname, 'dist/client'))] : []),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      APP_ENV: JSON.stringify(env),
    }),
  ],
  optimization: isDev ? {} : optimization,
});
