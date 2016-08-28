module.exports = function(config) {
  config.set({
    basePath : '.',
    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',

      'public/js/**/*.js',
      'specs/**/*.js'
    ],

    exclude: [
      'public/js/vendor/angular.min.js',
      'public/js/vendor/bootstrap.min.js'
    ],

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-babel-preprocessor'
    ],

    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
    },

    preprocessors: {
      'public/js/app/**/*.js': ['babel']
    },

    client: {
      captureConsole: true
    },
    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    browsers: ['PhantomJS']
  });
};
