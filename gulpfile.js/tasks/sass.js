const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
// const sourcemaps = require("gulp-sourcemaps");
const shorthand = require("gulp-shorthand");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const { build, src, } = require ("../config");


module.exports = () =>
	gulp
		.src(`${src.sass}/**/*.{sass,scss}`)
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(shorthand())
		.pipe (gulp.dest(build.css))
		.pipe(cleanCSS({
			debug: true,
			compatibility: "*"
		}, details => {
			console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`);
		}))
		// .pipe(sourcemaps.write())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(build.css));