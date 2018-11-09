const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Ninja Project',
      template: path.resolve(__dirname, 'src/template/app.html'),
      hash: true,
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/main.[hash:8].css',
      chunkFilename: 'assets/[id].css',
    }),
  ],
});
