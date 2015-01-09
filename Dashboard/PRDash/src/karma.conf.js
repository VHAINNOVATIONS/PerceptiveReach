// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      //'client/bower_components/jquery/dist/jquery.js',
      //'client/bower_components/angular/angular.js',
      //'client/bower_components/angular-mocks/angular-mocks.js',
      //'client/bower_components/angular-resource/angular-resource.js',
      //'client/bower_components/angular-cookies/angular-cookies.js',
      //'client/bower_components/angular-sanitize/angular-sanitize.js',
      //'client/bower_components/angular-route/angular-route.js',
      //'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      //'client/bower_components/lodash/dist/lodash.compat.js',
      //'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      //'client/bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
      //'client/**/*.html',
      //'client/**/*.css',
      //'client/app/**/*.js',
      //'client/components/**/*.js',
      //'client/app/**/*.html',
      //'client/components/**/*.html',
      //'client/assets/js/**/*.js'

      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/lodash/dist/lodash.compat.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
      'client/bower_components/d3/d3.js',
      'client/bower_components/nvd3/nv.d3.js',
      'http://code.jquery.com/ui/1.11.1/jquery-ui.min.js',
      'http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
      'http://cdn.datatables.net/1.10.4/js/jquery.dataTables.min.js',

      'client/**/*.html',

      'http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css',
      'http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css',
      'http://cdn.datatables.net/1.10.4/css/jquery.dataTables.min.css',
      'http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css',
      'client/**/*.css',      

      
      //'client/bower_components/**/*.js',
      'client/assets/js/plugins/bootstrap-wysihtml5/**/*.js',
      'client/assets/js/plugins/iCheck/**/*.js',
      'client/app/app.js',
      'client/app/**/*.js',
      'client/components/**/*.js',
      //'client/assets/js/AdminLTE/*.js',
      'client/assets/js/plugins/morris/**/*.js',
      'client/assets/js/plugins/sparkline/**/*.js',
      'client/assets/js/plugins/jvectormap/**/*.js',
      'client/assets/js/plugins/jqueryKnob/**/*.js',
      'client/assets/js/plugins/daterangepicker/**/*.js',
      'client/assets/js/plugins/datepicker/**/*.js',
    ],

    preprocessors: {
      '**/*.jade': 'ng-jade2js',
      '**/*.html': 'html2js',
      '**/*.coffee': 'coffee',
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    ngJade2JsPreprocessor: {
      stripPrefix: 'client/'
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    reporters: ['dots', 'junit'],
    
    junitReporter : {
      outputFile: 'test-results.xml'
    }
  });
};
