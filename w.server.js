const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonEnv = require('./.env/.env.common');
const serverEnv = require('./.env/.env.server');
const clientConfig = require('./w.client')();

const env = {
  ...commonEnv,
  ...serverEnv
};

const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

console.info(`SERVER: Webpack is running in ${process.env.NODE_ENV || 'development' } mode`);

const config = {
  mode: 'production',
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.node$/,
        use: [
          { loader: 'node-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: 'ignore-loader'
      },
      {
        test: /\.scss$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|raw)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  outputPath: 'assets',
                  name() {
                    return '[name]-[hash:8].[ext]';
                  },
                  emitFile: false,
                } 
              }
            }
          }
        ]
      },
    ]
  },
  // devtool: 'source-map',
  resolve: clientConfig.resolve,
  externals: [nodeExternals()],
  context: __dirname,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist/server')),
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(env),
      __CLIENT__: false,
      __SERVER__: true
    }),
  ],
  optimization: {
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
        // sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
};

module.exports = config;