// const config = require("./../config");
const gulp = require("gulp");

const include = (taskName) => require(`./${taskName}`);

const parallelTasks = ["pug", "sass", "script", "tinypngCompress"].map((task) =>
	include(task)
);

const seriesTasks = ["clean"].map((task) => include(task));

module.exports = gulp.series(seriesTasks, gulp.parallel(parallelTasks));
