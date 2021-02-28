const { build, src, beautify } = require("./../config");
const gulp = require("gulp");
const include = require("gulp-file-include");
const ignore = require("gulp-ignore");
const validator = require("gulp-w3c-html-validator");
const gulpBeautify = require("gulp-beautify");
const createNotify = require("./../util/create-notify");
const plumber = require("gulp-plumber");
const gulpif = require("gulp-if");

const CONFIG = {
	HTML_VALIDATOR: true, // html w3c validator
	BEM_VALIDATOR: true, // bem validator
	BEAUTIFY: true, // beautify html
	INCLUDE: true, // enable include
};

const EXCLUDE_INC_FILE = "**/*.inc.html";
const EXCLUDE_INC_DIR = "inc/**/*";

const onError = createNotify("error", {
	title: "HTML",
	message: "Ошибка компиляции!",
	sound: true,

	IS_DEBUG: true,
});

module.exports = () =>
	gulp
		.src(`${src.html}/**/*.html`)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(
			gulpif(
				CONFIG.INCLUDE,
				include({
					prefix: "@",
				})
			)
		)
		.pipe(ignore.exclude(EXCLUDE_INC_FILE))
		.pipe(ignore.exclude(EXCLUDE_INC_DIR))
		.pipe(gulpif(CONFIG.HTML_VALIDATOR, validator()))
		.pipe(gulpif(CONFIG.HTML_VALIDATOR, validator.reporter()))
		.pipe(gulpif(CONFIG.BEAUTIFY, gulpBeautify.html(beautify.html)))
		.pipe(gulp.dest(build.html));
