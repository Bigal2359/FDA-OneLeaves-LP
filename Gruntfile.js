/* jshint node: true */
module.exports = function(grunt) {
  'use strict';

  var checkMode = function(mode) {
    var ret = false;
    switch (mode) {
      case 'dev':
      case 'stage':
      case 'prod':
        ret = true;
        break;
    }
    return ret;
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    build: {

      // Build error messages
      err: {
        // Utilized when the checkMode function returns false.
        wrongMode: 'Please specify either "prod", "stage" or "dev".'
      },

      // File names
      fileNames: {
        css: 'fdaool-<%= pkg.version %>.min.css',
        jsFoot: 'fdaool-foot-<%= pkg.version %>.min.js',
        jsHead: 'fdaool-head-<%= pkg.version %>.min.js'
      },

      // Build paths: Keep it DRY!
      base: {
        src: './_src',
        dest: './_dist'
      },
      tmp: {
        src: './.tmp'
      },
      css: {
        src: '<%= build.base.src %>/sass',
        dest: '<%- build.base.dest %>/_Assets/css'
      },
      html: {
        src: '<%= build.base.src %>/pages',
        dest: '<%= build.base.dest %>'
      },
      img: {
        src: '<%= build.base.src %>/img',
        dest: '<%= build.base.dest %>/_Assets/img'
      },
      js: {
        src: '<%= build.base.src %>/js',
        dest: '<%= build.base.dest %>/_Assets/js'
      },
      misc: {
        src: './components',
        dest: './_dist'
      },
      video: {
        src: '<%= build.base.src %>/video',
        dest: '<%= build.base.dest %>/_Assets/video'
      }

    },

    clean: {
      misc: [
        '<%= build.misc.dest %>/.htaccess',
        '<%= build.misc.dest %>/.htpasswd',
      ],
      css: '<%= build.css.dest %>/',
      html: '<%= build.html.dest %>/**/*.html',
      img: '<%= build.img.dest %>/',
      js: '<%= build.js.dest %>/',
      tmp: '<%= build.tmp.src %>/',
      video: '<%= build.video.dest %>/'
    },

    connect: {
      server: {
        options: {
          base: '<%= build.base.dest %>/',
          keepalive: true,
          open: true,
          port: 35730,
          protocol: 'http',
          useAvailablePort: true
        }
      }
    },

    copy: {
      htaccessDev: {
        src: '<%= build.misc.src %>/dev.htaccess',
        dest: '<%= build.misc.dest %>/.htaccess'
      },
      htaccessStage: {
        files: [
          {
            src: '<%= build.misc.src %>/stage.htaccess',
            dest: '<%= build.misc.dest %>/.htaccess'
          },
          {
            src: '<%= build.misc.src %>/stage.htpasswd',
            dest: '<%= build.misc.dest %>/.htpasswd'
          }
        ]
      },
      html: {
        options: {
          process: function(content) {
            return grunt.template.process(content);
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%= build.tmp.src %>/',
            src: '**/*.html',
            dest: '<%= build.html.dest %>/'
          }
        ]
      },
      img: {
        files: [
          {
            expand: true,
            cwd: '<%= build.img.src %>/',
            src: '**/*.{png,jpg,jpeg,gif}',
            dest: '<%= build.img.dest %>/'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: '<%= build.js.src %>/vendor/',
            src: 'scrolldepth.js',
            dest: '<%= build.js.dest %>/'
          }
        ]
      },
      video: {
        files: [
          {
            expand: true,
            cwd: '<%= build.video.src %>/',
            src: '**/*.mp4',
            dest: '<%= build.video.dest %>/'
          }
        ]
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          require: [
            'sass-globbing'
          ],
          sourcemap: 'none'
        },
        files: {
          '<%= build.css.dest %>/<%= build.fileNames.css %>':
              '<%= build.css.src %>/main.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed',
          require: [
            'sass-globbing'
          ],
          sourcemap: 'none'
        },
        files: {
          '<%= build.css.dest %>/<%= build.fileNames.css %>':
              '<%= build.css.src %>/main.scss'
        }
      }
    },

    includereplace: {
      dist: {
        options: {
          includesDir: "<%= build.base.src %>/inc/"
        },
        files: [
          {
            expand: true,
            cwd: '<%= build.html.src %>/',
            src: '**/*.html',
            dest: '<%= build.tmp.src %>/'
          }
        ]
      }
    },

    concat: {
      options: {
        separator: ';\n',
        stripBanners: true
      },
      footDev: {
        src: '<%= build.js.src %>/fdaool.js',
        dest: '<%= build.js.dest %>/<%= build.fileNames.jsFoot %>'
      },
      footProd: {
        src: '<%= build.js.src %>/fdaool.js',
        dest: '<%= build.js.dest %>/<%= build.fileNames.jsFoot %>'
      },
      headDev: {
        src: [
          '<%= build.js.src %>/vendor/modernizr.min.js'
        ],
        dest: '<%= build.js.dest %>/<%= build.fileNames.jsHead %>'
      },
      headProd: {
        src: [
          '<%= build.js.src %>/vendor/modernizr.min.js'
        ],
        dest: '<%= build.js.dest %>/<%= build.fileNames.jsHead %>'
      }
    },

    mocha_casperjs: {
        options: {
          ui: 'bdd',
          reporter: 'spec',
          colors: true,
          'mocha-path': 'node_modules/mocha',
          'chai-path': 'node_modules/chai',
          'casper-chai-path': 'node_modules/casper-chai',
          env: 'dev'
        },
        files: {
          src: [
          ]
        }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: [
          '<%= build.css.src %>/**/*.scss'
        ],
        tasks: [
          'buildCSS:dev'
        ]
      },
      html: {
        files: [
          '<%= build.html.src %>/**/*.html',
          '<%= build.base.src %>/inc/**/*.html',
        ],
        tasks: [
          'buildHTML:dev'
        ]
      },
      img: {
        files: [
          '<%= build.img.src %>/**/*.{png,jpg,jpeg,gif}'
        ],
        tasks: [
          'buildImg:dev'
        ]
      },
      js: {
        files: [
          '<%= build.js.src %>/**/*.js'
        ],
        tasks: [
          'buildJS:dev'
        ]
      }
    },

    jshint: {
      options: {
        jshintrc: './.jshintrc',
        ignores: '<%= build.js.src %>/vendor/**/*.js'
      },
      files: [
        '<%= build.js.src %>/**/*.js'
      ]
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        mangle: true,
        preserveComments: function(node, comment) {
          // Preserve comments that start with a bang
          return /^!/.test(comment.value);
        },
        sourceMap: false
      },
      js: {
        files: [
          {
            expand: true,
            cwd: '<%= build.js.src %>/',
            src: '*.js',
            dest: '<%= build.tmp.src %>/'
          }
        ]
      }
    },

    scsslint: {
      options: {
        config: './scss-lint.yml',
        exclude: [
          '<%= build.css.src %>/vendor/**/*.scss'
        ]
      },
      dist: [
        '<%= build.css.src %>/**/*.scss'
      ]
    },

    htmllint: {
      options: {
        ignore: [
          'The “frameborder” attribute on the “iframe” element is obsolete. Use CSS instead.',
          'Bad value “” for attribute “src” on element “iframe”: Must be non-empty.',
          '“&” did not start a character reference. (“&” probably should have been escaped as “&amp;”.)',
          'Attribute “webkitallowfullscreen” not allowed on element “iframe” at this point.',
          'Attribute “mozallowfullscreen” not allowed on element “iframe” at this point.',
          'Attribute “playsinline” not allowed on element “video” at this point.'
        ]
      },
      all: {
        src: [
          '<%= build.html.dest %>/**/*.html'
        ]
      }
    },

    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          removeOptionalTags: true,
          minifyJS: {
            drop_debugger: true,
            drop_console: true
          },
        },
        files: [
          {
            expand: true,
            cwd: '<%= build.html.dest %>/',
            src: '**/*.html',
            dest: '<%= build.html.dest %>/'
          }
        ]
      }
    },

    favicons: {
      options: {
        precomposed: false,
        appleTouchBackgroundColor: '#ffffff',
        tileBlackWhite: false,
        tileColor: '#ffffff',
        androidHomescreen: true,
        html: '<%= build.base.src %>/inc/icons.html'
      },
      icons: {
        src: '<%= build.misc.src %>/favicon.png',
        dest: '<%= build.misc.dest %>/_Assets/img'
      }
    },

    imagemin: {
      prod: {
        options: {
          optimizationLevel: 5
        },
        files: [
          {
            expand: true,
            cwd: '<%= build.img.src %>/',
            src: '**/*.{png,jpg,jpeg,gif}',
            dest: '<%= build.img.dest %>/'
          }
        ]
      }
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('buildMisc', 'Build the miscellaneous site files.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    if (!checkMode(mode)) {
      grunt.log.error(grunt.config.get('build.err.wrongMode'));
    } else {
      // Clean the miscellaneous files.
      grunt.task.run('clean:misc');
      // Videos
      grunt.task.run('clean:video', 'copy:video');
    }
  });

  /**
   * Build just the Favicon files.
   */
  grunt.registerTask('buildFav', 'Build Favicon files.', function() {
    // Generate favicons, Apple touch icons, Windows tiles, etc.
      grunt.task.run('favicons');
  });

  /**
   * Test (lint) just the Sass files.
   */
  grunt.registerTask('testCSS', 'Test the CSS files.', function() {
    grunt.task.run('scsslint');
  });

  /**
   * Build just the CSS files.
   */
  grunt.registerTask('buildCSS', 'Build the CSS files.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    // Ensure we have a whitelisted mode.
    if (!checkMode(mode)) {
      grunt.log.error(grunt.config.get('build.err.wrongMode'));
    } else {
      // Lint the Sass files.
      grunt.task.run('testCSS');
      // Remove existing CSS files and then generate new CSS files.
      grunt.task.run('clean:css');
      if ('dev' === mode) {
        grunt.task.run('sass:dev');
      } else {
        grunt.task.run('sass:prod');
      }
    }
  });

  /**
   * Build just the image files.
   */
  grunt.registerTask('buildImg', 'Build the image files.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    // Ensure we have a whitelisted mode.
    if (!checkMode(mode)) {
      grunt.log.error(grunt.config.get('build.err.wrongMode'));
    } else {
      // Remove previous output img files.
      grunt.task.run('clean:img');
      // Optimize images in production.
      if (mode === 'prod' || mode === 'stage') {
        grunt.task.run('imagemin:prod');
      } else {
        // Copy over new img files in development.
        grunt.task.run('copy:img');
      }
    }
  });

  /**
   * Test (lint) just the JS files.
   */
  grunt.registerTask('testJS', 'Test the JS files.', function(mode) {
    grunt.task.run('jshint');
  });

  grunt.registerTask('buildJS', 'Build the JavaScript files.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    // Ensure we have a whitelisted mode.
    if (!checkMode(mode)) {
      grunt.log.error(grunt.config.get('build.err.wrongMode'));
    } else {
      //// Lint the JS files.
      grunt.task.run('testJS');
      // Remove existing JS files.
      grunt.task.run('clean:js');
      // Copy certain vendor files over exactly as they are.
      // grunt.task.run('copy:js');
      // Generate new JS files.
      if (mode === 'dev' || mode === 'qa') {
        grunt.task.run('concat:headDev');
        grunt.task.run('concat:footDev');
      } else {
        // Minify JS for production.
        grunt.task.run('uglify:js');
        grunt.task.run('concat:headProd');
        grunt.task.run('concat:footProd');
        // Clean up the temp directory
        grunt.task.run('clean:tmp');
      }
    }
  });

  /**
   * Test (W3C validate) just the HTML files.
   */
  grunt.registerTask('testHTML', 'Test the HTML files.', function() {
    grunt.task.run('htmllint');
  });

  /**
   * Build just the HTML files.
   */
  grunt.registerTask('buildHTML', 'Build the HTML files.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    // Ensure we have a whitelisted mode.
    if (!checkMode(mode)) {
      grunt.log.error(grunt.config.get('build.err.wrongMode'));
    } else {
      // Remove existing HTML files and then generate new HTML files.
      grunt.task.run('clean:html', 'includereplace:dist', 'copy:html',
          'clean:tmp');
      // Minify HTML in production.
      if (mode === 'prod' || mode === 'stage') {
        grunt.task.run('htmlmin:prod');
      }
      // Validate HTML.
      // Unfortunately, the test comes _after_ the build, so we can't
      // fail the build here, but we can fail the commit.
      grunt.task.run('testHTML');
    }
  });

  grunt.registerTask('build', 'Build all the things.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    grunt.task.run('buildMisc:' + mode);
    grunt.task.run('buildHTML:' + mode);
    grunt.task.run('buildCSS:' + mode);
    grunt.task.run('buildJS:' + mode);
    grunt.task.run('buildImg:' + mode);
  });

  /**
   * Test the site (integration tests). This task requires the
   * serve task to be running in a separate tab.
   */
  grunt.registerTask('testSite', 'Run the integration tests.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    // Ensure we have a whitelisted mode.
    if (!checkMode(mode)) {
      grunt.log.error(grunt.config.get('build.err.wrongMode'));
    } else {
      // Set our current environment.
      grunt.config('mocha_casperjs.options.env', mode);
      // Run the integration tests.
      grunt.task.run('mocha_casperjs');
    }
  });

  /**
   * Rollup test task that invokes all the test sub-tasks.
   */
  grunt.registerTask('test', 'Test all the things.', function(mode) {
    // Unfortunately, we can't test the HTML without _building_ the HTML.
    // I know.
    grunt.task.run('buildHTML:prod');
    grunt.task.run('testCSS');
    grunt.task.run('testJS');
    grunt.task.run('testSite:' + mode);
  });

  grunt.registerTask('serve', 'Serve the static site.', function(mode) {
    // No mode passed? Default to dev.
    mode = (mode) ? mode : 'dev';
    grunt.task.run('build:' + mode, 'connect:server');
  });

};
