const { build, src, beautify } = require("../config");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const gulpBeautify = require("gulp-beautify");
const include = require("gulp-include");
const ignore = require("gulp-ignore");
const createNotify = require("../util/create-notify");
const plumber = require("gulp-plumber");
const gulpif = require("gulp-if");

const CONFIG = {
	MINIFIED: true, // .min.js - min-version
	EXPANDED: true, // .js - full-version
	ESLINT: true, 	// enable eslint
	FORMAT: true, 	// enable format code
	BEAUTIFY: true, // enable beautify code
};

const EXCLUDE_INC_FILE = "*.inc.js";
const EXCLUDE_INC_DIR = "inc/**/*";

const onError = createNotify("error", {
	title: "ошибка компиляции!",
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
		.src(`${src.js}/**/*.js`)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(
			include({
				extensions: "js",
				separateInputs: true, // allow each input file to use require-directives independently.
				hardFail: false,
			})
		)
		.pipe(
			gulpif(
				CONFIG.ESLINT,
				eslint({
					fix: true,
					/**
					 * 0 - disable
					 * 1 - warning
					 * 2 - error
					 */
					rules: {
						"no-undef": 1,
						"no-unused-vars": 1,
						"no-mixed-spaces-and-tabs": 1,
					},
				})
			)
		)
		.pipe(gulpif(CONFIG.FORMAT, eslint.format()))
		.pipe(eslint.failAfterError())
		.pipe(gulpif(CONFIG.BEAUTIFY, gulpBeautify.js(beautify.js)))
		.pipe(ignore.exclude(EXCLUDE_INC_FILE))
		.pipe(ignore.exclude(EXCLUDE_INC_DIR))
		.pipe(gulpif(CONFIG.EXPANDED, gulp.dest(build.js)))
		.pipe(gulpif(CONFIG.MINIFIED, terser()))
		.pipe(gulpif(CONFIG.MINIFIED, rename({ suffix: ".min" })))
		.pipe(gulpif(CONFIG.MINIFIED, gulp.dest(build.js)));
