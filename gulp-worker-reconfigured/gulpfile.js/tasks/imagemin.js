const gulp = require("gulp");
const imagemin = require("gulp-imagemin-fix");
const { build, src, } = require ("../config");


module.exports = () => 
	gulp.
		src(`${src.img}/**/*.{gif,png,jpg,svg,webp}`)
		.pipe(imagemin ([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest(build.img));