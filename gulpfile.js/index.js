const { src, dest, series, parallel, } = require("gulp");
const imagemin = require("gulp-imagemin-fix");
const gm = require("gulp-gm");

const clean = require ("./tasks/clean");
const imageMinify = require ("./tasks/imageMinify");
const tinypngCompress = require ("./tasks/tinypngCompress");

const webpToPng = require ("./tasks/webpToPng");
const toWebp = require ("./tasks/toWebp");
const toJpeg2000 = require ("./tasks/toJpeg2000");



function convertToJpg() {
	return src(path.src.img)
		.pipe(gm(gmfile => {
			return gmfile.compress("JPEG");
		}))
		.pipe(gm(gmfile => {
			return gmfile.setFormat("jpeg");
		}))
		.pipe(gm(gmfile => {
			return gmfile.quality(70); // todo: change quality
		}))
		.pipe(dest(path.dist.img));
}


/**
 * TODO
 * Если мод "production", режим сборки (по умолчанию),
 * если мод "development", режим разработки с live-сервером
 */
if (process.env.NODE_ENV === 'production') {
	// exports.build = series(transpile, minify);

} else {
	exports["imagemin"] = parallel (imageMinify);
	exports["tinypng"] = parallel (tinypngCompress);
	exports["webp-to-png"] = parallel (webpToPng);
	exports["to-webp"] = parallel (toWebp);
	// exports["to-jpeg2000"] = parallel (toJpeg2000);
}	