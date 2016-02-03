'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var yargs = require('yargs').argv;

var helpers = require(process.cwd() + '/webpack.helpers.js');
var appConfig = require(process.cwd() + '/app.config.js')(helpers.getEnv(), helpers.getPkg());

module.exports = function makeWebpackConfig(options) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  var BUILD = !!options.BUILD;
  var TEST = !!options.TEST;

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if (TEST) {
    config.entry = {}
  } else {
    config.entry = {
      app: './src/app/app.ts'
    };
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {}
  } else {
    config.output = {
      path: helpers.root('dist'),
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
      sourceMapFilename: 'bundle.map'
    };
    //config.output = {
    //  // Absolute output directory
    //  path: __dirname + '/public',
    //
    //  // Output path from the view of the page
    //  // Uses webpack-dev-server in development
    //  publicPath: BUILD ? '/' : 'http://localhost:8080/',
    //
    //  // Filename for entry points
    //  // Only adds hash in build mode
    //  filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
    //
    //  // Filename for non-entry points
    //  // Only adds hash in build mode
    //  chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    //}
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (TEST) {
    config.devtool = 'inline-source-map';
  } else if (BUILD) {
    config.debug = true;
    config.devtool = 'source-map';
  } else {
    config.debug = true;
    config.devtool = 'eval';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
    // Initialize module
  config.module = {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint'
      }
    ],
    loaders: [
      //Support for .ts files.
      //{
      //  test: /\.ts$/,
      //  loader: 'ts-loader'
      //  //exclude: [/\.(spec|e2e|async)\.ts$/]
      //},
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
      // SASS LOADER
      // Reference: https://github.com/jtangelder/sass-loader
      // Allows compiling sass into css
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
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
  };

  // ISPARTA LOADER
  // Reference: https://github.com/ColCh/isparta-instrumenter-loader
  // Instrument JS files with Isparta for subsequent code coverage reporting
  // Skips node_modules and files that end with .test.js
  if (TEST) {
    //config.module.preLoaders.push({
    //  test: /\.ts$/,
    //  exclude: [
    //    /node_modules/,
    //    /\.spec\.ts$/
    //  ],
    //  loader: 'isparta-instrumenter'
    //});
    config.module.loaders.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    );
  } else {
    config.module.loaders.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e|async)\.ts$/]
      }
    );
  }

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  if (!TEST) {
    config.postcss = [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ];
  }

  //// Skip loading css in test mode
  //if (TEST) {
  //  // Reference: https://github.com/webpack/null-loader
  //  // Return an empty module
  //  cssLoader.loader = 'null'
  //}

  /**
   * TSLINT
   */
    // Other module loader config
  config.tslint = {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  // Reference: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
  // Adds the app config to the app
  config.plugins.push(new webpack.DefinePlugin(appConfig));

  // Reference: https://github.com/webpack/extract-text-webpack-plugin
  // Extract css files
  // Disabled when in test mode or not in build mode
  config.plugins.push(new ExtractTextPlugin(
    '[name].[hash].css', {
      disable: !BUILD || TEST
    }
  ));

  if (BUILD) {
    config.plugins.push(new webpack.BannerPlugin(helpers.getBanner()));
  }

  // Skip rendering index.html in test mode
  if (!TEST) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      })
    )
  }

  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    port: helpers.getMetadata().port,
    host: helpers.getMetadata().host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  };


  return config;

};