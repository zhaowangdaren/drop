var gulp = require('gulp'),
del = require('del'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
connect = require('gulp-connect'),
minifycss = require('gulp-minify-css'),
minifyhtml = require('gulp-minify-html'),
processhtml = require('gulp-processhtml'),
autoprefixer = require('gulp-autoprefixer');


gulp.task('server', function(){
	connect.server({
		root: ['./'],
		port: 1337,
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src('src/*.html')
	.pipe(gulp.dest('dev'))
	.pipe(connect.reload())
});

gulp.task('styles', function(){
	gulp.src('src/css/*.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('dev/css'))
	.pipe(connect.reload())
});

gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
	.pipe(jshint())
	.pipe(gulp.dest('dev/js'))
	.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/css/*.css', ['styles']);
});

gulp.task('default', ['server', 'html', 'styles', 'scripts', 'watch']);
