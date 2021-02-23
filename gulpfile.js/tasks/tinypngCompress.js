/**
 * @repository https://github.com/stnvh/gulp-tinypng-compress#readme
 */
const { build, src, TINYPNG_API_KEY, } = require("./../config");
const gulp = require("gulp");
const tinypng = require("gulp-tinypng-compress");
const createNotify = require("./../util/create-notify");
const plumber = require("gulp-plumber");

const onError = createNotify("error", {
	title: "ошибка!",
	sound: true,
	paramNames: {
		plugin: "plugin",
		title: "title",
		msg: "message",
		file: false,
	},

	isDebug: true,
});

module.exports = () =>
	gulp
		.src(`${src.img}/**/*.{png,jpg,jpeg,webp}`)
		.pipe (plumber ({ errorHandler: onError }))
		.pipe(tinypng({
			key: TINYPNG_API_KEY,
			sigFile: `${build.img}/.tinypng-sigs`,
			log: true,
			summarize: true,
		}))
		.pipe(gulp.dest(build.img));