const gulp = require ("gulp");
const { build, src, order, } = require ("./../config");
const concat = require ("gulp-concat-css");
const rename = require("gulp-rename");
const clean = require ("gulp-clean-css");
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
		.src (`${src.css}/*.css`)
		.pipe (plumber ({ errorHandler: onError }))
		.pipe (gulpOrder (order.css))
		.pipe (concat ("all.css"))
		.pipe (gulp.dest (build.css))
		.pipe (clean ({
			debug: true,
			compatibility: "*"
		}))
		.pipe (rename ({ suffix: ".min" }))
		.pipe (gulp.dest (build.css));