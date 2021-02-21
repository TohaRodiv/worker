const { series, parallel, } = require("gulp");

const clean = require("./tasks/clean");
const imageMinify = require("./tasks/imageMinify");
const tinypngCompress = require("./tasks/tinypngCompress");

const webpToPng = require("./tasks/webpToPng");
const toWebp = require("./tasks/toWebp");

const lighthouse = require("./tasks/lighthouse");


const setMode = isProduction => cb => {
	process.env.NODE_ENV = isProduction ? "production" : "development";
	cb();
};

exports["dev"] = series(setMode (false));
exports["build"] = series(setMode(true), clean);


exports["imagemin"] = parallel(imageMinify);
exports["tinypng"] = parallel(tinypngCompress);
exports["webp-to-png"] = parallel(webpToPng);
exports["to-webp"] = parallel(toWebp);
module.exports["lighthouse"] = series(lighthouse);