'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    ngtemplates: {
      dashboard: {
        options: {
          module: 'ui.dashboard'
        },
        src: ['client/components/adf/template/*.html'],
        dest: 'client/components/adf/template/dashboard.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      auto: {
        configFile: 'karma.conf.js'
      }
    },
    concat: {
      dist: {
        src: [
          'client/components/adf/src/directives/dashboard.js',
          'client/components/adf/src/directives/*.js',
          'client/components/adf/src/models/*.js',
          'client/components/adf/src/controllers/*.js',
          'client/components/adf/template/dashboard.js'
        ],
        dest: 'dist/angular-ui-dashboard.js'
      }
    },
    watch: {
      files: [
        'client/components/adf/src/**/*.*',
        'client/components/adf/template/*.html'
      ],
      tasks: ['ngtemplates', 'concat', 'copy:dist'],
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'client/{,*/}*.html',
          'client/{,*/}*.css',
          'client/{,*/}*.js',
          'dist/*.css',
          'dist/*.js'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'client/components/adf/src/{,*/}*.js'
      ]
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['client/components/adf/src/angular-ui-dashboard.css'],
          dest: 'dist'
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          src: [
            'dist/*'
          ]
        }]
      },
      templates: {
        src: ['<%= ngtemplates.dashboard.dest %>']
      }
    },
    connect: {
      options: {
        port:9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.',
            'client',
            'dist'
          ]
        }
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'ngtemplates',
    'karma:unit'
  ]);

  grunt.registerTask('test_auto', [
    'jshint',
    'ngtemplates',
    'karma:auto'
  ]);

  grunt.registerTask('client', [
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'jshint',
    'ngtemplates',
    'karma:unit',
    'concat',
    'copy:dist',
    'clean:templates'
  ]);
};
