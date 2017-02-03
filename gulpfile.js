'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    spritesmith = require('gulp.spritesmith'),
    config = require('./config.json'),
    plumber = require('gulp-plumber');

gulp.task('webserver', function () {
    browserSync(config['server-config']);
});

gulp.task('clean', function (cb) {
    rimraf(config.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(config.src.html)
        .pipe(rigger()) 
        .pipe(gulp.dest(config.build.html))
        .pipe(reload({stream: true}));  
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/img/sprites/*.png')
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss'
        }));
    spriteData.img.pipe(gulp.dest('./src/img'));
    spriteData.css.pipe(gulp.dest('./src/styles/_misc/'));
});

gulp.task('js:build', function () {
    gulp.src(config.src.js)
        .pipe(plumber())
        .pipe(rigger())  
        .pipe(concat('main.js'))
        .pipe(sourcemaps.init())  
        .pipe(uglify())  
        .pipe(sourcemaps.write())  
        .pipe(gulp.dest(config.build.js))
        .pipe(reload({stream: true}));  
});

gulp.task('style:build', function () {
    gulp.src(config.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())  
        .pipe(sass()) 
        .pipe(prefixer())  
        .pipe(cssmin()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(config.src.img)
        .pipe(imagemin({  
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(config.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(config.src.fonts)
        .pipe(gulp.dest(config.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    gulp.watch([config.watch.html], function() {
        gulp.start('html:build');
    });
    gulp.watch([config.watch.style], function() {
        gulp.start('style:build');
    });
    gulp.watch([config.watch.js], function() {
        gulp.start('js:build');
    });
    gulp.watch([config.watch.img], function() {
        gulp.start('image:build');
    });
    gulp.watch([config.watch.fonts], function() {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);

