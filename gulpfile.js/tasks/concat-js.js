const gulp = require("gulp");
const { build, src, order, } = require ("./../config");
const concat = require ("gulp-concat");
const terser = require ("gulp-terser");
const rename = require("gulp-rename");
const gulpOrder = require ("gulp-order");
const createNotify = require("./../util/create-notify");
const plumber = require ("gulp-plumber");

const onError = createNotify("error", {
	title: "ошибка конкатенации!",
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


module.exports = () =>
	gulp
		.src (`${src.js}/*.js`)
		.pipe (plumber ({ errorHandler: onError }))
		.pipe (gulpOrder (order.js))
		.pipe (concat ("all.js"))
		.pipe (gulp.dest (build.js))
		.pipe (terser ())
		.pipe (rename ({ suffix: ".min" }))
		.pipe (gulp.dest (build.js));