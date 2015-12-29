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
        'public/js/lib/angular.min.js',
        'public/js/lib/bootstrap.min.js'
    ],
    plugins: ['karma-mocha', 'karma-chai', 'karma-phantomjs-launcher', 'karma-mocha-reporter'],
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],

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