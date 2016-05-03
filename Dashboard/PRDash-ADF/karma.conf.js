// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({

    preprocessors: {
      // which files to show in coverage report
      'client/components/adf/src/**/*.js': ['coverage']
    },

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      //'client/bower_components/datatables/media/css/jquery.dataTables.css',
      'client/bower_components/jquery/jquery.js',
      'client/bower_components/jquery-ui/jquery-ui.js',
      'client/bower_components/lodash/dist/lodash.js',
      'client/bower_components/angular/angular.js',      
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/datatables/media/js/jquery.dataTables.js',      
      'client/bower_components/angular-datatables/dist/angular-datatables.js',
      'client/bower_components/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.js',
      'client/bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',       
      'client/bower_components/malhar-angular-table/dist/mlhr-table.js',
      'client/bower_components/angular-ui-sortable/sortable.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-mousewheel/mousewheel.js',
      'client/bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min.js',
      'client/bower_components/pines-notify/pnotify.core.js',
      'client/bower_components/angular-pines-notify/src/pnotify.js',
      'client/bower_components/visibilityjs/lib/visibility.core.js',      
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js', 
      'client/bower_components/angular-gridster/dist/angular-gridster.min.js',           
      'client/bower_components/spin.js/spin.js',
      'client/components/adf/directives/dashboard/dashboard.js', // old stuff -- /adf/src/directives/dashboard.js
      'client/components/adf/directives/{,*/}*.js', // old stuff -- /adf/src/directives/*.js
      'client/components/adf/models/{,*/}*.js', // old stuff -- /adf/src/models/*.js
      //'client/components/adf/src/controllers/*.js', 
      //'client/components/adf/*.js', // old stuff -- /adf/template/*.js
      //'client/components/adf/tests/{,*/}*.js',
      'client/components/adf/tests/{,*/}*.js',
      'client/components/widget/vendor/{,*/}*.js',
      'client/components/widget/modules.js',
      'client/components/widget/service/{,*/}*.js',
      'client/components/widget/widgets/{,*/}*.js',
      'client/components/widget/models/{,*/}*.js',
      'client/components/widget/widgets/widget_template.js',
      'client/bower_components/angular-ui-grid/ui-grid.js',
      'http://cdn.datatables.net/1.10.4/js/jquery.dataTables.min.js',
      'client/app/app.js',
      'client/app/**/*.js',
      'client/components/navbar/**/*.js',
      'client/components/auth/**/*.js',
      'client/components/dashboard/**/*.js',
      'client/components/util/**/*.js',
      'test/mock/**/*.js',
      'test/helper/**/*.js',    
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


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
