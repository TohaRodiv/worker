const { build, src, beautify,} = require("./../config");
const gulp = require("gulp");
const include = require("gulp-file-include");
const ignore = require("gulp-ignore");
const validator = require("gulp-w3c-html-validator");
const gulpBeautify = require("gulp-beautify");
const createNotify = require("./../util/create-notify");
const plumber = require("gulp-plumber");

const onError = createNotify("error", {
	title: "ошибка компиляции!",
	sound: true,
	/**
	 * Todo: если будет ошибка, заполнить эти поля!
	 */
	paramNames: {
		plugin: "plugin",
		title: "title",
		msg: "messageOriginal",
		file: "file",
	},

	isDebug: true,
});

const EXCLUDE_INC_FILE = "**/*.inc.html";
const EXCLUDE_INC_DIR = "inc/**/*";

module.exports = () =>
	gulp
		.src(`${src.html}/**/*.html`)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(
			include({
				prefix: "@",
			})
		)
		.pipe(ignore.exclude(EXCLUDE_INC_FILE))
		.pipe(ignore.exclude(EXCLUDE_INC_DIR))
		.pipe(validator())
		.pipe(validator.reporter())
		.pipe(gulpBeautify.html(beautify.html))
		.pipe(gulp.dest(build.html));
