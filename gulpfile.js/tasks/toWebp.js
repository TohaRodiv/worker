const gulp = require("gulp");
const webp = require("gulp-webp");
const { build, src } = require ("./../config");


module.exports = () =>
	gulp
		.src(`${src.img}/**/*.{png,jpg,jpeg,tiff}`)
		.pipe(webp())
		.pipe(gulp.dest(build.img));