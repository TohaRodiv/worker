const { build, src, } = require("./../config");
const gulp = require("gulp");
const convert = require("gulp-convert-encoding");

const CONFIG = {
	FROM: "windows1251",
	TO: "utf8",
};

/**
 * {@link https://github.com/heldinz/gulp-convert-encoding#readme}
 * Decoding: BOM is stripped by default
 * Encoding: No BOM added
 */
module.exports = () =>
	gulp
		.src(`${src.encoding}/**/*`)
		.pipe (convert ({
			from: CONFIG.FROM,
			to: CONFIG.TO,
		}))
		.pipe(gulp.dest(build.encoding));
