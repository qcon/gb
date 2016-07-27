// Utils
import gulp from 'gulp';
import rename from 'gulp-rename';
import * as cp from 'child_process';
import browserSync from 'browser-sync';
import include from 'gulp-include';

// JavaScript
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';

// CSS / SCSS
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

const MESSAGES = {
  jekyllBuild: '<span style="color: gray">Running:</span> $ jekyll build',
};

gulp.task('babel:dev', () => {
  return gulp.src('./js/main.js')
  .pipe(include())
  .pipe(babel())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('babel:prod', ['babel:dev'], () => {
  return gulp.src('./dist/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('browser-sync', ['jekylldev'], () => {
  browserSync.init({
    server: {
      baseDir: './_site',
    },
  });
});
gulp.task('sass', ['sass-layout']);

gulp.task('sass-layout', () => {
  return gulp.src('./_sass/inline_layout.scss')
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('errror', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 3 version', '> 1%'],
  }))
  .pipe(gulp.dest('./dist/'))
  .pipe(rename('layout.css'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-jekyll', ['jekylldev'], browserSync.reload);

gulp.task('jekylldev', ['babel:prod', 'sass'], (done) => {
  browserSync.notify(MESSAGES.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {
    stdio: 'inherit',
  })
  .on('close', done);
});

gulp.task('jekyll', ['babel:prod', 'sass'], (done) => {
  browserSync.notify(MESSAGES.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {
    stdio: 'inherit',
  })
  .on('close', done);
});

gulp.task('watch', () => {
  gulp.watch(['allgemein/index.html', 'index.html', '_layouts/*.html',
  '_includes/*.html', '_posts/*/**', 'js/*/**', '_sass/*.scss', '_preview/*.md',
  'authoren/*.md', '_data/*', '_config.yml'], ['watch-jekyll']);
});
gulp.task('default', ['browser-sync', 'watch']);

