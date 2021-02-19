const gulp = require('gulp');
const webp = require('gulp-webp');
const {src, dist} = require ("./../config");


module.exports = () => (
	gulp.src(src.img.to_webp)
		.pipe(webp())
		.pipe(gulp.dest(dist.img))
);