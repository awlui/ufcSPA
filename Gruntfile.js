module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			app: {
				src: ['angularApp/**/*.js', 'angularApp/javascripts/*.js', '!angularApp/angular.min.js'],
				dest: 'public/mainApp.js'
			}
		},
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},
		concurrent: {
			dev: {
				task: ['nodemon', 'watch:livereload']
			}
		},
		sass: {
			dev: {
				files: {
					'./public/stylesheets/main.css': './angularApp/stylesheets/*.scss'
				}
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'angularApp/**.*.{css,js,html}'
				]
			},
			sass: {
				tasks: ['sass:dev'],
				files: ['./angularApp/stylesheets/*.scss']
			}
		},
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-concat');
}