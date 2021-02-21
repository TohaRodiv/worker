const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const pugLinter = require("gulp-pug-linter");
/**
 * !TODO: fix problem with gulp-w3c-html-validator
 */
//const htmlValidator = require("gulp-w3c-html-validator");
const bemValidator = require("gulp-html-bem-validator");
const { build, src, } = require("./../config");

module.exports = () =>
	gulp
		.src(`${src.pug}/**/*.pug`)
		.pipe(plumber())
		.pipe(pugLinter({ reporter: "default" }))
		.pipe(pug({
			pretty: true
		}))
		// .pipe(htmlValidator()) //! fix
		.pipe(bemValidator())
		.pipe(gulp.dest(build.html));