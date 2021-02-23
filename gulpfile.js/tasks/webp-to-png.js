const { build, src } = require("../config");
const gulp = require("gulp");
const dwebp = require("gulp-dwebp");

module.exports = () =>
	gulp.src(`${src.img}/**/*.webp`).pipe(dwebp()).pipe(gulp.dest(build.img));
