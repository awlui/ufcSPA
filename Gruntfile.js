module.exports = function(grunt) {
	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'developmentServer.js'
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
					'./public/stylesheets/main.css': './src/stylesheets/*.scss'
				}
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'public/**.*.{css,js}', '*.html'
				]
			},
			sass: {
				tasks: ['sass:dev'],
				files: ['./src/stylesheets/*.scss']
			}
		},
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
}