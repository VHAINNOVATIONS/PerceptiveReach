'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',    
    injector: 'grunt-asset-injector',
    ngtemplates: 'grunt-angular-templates'
  });

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    // Project Settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },

    ngtemplates: {
      dashboard: {
        options: {
          module: 'ui.dashboard'
        },
        src: ['client/components/adf/template/*.html'],
        dest: 'client/components/adf/template/dashboard.js'
      }
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
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
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
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
        dest: 'client/dist/angular-ui-dashboard.js'
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
          livereload: '<%= connect.options.livereload %>',
          base: [
            '.',
            'client',
            'dist'
          ]
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
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
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
          dest: 'client/dist'
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          src: [
            'client/dist/*'
          ]
        }]
      },
      templates: {
        src: ['<%= ngtemplates.dashboard.dest %>']
      },
      server: '.tmp'
    },
    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

    // Original Server for Client 
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
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= yeoman.client %>/index.html',
        ignorePath: '<%= yeoman.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
      }
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
              ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
               '!{.tmp,<%= yeoman.client %>}/app/app.js',
               '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
               '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js']
            ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
            '<%= yeoman.client %>/{app,components}/**/*.css'
          ]
        }
      }
    },    
  });

// Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest'
      ]);
    }

    else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        //'injector:sass', 
        //'concurrent:test',
        'injector',
        'jshint',
        'ngtemplates',
        //'autoprefixer',
        'karma:unit'
      ]);
    }

    /* else if (target === 'e2e') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'env:test',
        //'injector:sass', 
        //'concurrent:test',
        'injector',
        'wiredep',
        //'autoprefixer',
        'express:dev',
        //'protractor'
      ]);
    } */

    else grunt.task.run([
      'test:server',
      'test:client'
    ]);
  });  

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clean:dist',
        'env:all', 
        'wiredep',
      ]);
    }

    grunt.task.run([
      'clean:dist',
      'concat',
      'copy:dist',
      'env:all',  
      'injector',
      'wiredep',
      'express:dev',
      'wait',
      'open', 
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test_auto', [
    'jshint',
    'ngtemplates',
    'karma:auto'
  ]);

  // The original server task
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
