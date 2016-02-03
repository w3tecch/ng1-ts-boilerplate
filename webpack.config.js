/**
 * Webpack config for development
 */
module.exports = require('./webpack.make')({
  BUILD: false,
  TEST: false
});



//var webpack = require('webpack');
//var autoprefixer = require('autoprefixer');
//var precss = require('precss');
//
//var helpers = require(process.cwd() + '/webpack.helpers.js');
//
//var ENV = helpers.getEnv();
//
//
//var definePluginConfig = new webpack.DefinePlugin({
//  VERSION: JSON.stringify(helpers.getPkg().version),
//  BUBU: true
//});
//
//module.exports = {
//
//  metadata: helpers.getMetadata(),
//  // for faster builds use 'eval'
//  devtool: 'source-map',
//  debug: true,
//
//  entry: ['./src/app/app.ts'],
//
//  // Config for our build files
//  output: {
//    path: helpers.root('dist'),
//    filename: 'bundle.js',
//    sourceMapFilename: 'bundle.map'
//  },
//
//  plugins: [],
//
//  module: {
//
//    preLoaders: [
//      {
//        test: /\.ts$/,
//        loader: 'tslint'
//      }
//    ],
//
//    loaders: [
//      //Support for .ts files.
//      {
//        test: /\.ts$/,
//        loader: 'ts-loader',
//        exclude: [/\.(spec|e2e|async)\.ts$/]
//      },
//      // Support for *.json files.
//      {
//        test: /\.json$/,
//        loader: 'json-loader'
//      },
//      // HTML LOADER
//      // Reference: https://github.com/webpack/raw-loader
//      // Allow loading html through js
//      {
//        test: /\.html$/,
//        loader: 'raw-loader'
//      },
//      //
//      {
//        test: /\.scss$/,
//        loader: 'style!css!postcss!sass!'
//      },
//      // ASSET LOADER
//      // Reference: https://github.com/webpack/file-loader
//      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
//      // Rename the file using the asset hash
//      // Pass along the updated reference to your code
//      // You can add here any file extension you want to get copied to your output
//      {
//        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
//        loader: 'file'
//      }
//
//    ]
//
//  },
//
//  // Other module loader config
//  tslint: {
//    emitErrors: false,
//    failOnHint: false,
//    resourcePath: 'src'
//  },
//
//  postcss: function () {
//    return [
//      autoprefixer({browsers: ['last 2 versions']}), precss
//    ];
//  },
//
//  // our Webpack Development Server config
//  devServer: {
//    port: helpers.getMetadata().port,
//    host: helpers.getMetadata().host,
//    // contentBase: 'src/',
//    historyApiFallback: true,
//    watchOptions: {aggregateTimeout: 300, poll: 1000}
//  }
//
//};
