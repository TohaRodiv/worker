const gulp = require("gulp");
const dwebp = require("gulp-dwebp");
const { src, dist } = require("./../config");


module.exports = function () {
	return gulp.src(src.img.webp)
		.pipe(dwebp())
		.pipe(gulp.dest(dist.img));
};