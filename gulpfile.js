var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    runSequence = require('run-sequence').use(gulp);

path = {
    'scripts': 'scripts/**/*.js',
    'styles': 'scss/**/*.scss',
    'html': './*.html',
    'img': 'img/**/*.{jpg,svg,png}',
    'fonts': 'fonts/**/*.{ttf}',
    'vendor': {
        'css': 'vendor/css/**/*.css',
        'js': 'vendor/js/**/*.js'
    },
    'public': {
        'html': './public/',
        'js': 'public/js/',
        'css': 'public/css/',
        'img': 'public/img/',
        'fonts': 'public/fonts/'
    }
}


gulp.task('clean', function() {
    del.sync(['./public/**','!./public/']);
});

// HTML
gulp.task('html', function() {
    gulp.src(path.html)
    .pipe(gulp.dest(path.public.html));
});

// Stylesheets SCSS
gulp.task('scss', function() {
    return gulp.src(path.styles)
                .pipe(sass())
                .pipe(concat('stylesheet.css'))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest(path.public.css));
});

// Javascripts
gulp.task('js', function() {
    return gulp.src(path.scripts)
                .pipe(concat('bundle.js'))
                .pipe(uglify())
                .pipe(gulp.dest(path.public.js));
});

// Images
gulp.task('img', function() {
    gulp.src(path.img)
                .pipe(gulp.dest(path.public.img));
});

// FOnts
gulp.task('fonts', function() {
    gulp.src(path.fonts)
                .pipe(gulp.dest(path.public.fonts));
});

// Favicon
gulp.task('favicon', function() {
    gulp.src('favicon.ico')
                .pipe(gulp.dest(path.public.html));
});

// Vendor JS CSS
gulp.task('vendor', function() {
    gulp.src(path.vendor.css)
                .pipe(concat('vendor.css'))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest(path.public.css));
    
    gulp.src(path.vendor.js)
                .pipe(concat('vendor.js'))
                .pipe(uglify())
                .pipe(gulp.dest(path.public.js));
});

// Server BrowserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: path.public.html
        }
    });
});

// #####################################################################
gulp.task('build', function() {
    runSequence('clean','html', 'scss', 'js', 'img', 'fonts', 'favicon', 'vendor');
});

gulp.task('watch', function(cb) {
    gulp.watch(path.styles, ['scss']).on('change', browserSync.reload);
    gulp.watch(path.scripts, ['js']).on('change', browserSync.reload);
    gulp.watch(path.html, [ 'html' ]).on('change', browserSync.reload);
    cb();
})

gulp.task('default', function() {
    return runSequence('build', 'browserSync', 'watch');
})

// #####################################################################


gulp.task('mywatch', function(cb) {
    gulp.watch([path.scss, path.scripts, path.html]).on('change', gulp.run('build'));
    cb();
});

gulp.task('serve', ['build'], function() {
    gulp.run('browserSync');
});

// #####################################################################