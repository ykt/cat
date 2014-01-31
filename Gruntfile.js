(function(){
  
  "use strict";

  module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      mochaTest: {
        test: {
          options: {
            reporter: 'spec'
          },
          src: ['spec/*.test.js']
        }
      }
    });

    // grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.registerTask("test", ["mochaTest"]);
    grunt.registerTask("default", ["test"]);

  };

})();
