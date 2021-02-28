const { build, src, beautify } = require("./../config");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const pugLinter = require("gulp-pug-linter");
const htmlValidator = require("gulp-w3c-html-validator");
const bemValidator = require("gulp-html-bem-validator");
const gulpBeautify = require("gulp-html-beautify");
const createNotify = require("./../util/create-notify");
const ignore = require("gulp-ignore");
const gulpif = require("gulp-if");

const CONFIG = {
	HTML_VALIDATOR: true, // html w3c validator
	BEM_VALIDATOR: true, // bem validator
	BEAUTIFY: true, // beautify html
};

const EXCLUDE_INC_FILE = "**/*.inc.pug";
const EXCLUDE_INC_DIR = "inc/**/*";

const onError = createNotify("error", {
	title: "PUG",
	message: "Ошибка компиляции!",
	sound: true,

	IS_DEBUG: true,
});

module.exports = () =>
	gulp
		.src(`${src.pug}/**/*.pug`)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(pugLinter({ reporter: "default" }))
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(gulpif(CONFIG.BEM_VALIDATOR, bemValidator()))
		.pipe(ignore.exclude(EXCLUDE_INC_FILE))
		.pipe(ignore.exclude(EXCLUDE_INC_DIR))
		.pipe(gulpif(CONFIG.HTML_VALIDATOR, htmlValidator()))
		.pipe(gulpif(CONFIG.BEAUTIFY, gulpBeautify(beautify.html)))
		.pipe(gulp.dest(build.html));
