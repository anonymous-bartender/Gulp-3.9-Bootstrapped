var gulp = require('gulp'),
    sass = require('gulp-sass'),
    scss = require("gulp-scss"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    htmlMin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    gulpSequence = require('gulp-sequence');

path = {
    'scripts': 'scripts/**/*.js',
    'styles': 'scss/**/*.scss',
    'html': './*.html',
    'images': 'images/**/*.{jpg,svg,png}',
    'fonts': 'fonts/**/*.{ttf}',
    'public': {
        'html': 'public/',
        'js': 'public/js/',
        'css': 'public/css/',
        'images': 'public/img/',
        'fonts': 'public/fonts/'
    }
}

gulp.task('html', function() {
    gulp.src(path.html)
    // .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.public.html));
})

gulp.task('scss', function() {
    gulp.src(path.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('stylesheet.css'))
    .pipe(gulp.dest(path.public.css));
})

gulp.task('js', function() {
    gulp.src(path.scripts)
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(path.public.js));
})

gulp.task('clean', function() {
    del('public');
})

gulp.task('img', function() {
})

gulp.task('watch', function(cb) {
    gulp.watch(path.styles, ['scss']).on('change', browserSync.reload);
    gulp.watch(path.scripts, ['js']).on('change', browserSync.reload);
    gulp.watch(path.html, [ 'html' ]).on('change', browserSync.reload);
    // gulp.watch(['scss/**/*.scss', 'scripts/**/*.js', './**/*.html']).on('change', browserSync.reload);
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: path.public.html
        }
    });
})


// gulp.task('default', ['clean', 'html', 'scss', 'js', 'browserSync', 'watch']);
gulp.task('default', gulpSequence('clean', 'html', 'scss', 'js', 'browserSync', 'watch'));