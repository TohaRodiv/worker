const gulp = require('gulp');
const jp2 = require('gulp-jpeg-2000');
const { src, dist } = require("./../config");


/**
 * TODO: неккоректно рабоатет, настроить!
 */
module.exports = () => {
	return gulp.src(src.img.to_jpeg2000)
		.pipe(jp2())
		.pipe(gulp.dest(dist.img));
}