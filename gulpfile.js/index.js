const { series, parallel, } = require("gulp");

const clean = require("./tasks/clean");

const imageMinify = require("./tasks/imageMinify");
const tinypngCompress = require("./tasks/tinypngCompress");
const toWebp = require("./tasks/toWebp");

const lighthouse = require("./tasks/lighthouse");

const pugToHtml = require("./tasks/pugToHtml");


const setMode = isProduction => cb => {
	process.env.NODE_ENV = isProduction ? "production" : "development";
	cb();
};

exports["dev"] = series(setMode (false), clean);
// exports["build"] = series(setMode(true), clean);


exports["imagemin"] = parallel(imageMinify);
exports["tinypng"] = parallel(tinypngCompress);
exports["to-webp"] = parallel(toWebp);
exports["lighthouse"] = series(lighthouse); // todo: check work
exports["pug"] = series (pugToHtml);