const path = require('path');

module.exports = {
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
}