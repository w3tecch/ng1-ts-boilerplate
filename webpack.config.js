var path = require('path');
var webpack = require('webpack');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'ngOneTsWebpack',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};

module.exports = {

  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  entry: "./src/app/app.ts",

  // Config for our build files
  output: {
    path: root('dist'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },

  module: {

    loaders: [
      //Support for .ts files.
      {test: /\.ts$/, loader: 'ts-loader', exclude: [/\.(spec|e2e|async)\.ts$/]},

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader'},

      //
      {test: /\.scss$/, loader: 'style!css!sass!'}

    ]

  },

  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  }
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}