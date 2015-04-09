module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var less_autoprefix_plugin = require('less-plugin-autoprefix'),
    less_autoprefix = new less_autoprefix_plugin({browsers: ["> 1%", "last 2 versions"]}),
    less_groupMQ = require('less-plugin-group-css-media-queries'),
    less_cleanCSS_plugin = require('less-plugin-clean-css'),
    less_cleanCSS = new less_cleanCSS_plugin({advanced: true});

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {

      development: {
        options: {
          plugins: [
            less_autoprefix,
            less_groupMQ,
          ]
        },
        files: {
          "dist/css/style.css": "src/css/style.less"
        }
      },

      production: {
        options: {
          plugins: [
            less_autoprefix,
            less_groupMQ,
            less_cleanCSS
          ]
        },
        files: {
          "dist/css/style.css": "src/css/style.less"
        }  
      }

    },

    'compile-handlebars': {

      development: {
        template: 'src/markup/pages/**/*.handlebars',
        templateData: 'test/fixtures/deep/**/*.json',
        output: 'dist/**/*.html',
        //helpers: 'test/helpers/**/*.js',
        partials: 'src/markup/partials/**/*.handlebars'
      }

    }
    

  });

  grunt.registerTask('development', ['less:development','compile-handlebars:development']);
  grunt.registerTask('production', ['less:production','compile-handlebars']);

  grunt.registerTask('default', ['development']);

}