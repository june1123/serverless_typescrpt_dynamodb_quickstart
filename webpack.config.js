var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    // To include external module,
    // Dependency is not packaged when it was not require or import in code when webpackIncludeModules is enabled.
    // Remain a 'dynogels' entry until merge pull request. (https://github.com/elastic-coders/serverless-webpack/pull/90)
    'dynogels', // To include external modules. wait merge
    "./Handler.ts"
  ],
  target: 'node',
  externals: [nodeExternals()], // exclude external modules
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/')
    },
    extensions: ['.ts', '.js', '.tsx', '.jsx', '']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: 'handler.js'
  },
};
