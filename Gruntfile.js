/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: ['build']
		},

		version: {
			js: {
				options: {
					prefix: '@version\\s*'
				},
				src: ['src/js/**/*.js','src/scss/**/*.scss']
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				files: 'Gruntfile.js'
			},
			js: {
				files: 'src/js/**/*.js'
			}
		},

		browserify: {
			options: {
				transform: ['brfs', 'deglobalify']
			},
			dev: {
				options: {
					debug: true
				},
				files: {
					'build/js/app.js': ['src/js/app.js']
				}
			},
			dist: {
				files: {
					'build/js/app.js': ['src/js/app.js']
				}
			}
		},

		uglify: {
			dist: {
				options: {
					preserveComments: 'some'
				},
				files: {
					'build/js/app.js': ['build/js/app.js']
				}
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'build/css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'build/css'
				}
			}
		},

		copy: {
			files: {
				files: [{
					expand: true,
					cwd: 'src/files/',
					src: ['**'],
					dest: 'build/files/'
				}]
			},
			data: {
				files: [{
					expand: true,
					cwd: 'src/data/',
					src: ['**'],
					dest: 'build/data/'
				}]
			},
			root: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.*'],
					dest: 'build/'
				}]
			}
		},

		connect: {
			dev: {
				options: {
					port: 8000,
					hostname: '*',
					base: 'build/'
				}
			}
		},

		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
				interrupt: true
			},
			js: {
				files: 'src/js/**/*',
				tasks: ['jshint:js', 'browserify:dev'],
				interrupt: true
			},
			css: {
				files: 'src/scss/**/*.scss',
				tasks: 'compass:dev',
				interrupt: true
			},
			files: {
				files: 'src/files/**/*',
				tasks: 'copy:files',
				interrupt: true
			},
			data: {
				files: 'src/data/**/*',
				tasks: 'copy:data',
				interrupt: true
			},
			root: {
				files: 'src/*.*',
				tasks: 'copy:root',
				interrupt: true
			},
			version: {
				files: ['package.json'],
				tasks: 'version',
				interrupt: true
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-version');

	grunt.registerTask('dev', [
		'clean',
		'jshint:js',
		'browserify:dev',
		'compass:dev',
		'copy:data',
		'copy:files',
		'copy:root'
	]);

	grunt.registerTask('default', [
		'dev',
		'connect',
		'watch'
	]);

	grunt.registerTask('dist', [
		'clean',
		'version',
		'jshint:js',
		'browserify:dist',
		'uglify:dist',
		'compass:dist',
		'copy:data',
		'copy:files',
		'copy:root'
	]);

};
