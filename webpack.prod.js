const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludePlugin = require('html-webpack-include-assets-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

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
module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: '[hash:8].js', // string    // the filename template for entry chunks
    chunkFilename: '[name].[chunkhash].chunk.js',
    // the name of the exported library
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
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
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, 'src/assets/styles')
              ]
            }
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    // new CopyPlugin([
    //   { from: path.resolve(__dirname, 'src/assets/libs'), to: path.resolve(__dirname, 'dist/client/assets/libs') }
    // ]),
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
});
