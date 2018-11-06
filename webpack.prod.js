const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');

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
  mode: "production",
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "[hash:8].js", // string    // the filename template for entry chunks
    publicPath: "/", // string    // the url to the output directory resolved relative to the HTML page
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
                  name(file) {
                    return '[name]-[hash:8].[ext]';
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
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Ninja Project',
      template: path.resolve(__dirname, 'src/template/app.html'),
      hash: true,
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: "main.[hash:8].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\/dist|node_modules|bower_components/,
        uglifyOptions: { ecma: 8 },
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
});