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
        src: ['<%= yeoman.client %>/components/adf/directives/{,*/}*.html'], // old stuff -- /components/adf/template/*.html
        dest: '<%= yeoman.client %>/components/adf/directives/dashboard_templates.js' // old stuff -- /components/adf/template/dashboard.js
      },
      widget: {
        options: {
          module: 'ui.widgets'
        },
        src: ['<%= yeoman.client %>/components/widget/widgets/{,*/}*.html'],
        dest: '<%= yeoman.client %>/components/widget/widgets/widget_template.js'
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
        reporter: 'spec',
        timeout: 5000
      },
      src: ['server/**/*.spec.js']
    },
    concat: {
      dashboard: {
        src: [
          '<%= yeoman.client %>/components/adf/directives/dashboard/dashboard.js', // old stuff - /components/adf/src/directives/dashboard.js
          '<%= yeoman.client %>/components/adf/directives/{,*/}*.js',  // old stuff - /components/adf/src/directives/*.js
          '<%= yeoman.client %>/components/adf/models/{,*/}*.js',      // old stuff - /components/adf/src/models/*.js
          //'<%= yeoman.client %>/components/adf/src/controllers/*.js', // old stuff - /components/adf/src/controllers/*.js
          '<%= yeoman.client %>/components/adf/directives/dashboard_templates.js' // old stuff - /components/adf/template/dashboard.js
        ],
        dest: '<%= yeoman.client %>/dist/angular-ui-dashboard.js'
      },
      widget: {
        src: [
          '<%= yeoman.client %>/components/widget/modules.js',
          '<%= yeoman.client %>/components/widget/**/*.js',
          '<%= yeoman.client %>/components/widget/widgets/widget_template.js'
        ],
        dest: '<%= yeoman.client %>/dist/perceptive-reach-widgets.js'
      }
    },
    watch: {
      files: [
        '<%= yeoman.client %>/components/adf/src/**/*.*',
        '<%= yeoman.client %>/components/adf/template/*.html',
        '<%= yeoman.client %>/components/widget/**/*.*',
        '<%= yeoman.client %>/components/**/*.*'
      ],
      tasks: ['ngtemplates', 'concat', 'copy:dist'],
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>',
          base: [
            '.',
            'client'
          ]
        },
        files: [
          '<%= yeoman.client %>/{,*/}*.html',
          '<%= yeoman.client %>/{,*/}*.css',
          '<%= yeoman.client %>/{,*/}*.js',
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

    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['client/components/adf/angular-ui-dashboard.css'], // old stuff -- ['client/components/adf/src/angular-ui-dashboard.css']
          dest: 'client/dist'
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= yeoman.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.spec.js']
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.client %>/components/adf/{directives,models}/{,*/}*.js', // old stuff -- /components/adf/src/{,*/}*.js'
        '<%= yeoman.client %>/{app,components}/**/*.js',
        '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
        '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
      ],
      test: {
        src: [
          '<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ]
      }
    },

    // Empties folder for fresh start
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

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= yeoman.client %>/index.html',
        ignorePath: '<%= yeoman.client %>/',
        dependencies: true,
        devDependencies: true,
        exclude: [/bootstrap-sass-official/, '/json3/', '/es5-shim/', /font-awesome.css/ ]
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
              ['{.tmp,<%= yeoman.client %>}/{app,dist,components}/**/*.js',
               '!{.tmp,<%= yeoman.client %>}/app/app.js',
               '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
               '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
               '!{.tmp,<%= yeoman.client %>}/components/adf/**/*.js',
               '!{.tmp,<%= yeoman.client %>}/components/widget/**/*.js']
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
            ['<%= yeoman.client %>/{app,dist,components}/**/*.css',
            '!<%= yeoman.client %>/app/app.css',
            '!<%= yeoman.client %>/components/adf/**/*.css']
          ]
        }
      }
    }
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
        'ngtemplates',
        //'autoprefixer',
        'karma:unit'
      ]);
    }

    else if (target === 'developer') {
      return grunt.task.run([
        'test:server',
        'test:client',
        'jshint'
      ]);
    }

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

    if (target === 'test') {
      return grunt.task.run([
        'env:all',  
        'express:dev',
        'wait',
        'open',
        'express-keepalive'
      ]);
    }

    grunt.task.run([
      'clean:dist',
      'clean:templates',
      'ngtemplates',
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

  grunt.registerTask('build', [
      'clean:dist',
      'clean:templates',
      'ngtemplates',
      'concat',
      'copy:dist',
      'env:all',  
      'injector',
      'wiredep'
  ]);

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test_auto', [
    'jshint',
    'ngtemplates',
    'karma:auto'
  ]);

  grunt.registerTask('default', function () {
    /* 'clean:dist',
    'jshint',
    'ngtemplates',
    'karma:unit',
    'concat',
    'copy:dist',
    'clean:templates' */
    grunt.log.warn('The `default` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
};
