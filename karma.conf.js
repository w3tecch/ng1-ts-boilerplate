////module.exports = function(config) {
////  config.set({
////    // ... normal karma configuration
////
////    files: [
////      // all files ending in "_test"
////      'src/*.spec.ts',
////      'src/**/*.spec.ts'
////      // each file acts as entry point for the webpack configuration
////    ],
////
////    preprocessors: {
////      // add webpack as preprocessor
////      'src/*.spec.ts': ['webpack'],
////      'src/**/*.spec.ts': ['webpack']
////    },
////
////    webpack: {
////      // karma watches the test entry points
////      // (you don't need to specify the entry option)
////      // webpack watches dependencies
////
////      // webpack configuration
////    },
////
////    webpackMiddleware: {
////      // webpack-dev-middleware configuration
////      // i. e.
////      noInfo: true
////    },
////
////    plugins: [
////      require("karma-webpack")
////    ]
////
////  });
////};
//
//
//// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
//module.exports = function karmaConfig(config) {
//  config.set({
//    frameworks: [
//      // Reference: https://github.com/karma-runner/karma-jasmine
//      // Set framework to jasmine
//      'jasmine'
//    ],
//
//    reporters: [
//      // Reference: https://github.com/mlex/karma-spec-reporter
//      // Set reporter to print detailed results to console
//      'spec',
//
//      // Reference: https://github.com/karma-runner/karma-coverage
//      // Output code coverage files
//      'coverage'
//    ],
//
//    files: [
//      // Grab all files in the app folder that contain .test.
//      'spec-bundle.js'
//    ],
//
//    preprocessors: {
//      // Reference: http://webpack.github.io/docs/testing.html
//      // Reference: https://github.com/webpack/karma-webpack
//      // Convert files with webpack and load sourcemaps
//      'spec-bundle.js': ['webpack', 'sourcemap']
//    },
//
//    browsers: [
//      // Run tests using PhantomJS
//      'PhantomJS'
//    ],
//
//    singleRun: true,
//
//    // Configure code coverage reporter
//    coverageReporter: {
//      dir: 'build/coverage/',
//      type: 'html'
//    },
//
//    webpack: require('./webpack.test'),
//
//    // Hide webpack build information from output
//    webpackMiddleware: {
//      noInfo: true
//    }
//  });
//};

// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-jasmine
      // Set framework to jasmine
      'jasmine'
    ],

    // list of files to exclude
    exclude: [ ],

    //reporters: [
    //  // Reference: https://github.com/mlex/karma-spec-reporter
    //  // Set reporter to print detailed results to console
    //  'spec',
    //
    //  // Reference: https://github.com/karma-runner/karma-coverage
    //  // Output code coverage files
    //  'coverage'
    //],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'progress', 'coverage' ],


    // list of files / patterns to load in the browser
    // we are building the test environment in ./spec-bundle.js
    files: [ { pattern: 'spec-bundle.js', watched: false } ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    browsers: [
      // Run tests using PhantomJS
      'PhantomJS'
    ],

    singleRun: true,

    // Configure code coverage reporter
    //coverageReporter: {
    //  dir: 'build/coverage/',
    //  type: 'html'
    //},
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    webpack: require('./webpack.test'),

    // Webpack please don't spam the console when running in karma!
    webpackServer: { noInfo: true },

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    }
  });
};

