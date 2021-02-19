const gulp = require("gulp");
const imagemin = require("gulp-imagemin-fix");
const { src, dist, } = require("./../config");


module.exports = function imageMinify() {
	return gulp.src(src.img.all)
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.jpegtran({
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(gulp.dest(dist.img));
}