const { buildTasks } = require("./../config");
const gulp = require("gulp");

const include = (taskName) => require(`./${taskName}`);

const parallelTasks = buildTasks.parallel.map((task) => include(task));
const seriesTasks = buildTasks.series.map((task) => include(task));

module.exports = gulp.series(seriesTasks, gulp.parallel(parallelTasks));
