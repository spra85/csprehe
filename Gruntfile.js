module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/underscore/underscore.js',
          'assets/javascript/analytics.js',
          'assets/javascript/lib/**/*.js',
          'assets/javascript/application.js',
          'assets/javascript/fixtures.js',
          'assets/javascript/controllers/**/*.js'
        ],
        dest: 'public/javascript/application.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/stylesheets/application.min.css': ['public/stylesheets/application.css']
        }
      }
    },
    watch: {
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
      dist: {
        files: {
          'public/stylesheets/application.css': 'assets/stylesheets/style.scss'
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
          { expand: true, flatten: true, src: ['bower_components/font-awesome/fonts/*'], dest: 'public/fonts', filter: 'isFile' }
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

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'haml']);
  grunt.registerTask('deploy', ['default', 'copy', 's3']);
}
