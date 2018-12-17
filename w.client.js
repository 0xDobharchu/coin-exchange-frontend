const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludePlugin = require('html-webpack-include-assets-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';
const PORT = process.env.PORT || '1337';
const production = process.env.NODE_ENV === 'production';
const commonEnv = require('./.env/.env.common');
const clientEnv = require('./.env/.env.client');

console.info(`CLIENT: Webpack is running in ${process.env.NODE_ENV || 'development' } mode`);
console.log(process.env.PUBLIC_PATH);

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
          drop_console: true
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

const cssLoader = [
  production ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true, camelCase: true,
      ...production ? {} : { localIdentName: '[path][name]__[local]--[hash:base64:5]', sourceMap: true }
    },
  },
  { loader: 'postcss-loader', options: production ? {} : { sourceMap: true } },
  {
    loader: 'resolve-url-loader',
    options: {
      keepQuery: true,
    },
  },
];

const devServer = {
  host: '0.0.0.0',
  port: PORT,
  publicPath: PUBLIC_PATH,
  historyApiFallback: true,
  hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  https: false, // true for self-signed, object for cert authority
  open: true, // Tells dev-server to open the browser after server had been started
};

const clientModule = {
  // configuration regarding modules
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
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|raw)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: {
              loader: 'file-loader',
              options: production ? 
                {
                  outputPath: 'assets',
                  name() {
                    return '[name]-[hash:8].[ext]';
                  },
                } :
                {
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
        {
          loader: 'sass-loader',
          options: {
            sourceMap: production ? false : true,
            includePaths: [
              path.resolve(__dirname, 'src/assets/styles')
            ]
          }
        },
      ],
    },
  ],
};

const config = {
  entry: 'src/client', // string | object | array  // defaults to './src'
  module: clientModule,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.node'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  performance: {
    hints: 'warning',
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackIncludePlugin({
      assets: [],
      append: true,
      jsExtensions: ['.js', '.jsx']
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      APP_ENV: JSON.stringify(env),
    }),
    new webpack.IgnorePlugin(/^electron$/)
  ],
  context: __dirname,
  target: 'web',
};

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/client/'),
    publicPath: PUBLIC_PATH,
  },
  devServer,
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      env: env,
      template: path.resolve(__dirname, 'src/template/app.html'),
    }),
  ]
};

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/client/'),
    publicPath: PUBLIC_PATH,
    filename: '[hash:8].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist/client')),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      env: env,
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
    new MiniCssExtractPlugin({
      filename: 'assets/main.[hash:8].css',
      chunkFilename: 'assets/[id].css',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/images/template/og_image.png', to: 'assets' },
    ]),
  ],
  optimization
};

module.exports = {
  ...config,
  ...production ? prodConfig : devConfig,
  plugins: [
    ...config.plugins,
    ...production ? prodConfig.plugins : devConfig.plugins
  ],
};