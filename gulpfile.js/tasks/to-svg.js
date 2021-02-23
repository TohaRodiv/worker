const toSvg = require("gulp-img2svg");
const { src, build, } = require ("./../config");
const gulp = require("gulp");

/**
 * {@link https://www.npmjs.com/package/gulp-img2svg}
 * {@link https://www.npmjs.com/package/potrace}
 */
module.exports = () => 
	gulp
		.src (`${src.img}/**/*.{png,jpg,bmp}`)
		.pipe (toSvg ())
		.pipe (gulp.dest (build.img));