/*
 Ok, this is kinda crazy. We can use the the context method on
 require that webpack created in order to tell webpack
 what files we actually want to require or import.
 Below, context will be an function/object with file names as keys.
 using that regex we are saying look in ./src/app and ./test then find
 any file that ends with spec.js and get its path. By passing in true
 we say do this recursively
 */
//var testContext = require
////context('./src', true, /\.spec\.ts/);
////console.log('testContext', testContext);
//
//// get all the files, for each file, call the context function
//// that will require the file and load it up here. Context will
//// loop and require those spec files here
//testContext.keys().forEach(testContext);

// test/test_index.js

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context('./src/app', true, /.spec.ts$/);
testsContext.keys().forEach(testsContext);
