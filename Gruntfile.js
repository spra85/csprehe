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
          'assets/javascript/**/*.js'
        ],
        dest: 'public/javascript/application.js'
      }
    },
    cssmin: {
      combine: {
        files: {
            'public/stylesheets/application.min.css': 'public/stylesheets/application.css'
        }
      }
    },
    ember_handlebars: {
      options: {
        processName: function(filePath) {
          var shortFilePath = filePath.replace(/assets\/templates\//, '').replace('.hbs', '');
          return shortFilePath;
        }
      },
      compile: {
        files: {
          'public/templates.js': 'assets/templates/**/*.hbs'
        }
      }
    },
    watch: {
      handlebars: {
        files: ['assets/templates/**/*.hbs'],
        tasks: ['ember_handlebars']
      },
      haml: {
        files: ['index.html.haml'],
        tasks: ['haml']
      },
      javascripts: {
        files: [
          'bower_components/jquery/jquery.js',
          'bower_components/handlebars/handlebars.js',
          'bower_components/ember/ember.prod.js',
          'bower_components/ember-data/ember-data.js',
          'assets/javascript/**/*.js'
        ],
        tasks: ['concat', 'uglify']
      },
      css: {
        files: [
          'bower_components/normalize-css/normalize.css',
          'bower_components/bourbon/app/assets/stylesheets/bourbon',
          'bower_components/neat/app/assets/stylesheets/neat',
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-aws');

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'haml', 'ember_handlebars']);

}