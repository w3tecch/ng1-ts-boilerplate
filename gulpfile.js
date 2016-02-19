var helpers = require(process.cwd() + '/webpack.helpers.js');
var gulp = require('gulp');
var typedoc = require('gulp-typedoc');
var connect = require('gulp-connect');
var taskListing = require('gulp-task-listing');

/**
 * TASKLISTING
 * List the available gulp tasks
 */
gulp.task('help', taskListing);

/**
 * DOCS
 * Builds the docs for the your typescript application
 */
gulp.task('docs', ['docs-build'], function () {
  startServer('docs', 3001);
});

gulp.task('docs-build', buildDocs);


//---------------------------------------------------------------------------
function startServer(root, port) {
  connect.server({
    root: root,
    livereload: true,
    port: port
  });
}

function buildDocs() {
  return gulp
    .src([
      'src/**/*.ts',
      'typings/browser.d.ts'
    ])
    .pipe(typedoc({
      module: 'commonjs',
      target: 'es6',
      out: 'docs/',
      name: helpers.getPkg().name
    }));
}