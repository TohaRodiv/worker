/**
 * @repository https://github.com/stnvh/gulp-tinypng-compress#readme
 */
const { build, src, TINYPNG_API_KEY, } = require("./../config");
const gulp = require("gulp");
const tinypng = require("gulp-tinypng-compress");


module.exports = () =>
	gulp
		.src(`${src.img}/**/*.{png,jpg,jpeg,webp}`)
		.pipe(tinypng({
			key: TINYPNG_API_KEY,
			sigFile: `${src.img}/.tinypng-sigs`,
			log: true,
			summarize: true,
		}))
		.pipe(gulp.dest(build.img));