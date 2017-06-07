var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    'dynogels', // To include external modules.
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
