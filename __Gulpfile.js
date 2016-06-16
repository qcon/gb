var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var jekyll = require("gulp-jekyll");
var cp = require("child_process");
var exec = require("child_process").exec;
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var rename = require("gulp-rename");
var critical = require('critical');
var coffee = require('gulp-coffee');
var include = require('gulp-include');
var gutil = require('gulp-util')
var mqpacker = require("css-mqpacker")


var msg = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
gulp.task('critical', function(cb) {
  critical.generate({
    base: '_site/',
    src: 'index.html',
    css: ['dist/layout.css'],
    dest: '_includes/critical.css',
    minify: true,
    extract: false
  });
});
gulp.task('browser-sync', ['jekylldev'], function() {
  browserSync.init({
    server: {
      baseDir: "./_site/"
    }
  });
});
gulp.task('sass', function() {
  return gulp.src('./_sass/inline_layout.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/'))
    .pipe(rename("layout.css"))
    .pipe(gulp.dest("./dist/"))
});
gulp.task('coffee', ['compile_coffee'], function() {
  return gulp.src(['./dist/global.js', './dist/search.js'])
  .pipe(concat('./GLOSSBOSS.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'))
})
gulp.task('coffee-dev', ['compile_coffee'], function() {
  return gulp.src(['./dist/global.js', './dist/search.js'])
  .pipe(concat('./GLOSSBOSS.js'))
  .pipe(gulp.dest('./dist/'))
})
gulp.task('compile_coffee', function() {
  return gulp.src(['js/_coffee/global.coffee'])
  .pipe(include())
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
})

gulp.task("js", function() {
  return gulp.src(["js/$1_selector.js", "js/$2_globalfunctions.js", "js/$2_mischungsrechner.js", "js/$3_search.js", "js/$4_main.js", "js/$5_router.js", "js/$6_kontakt.js", ])
    .pipe(concat("./global.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"))
});
gulp.task("jsdev", function() {
  return gulp.src(["js/$1_selector.js", "js/$2_globalfunctions.js", "js/$2_mischungsrechner.js", "js/$3_search.js", "js/$4_main.js", "js/$5_router.js", "js/$6_kontakt.js", ])
    .pipe(concat("./global.js"))
    .pipe(gulp.dest("./dist/"))
});
gulp.task("watch-jekyll", ["jekylldev"], browserSync.reload);

gulp.task('jekylldev', ["jsdev", "sass"], function(done) {
  browserSync.notify(msg.jekyllBuild);
  return cp.spawn("jekyll", ['build'], {
      stdio: 'inherit'
    })
    .on("close", done);
});
gulp.task('jekyll', ["js", "sass"], function(done) {
  browserSync.notify(msg.jekyllBuild);
  return cp.spawn("jekyll", ['build'], {
      stdio: 'inherit'
    })
    .on("close", done);
});
gulp.task("watch", function() {
  gulp.watch(['allgemein/index.html', 'index.html', '_layouts/*.html', '_includes/*.html', '_posts/*/**', "js/*.js", "_sass/*.scss", "_preview/*.md", "authoren/*.md", "_data/*", '_config.yml'], ['watch-jekyll']);
});
gulp.task("default", ['browser-sync', "watch"]);