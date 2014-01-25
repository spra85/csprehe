module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/handlebars/handlebars.js',
          'bower_components/ember/ember.prod.js',
          'bower_components/ember-data/ember-data.js',
          'bower_components/leaflet-dist/leaflet-src.js',
          'bower_components/ember-leaflet/ember-leaflet.js',
          'bower_components/leaflet-plugins/layer/tile/Google.js',
          'bower_components/ember-animated-outlet/dist/ember-animated-outlet.js',
          'assets/javascript/application.js',
          'assets/javascript/router.js',
          'assets/javascript/components/**/*.js',
          'assets/javascript/controllers/**/*.js',
          'assets/javascript/models/**/*.js',
          'assets/javascript/routes/**/*.js',
          'assets/javascript/views/**/*.js',
          'public/templates.js',
          'assets/javascript/fixtures.js'
        ],
        dest: 'public/javascript/application.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/stylesheets/application.min.css': [
            'public/stylesheets/application.css',
            'bower_components/ember-animated-outlet/dist/ember-animated-outlet.css',
            'bower_components/leaflet-dist/leaflet.css'
          ]
        }
      }
    },
    ember_handlebars: {
      options: {
        processName: function(filePath) {
          var shortFilePath = filePath.replace(/assets\/javascript\/templates\//, '').replace('.hbs', '');
          return shortFilePath;
        }
      },
      compile: {
        files: {
          'public/templates.js': 'assets/javascript/templates/**/*.hbs'
        }
      }
    },
    watch: {
      handlebars: {
        files: ['assets/javascript/templates/**/*.hbs'],
        tasks: ['ember_handlebars', 'concat']
      },
      haml: {
        files: ['index.html.haml'],
        tasks: ['haml']
      },
      javascripts: {
        files: [
          'bower_components/**/*.js',
          'assets/javascript/**/*.js'
        ],
        tasks: ['concat', 'uglify']
      },
      css: {
        files: [
          'bower_components/normalize-css/normalize.css',
          'bower_components/bourbon/app/assets/stylesheets/bourbon',
          'bower_components/neat/app/assets/stylesheets/neat',
          'bower_components/leaflet-dist/leaflet.css',
          'bower_components/ember-animated-outlet/dist/ember-animated-outlet.css',
          'assets/stylesheets/*.scss'
        ],
        tasks: ['sass', 'cssmin']
      }
    },
    haml: {
      dist: {
        files: {
          'public/index.html': 'index.html.haml'
        }
      }
    },
    sass: {
      options: {
        loadPath: require('node-neat').includePaths
      },
      dist: {
        files: {
          'public/stylesheets/application.css': 'assets/stylesheets/style.css.scss'
        }
      }
    },
    uglify: {
      build: {
        src: 'public/javascript/application.js',
        dest: 'public/javascript/application.min.js'
      }
    },
    aws: grunt.file.readJSON('.credentials.json'),
    s3: {
      options: {
        accessKeyId: "<%= aws.access_key %>",
        secretAccessKey: "<%= aws.access_secret %>",
        bucket: "<%= aws.bucket %>"
      },
      build: {
        cwd: "public/",
        src: "**"
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: ['bower_components/font-awesome/fonts/*'], dest: 'public/fonts', filter: 'isFile' },
          { expand: true, flatten: true, src: ['bower_components/leaflet-dist/images/*'], dest: 'public/images', filter: 'isFile' },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-handlebars');

  grunt.registerTask('default', ['ember_handlebars', 'concat', 'uglify', 'sass', 'cssmin', 'haml']);
  grunt.registerTask('deploy', ['default', 'copy', 's3']);
}