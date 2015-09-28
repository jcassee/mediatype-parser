'use strict';

var gulp = require('gulp'),
  peg    = require('gulp-peg'),
  rename = require('gulp-rename'),
  watch  = require('gulp-watch');

gulp.task('default', function(){
  gulp.src('src/mediatype-parser.pegjs')
    .pipe(peg({exportVar: 'mediaTypeParser'}))
    .pipe(rename('mediatype-parser-browser.js'))
    .pipe(gulp.dest('dist'));
  gulp.src('src/mediatype-parser.pegjs')
    .pipe(peg({exportVar: 'module.exports'}))
    .pipe(rename('mediatype-parser-node.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.start('default');
  watch('src/**', batch(function (events, done) {
    gulp.start('default', done);
  }));
});
