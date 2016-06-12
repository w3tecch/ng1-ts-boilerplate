[![Build Status](https://travis-ci.org/w3tecch/ng1-ts-boilerplate.svg?branch=master)](https://travis-ci.org/hw3tecch/ng1-ts-boilerplate)
[![Dependency Status](https://david-dm.org/w3tecch/ng1-ts-boilerplate.svg)](https://david-dm.org/w3tecch/ng1-ts-boilerplate)
[![devDependency Status](https://david-dm.org/w3tecch/ng1-ts-boilerplate/dev-status.svg)](https://david-dm.org/w3tecch/ng1-ts-boilerplate#info=devDependencies)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/dweber019/angular1-with-typescript-and-webpack)

# Getting Started

## Prerequisites
1. Install [Node.js](http://nodejs.org)
	- on OSX use [homebrew](http://brew.sh) `brew install node`
	- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install these NPM packages globally
  ```
  npm install -g webpack typescript typings karma
  ```

## Dependencies
1. Install all dependencies
  ```
  //In your project folder
  npm install
  typings install
  ```

## Commands

### Running the server
```
npm start
```

### Generate docs and start the docs server
```
npm run docs
```

### Run test
```
npm test
```

### Build the app
```
npm run build
```

### Build the app
You can pass configurations to the app like this:
```
npm start --env prod
```
This can be passed to `start` and `build` command.

#Supporter
<a href="https://www.browserstack.com"><img src="https://cdn.rawgit.com/w3tecch/ng1-ts-boilerplate/browserstack/supporters/browserStack.svg" height="75" /></a>

#License

[MIT](/LICENSE)
