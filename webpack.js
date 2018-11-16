const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludePlugin = require('html-webpack-include-assets-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// const isDev = process.env.NODE_ENV === 'development';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';
const commonEnv = require('./.env/.env.common');
const clientEnv = require('./.env/.env.client');

const env = {
  ...commonEnv,
  ...clientEnv
};

const cssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  { loader: 'css-loader', options: { modules: true, camelCase: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
  {
    loader: 'resolve-url-loader',
    options: {
      keepQuery: true,
    },
  },
];

module.exports = {
  entry: './src/client', // string | object | array  // defaults to './src'
  output: {
    filename: '[hash:8].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, 'dist/client/'), // string
    publicPath: PUBLIC_PATH,
  },
  mode: 'production',
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
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
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
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
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: cssLoader,
      },
      {
        test: /\.scss$/,
        use: [
          ...cssLoader,
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
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
        sourceMap: true,
      }),
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
  },
  plugins: [
    new webpack.IgnorePlugin(/^electron$/),
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist/client')),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      APP_ENV: JSON.stringify(env),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'The Coinbowl',
      template: path.resolve(__dirname, 'src/template/app.html'),
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new HtmlWebpackIncludePlugin({
      assets: [],
      append: true,
      jsExtensions: ['.js', '.jsx']
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/main.[hash:8].css',
      chunkFilename: 'assets/[id].css',
    }),
  ],
};
