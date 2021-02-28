const gulp = require("gulp");
const { src, build, tsconfig } = require("./../config");
const tsProject = require("gulp-typescript");


module.exports = () =>
	gulp
		.src(`${src.js}/**/*.ts`)
		.pipe(tsProject(tsconfig))
		.pipe(gulp.dest(build.js));
