const { build, src, } = require("./../config");
const gulp = require("gulp");
const toPug = require("gulp-html2pug");

module.exports = () =>
	gulp
		.src(`${src.html}/**/*.html`)
		.pipe (toPug ())
		.pipe(gulp.dest(build.html));
