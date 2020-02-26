var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var browerSync = require('browser-sync').create();

var config = {
    paths: {
        scss: './scss/*.scss',
        scss_all: './scss/**/*.scss',
        html: './MyApp/index.php',
        html_all: './MyApp/**/*.html'
    },
    output: {
        cssName: 'style.css',
        path: './MyApp/css'
    }
};

gulp.task('sass', function() {
    return gulp.src(config.paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        // .pipe(cleanCss())
        .pipe(gulp.dest(config.output.path))
        .pipe(browerSync.stream());
});


gulp.task('code', function() {
    return gulp.src(config.paths.html)
        .pipe(browerSync.stream());
});


gulp.task('serve', function() {
    browerSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.scss_all, gulp.parallel('sass'));
    gulp.watch(config.paths.html, gulp.parallel('code'));
});



gulp.task('default', gulp.parallel('sass', 'serve'));