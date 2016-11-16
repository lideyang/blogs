'use strict';

// https://github.com/BrowserSync/recipes/tree/master/recipes/webpack.react-hot-loader
// https://github.com/BrowserSync/browser-sync/issues/246

var path = require('path');

/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require('browser-sync').create('Examples');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
  server: {
    baseDir: __dirname,

    routes: {
      '/lib': path.join(__dirname, '../node_modules')
    },

    middleware: [
      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: {colors: true}

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    '**/*.html'
  ]
}, function(err, bs) {
});