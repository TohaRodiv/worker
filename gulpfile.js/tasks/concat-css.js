const gulp = require ("gulp");
const { build, src,} = require ("./../config");
const concat = require ("gulp-concat-css");
const rename = require("gulp-rename");
const clean = require ("gulp-clean-css");


module.exports = () =>
	gulp
		.src (`${src.css}/*.css`)
		.pipe (concat ("all.css"))
		.pipe (gulp.dest (build.css))
		.pipe (clean ({
			debug: true,
			compatibility: "*"
		}))
		.pipe (rename ({ suffix: ".min" }))
		.pipe (gulp.dest (build.css));