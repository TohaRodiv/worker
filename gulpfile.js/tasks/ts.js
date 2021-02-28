const gulp = require("gulp");
const { src, build } = require("./../config");
const typescript = require("gulp-typescript");

const CONFIG_TS = {};

module.exports = () =>
	gulp
		.src(`${src.js}/**/*.ts`)
		.pipe(typescript(CONFIG_TS))
		.pipe(gulp.dest(build.js));
