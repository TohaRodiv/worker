const { build, src, beautify, tsconfig } = require("../config");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const gulpBeautify = require("gulp-beautify");
const createNotify = require("../util/create-notify");
const plumber = require("gulp-plumber");
const gulpif = require("gulp-if");
const tsProject = require("gulp-typescript");

const CONFIG = {
	MINIFIED: true, // .min.js - min-version
	EXPANDED: true, // .js - full-version
	ESLINT: true, // enable eslint
	FORMAT: true, // enable format code
	BEAUTIFY: true, // enable beautify code
	NOTIFY_END_COMPILE: true, // notify end compile typescript
};

const onError = createNotify("error", {
	title: "TypeScript",
	message: "Ошибка компиляции!",
	sound: true,

	IS_DEBUG: true,
});

const notifyCompile = createNotify("info", {
	title: "TypeScript",
	message: "Конец компиляции!",
	subtitle: "Подзагаловок",
	sound: "Frog",
});

module.exports = () =>
	gulp
		.src(`${src.js}/**/*.ts`)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(tsProject(tsconfig))
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
						"linebreak-style": 0,
					},
				})
			)
		)
		.pipe(gulpif(CONFIG.FORMAT, eslint.format()))
		.pipe(eslint.failAfterError())
		.pipe(gulpif(CONFIG.BEAUTIFY, gulpBeautify.js(beautify.js)))
		.pipe(gulpif(CONFIG.EXPANDED, gulp.dest(build.js)))
		.pipe(gulpif(CONFIG.MINIFIED, terser()))
		.pipe(gulpif(CONFIG.MINIFIED, rename({ suffix: ".min" })))
		.pipe(gulpif(CONFIG.MINIFIED, gulp.dest(build.js)))
		.pipe(gulpif(CONFIG.NOTIFY_END_COMPILE, notifyCompile));
