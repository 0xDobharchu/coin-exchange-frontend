const path = require('path');

module.exports = {
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
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', {
                shippedProposals: true, // to support spread operators
                forceAllTransforms: true
              }],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              'transform-function-bind',
              ['transform-class-properties', { spec: true }],
              '@babel/plugin-proposal-optional-chaining',
              ['@babel/plugin-transform-runtime', {
                regenerator: true
              }],
            ],
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
};
