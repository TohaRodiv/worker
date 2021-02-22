const gulp = require("gulp");
const { build, src, order, } = require ("./../config");
const concat = require ("gulp-concat");
const terser = require ("gulp-terser");
const rename = require("gulp-rename");
const gulpOrder = require ("gulp-order");


module.exports = () =>
	gulp
		.src (`${src.js}/*.js`)
		.pipe (gulpOrder (order.js))
		.pipe (concat ("all.js"))
		.pipe (gulp.dest (build.js))
		.pipe (terser ())
		.pipe (rename ({ suffix: ".min" }))
		.pipe (gulp.dest (build.js));