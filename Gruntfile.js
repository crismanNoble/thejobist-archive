module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var autoprefix_plugin = require('less-plugin-autoprefix');
  var less_autoprefix = new autoprefix_plugin({browsers: ["last 2 versions"]});
  var less_groupMQ = require('less-plugin-group-css-media-queries');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          plugins: [
            less_autoprefix,
            less_groupMQ
          ]
        },
        files: {
          "dist/css/style.css": "src/css/style.less"
        }
      }
    }

  });
  grunt.registerTask('default', ['less']);

}