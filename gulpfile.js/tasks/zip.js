const archiver = require("gulp-zip");
const { build, root, } = require ("./../config");
const gulp = require("gulp");
const path = require("path");


module.exports = () => 
	gulp
		.src (`${build.root}/*`)
		.pipe (archiver (`${path.basename (build.root)}.zip`))
		.pipe (gulp.dest (root));