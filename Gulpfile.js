var gulp = require("gulp");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var jekyll = require("gulp-jekyll");
var cp = require("child_process");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var rename = require("gulp-rename");


var msg = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./_site/"
        }
    });
});
gulp.task('sass', function () {
	return gulp.src('./_sass/inline_layout.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./dist/'))
		.pipe(autoprefixer())
		.pipe(rename("layout.css"))
		.pipe(gulp.dest("./dist/"));
});

gulp.task("js", function() {
	return gulp.src(["js/$1_selector.js", "js/$2_globalfunctions.js", "js/$2_mischungsrechner.js", "js/$3_search.js", "js/$4_main.js", "js/$5_router.js", "js/$6_kontakt.js", ])
	.pipe(concat("./global.js"))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/"))
});
gulp.task("watch-jekyll", ["jekyll"], browserSync.reload);

gulp.task('jekyll', ["js", "sass"], function (done) {
	browserSync.notify(msg.jekyllBuild);
	return cp.spawn("jekyll", ['build'], {stdio: 'inherit'})
	.on("close", done);
});
gulp.task("watch", ["jekyll"], function() {
	gulp.watch(['index.html', '_layouts/*.html', '_posts/*', "js/*.js", "_sass/*.scss", "_preview/*.md"], ['watch-jekyll']);
});
gulp.task("default", ['browser-sync', "watch"]);