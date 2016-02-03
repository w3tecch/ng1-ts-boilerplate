var path = require('path');
var yargs = require('yargs').argv;

var webpackHelpers = {
  getEnv: getEnv,
  getPkg: getPkg,
  root: root,
  getBanner: getBanner,
  getMetadata: getMetadata
};

function getEnv() {
  return process.env.ENV = process.env.NODE_ENV = yargs.env || 'dev';
}

function getPkg() {
  return require(path.join(process.cwd(), 'package.json'));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function getMetadata() {
  return {
    title: this.get,
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    ENV: this.getEnv()
  };
}

function getBanner() {
  return '/**\n' +
    ' * @name           ' + getPkg().name + '\n' +
    ' * @description    ' + getPkg().description + '\n\n' +
    ' * @version        ' + getPkg().version + '\n' +
    ' * @author         ' + getPkg().author + '\n' +
    ' * @license        ' + getPkg().license + '\n' +
    ' */\n';
}

module.exports = webpackHelpers;
