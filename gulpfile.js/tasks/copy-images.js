const { src, build } = require("./../config");
const gulp = require("gulp");
const del = require("del");

module.exports = () => {
	del(build.img);
	return gulp
		.src(`${src.img}/**/*.{png,jpg,jpeg,gif,svg,webp}`)
		.pipe(gulp.dest(build.img));
};
