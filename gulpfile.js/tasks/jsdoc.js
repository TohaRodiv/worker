const jsdoc = require("gulp-jsdoc3");
const { root, } = require ("./../config");
const gulp = require("gulp");


module.exports = () => 
	gulp
		.src ([`${root}README.md`, `${root}/gulpfile.js/index.js`], {read: false})
		.pipe (jsdoc ());