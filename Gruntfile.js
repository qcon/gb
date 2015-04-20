module.exports = function(grunt) {

grunt.initConfig({
  jshint: {
    options: {
      asi : false
    },
    main: ['js/_config.js','js/_main.js','js/_kontakt.js','js/_mischungsrechner.js', 'js/_routes.js']
  },
  copy: {
    main: {
      files: [
        {
          cwd: '_site/allgemein/',
          expand: true, 
          src: ['**/*.html'], 
          dest: 'pdf/html/allgemein/',
          rename: function(dest, src) {
            return dest + src.substring(0, src.indexOf('/')) + '.html';
          }
        },
        {
          cwd: '_site/anleitungen/',
          expand: true, 
          src: ['**/*.html'], 
          dest: 'pdf/html/anleitungen/',
          rename: function(dest, src) {
            return dest + src.substring(0, src.indexOf('/')) + '.html';
          }
        },
        {
          cwd: '_site/pflegeberichte/',
          expand: true, 
          src: ['**/*.html'], 
          dest: 'pdf/html/pflegeberichte/',
          rename: function(dest, src) {
            return dest + src.substring(0, src.indexOf('/')) + '.html';
          }
        },
        {
          cwd: '_site/tipps-tricks/',
          expand: true, 
          src: ['**/*.html'], 
          dest: 'pdf/html/tipps-tricks/',
          rename: function(dest, src) {
            return dest + src.substring(0, src.indexOf('/')) + '.html';
          }
        },
        {
          cwd: '_site/produkttest/',
          expand: true, 
          src: ['**/*.html'], 
          dest: 'pdf/html/produkttest/',
          rename: function(dest, src) {
            return dest + src.substring(0, src.indexOf('/')) + '.html';
          }
        },
      ]
    }
  },
  wkhtmltopdf: {
    allgemein: {
      src: 'pdf/html/allgemein/*.html',
      dest: 'pdf/allgemein/'
    },
    anleitungen: {
      src: 'pdf/html/anleitungen/*.html',
      dest: 'pdf/anleitungen/'
    },
    tippstricks: {
      src: 'pdf/html/tipps-tricks/*.html',
      dest: 'pdf/tipps-tricks/'
    },
    pflegeberichte: {
      src: 'pdf/html/pflegeberichte/*.html',
      dest: 'pdf/pflegeberichte/'
    },
    produkttest: {
      src: 'pdf/html/produkttest/*.html',
      dest: 'pdf/produkttest/'
    },
  },

  jekyll: {
    dev: {
      dest: 'devvv'
    }
  },
  sass: {
    dist: {
      options: {
        style: 'compressed',
        sourcemap: 'none'
      },
      files: {
        'dist/layout.css': '_sass/layout.scss',
        'dist/inline_layout.css': '_sass/inline_layout.scss'
      }
    }
  },
  watch: {
    css: {
      files: ['_sass/*.scss'],
      tasks: ['sass','autoprefixer','jekyll'],
      options: {
        livereload: 1228
      }
    },
    scripts: {
      files: ['js/*.js'],
      tasks: ['concat','uglify', 'jekyll'],
      options: {
        livereload: 1228
      }
    }
    ,
    html: {
        files: ['*.html','_posts/*.md','!_site/*', '_includes/*.html', '_layouts/*', 'allgemein/*', 'pflegeberichte/*', 'anleitungen/*', 'kontakt/*', 'mischungsrechner/*', 'produkttest/*'],
        tasks: ['jekyll'],
        options: {
          livereload: 1228
        }
    }
  },
  uglify: {
    my_target: {
      files: {
        'dist/global.js': 'js/global.js', //dist:src
      }
    }
  },
  autoprefixer: {
    dist: {
      files: {
        'dist/layout.css':'dist/layout.css',
        '_includes/inline_layout.css':'dist/inline_layout.css'
      }
    }
  },
  concat: {
    options: {
      seperator: '',
      banner:"document.addEventListener('DOMContentLoaded', function() {",
      footer:"});"
    },
    dist: {
      // src: ['js/jqeasing.js','js/main.js','js/kontakt.js','js/mischungsrechner.js','js/scroll.js'],
      // dest: 'js/global.js'
      src: ['js/_config.js','js/_main.js','js/_kontakt.js','js/_mischungsrechner.js', 'js/_routes.js', 'js/_search.js'],
      dest: 'js/global.js'
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-wkhtmltopdf');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('default', ['sass','autoprefixer','jekyll','watch']);
grunt.registerTask('deploy', ['sass','autoprefixer','concat','uglify']);
};