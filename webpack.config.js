var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var ENV = process.env.ENV = process.env.NODE_ENV = 'dev';
//var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'ngOneTsWebpack',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};

var banner = '/**\n' +
  ' * @name           ' + getPkg().name + '\n' +
  ' * @description    ' + getPkg().description + '\n\n' +
  ' * @version        ' + getPkg().version + '\n' +
  ' * @author         ' + getPkg().author + '\n' +
  ' * @license        ' + getPkg().license + '\n' +
  ' */\n';

var definePluginConfig = new webpack.DefinePlugin({
  VERSION: JSON.stringify(getPkg().version),
  BUBU: true
});

module.exports = {

  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,

  entry: ['./src/app/app.ts'],

  // Config for our build files
  output: {
    path: root('dist'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },

  plugins: [
    definePluginConfig,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(
      banner,
      {
        raw: true,
        entryOnly: false
      })
  ],

  module: {

    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint'
      }
    ],

    loaders: [
      //Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e|async)\.ts$/]
      },
      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      //
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass!'
      },
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      }

    ]

  },

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  postcss: function () {
    return [
      autoprefixer({browsers: ['last 2 versions']}), precss
    ];
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

function getPkg() {
  return require(path.join(process.cwd(), 'package.json'));
}
