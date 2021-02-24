const { build, src, beautify } = require("./../config");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const shorthand = require("gulp-shorthand");
const autoprefixer = require("gulp-autoprefixer");
const gulpBeautify = require("gulp-beautify");
const rename = require("gulp-rename");
const gulpif = require("gulp-if");
const createNotify = require("./../util/create-notify");
const ignore = require("gulp-ignore");
const include = require("gulp-include");

const CONFIG = {
	SOURCEMAP: false,
	MINIFIED: true, // !disable for fix bug autoreload browser, not include *.min.css - not working!
	INCLUDE: true,
};

const EXCLUDE_INC_FILE = "_*.css";
const EXCLUDE_INC_DIR = "inc/**/*";

const onError = createNotify("error", {
	title: "ошибка компиляции!",
	sound: true,
	paramNames: {
		plugin: "plugin",
		title: "title",
		msg: "messageOriginal",
		file: "file",
	},

	isDebug: true,
});

module.exports = () =>
	gulp
		.src(`${src.css}/**/*.css`)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(gulpif(CONFIG.SOURCEMAP && CONFIG.MINIFIED, sourcemaps.init()))
		.pipe(
			gulpif(
				CONFIG.INCLUDE,
				include()
			)
		)
		.pipe(
			cleanCSS(
				{
					debug: true,
					compatibility: "*",
					level: {
						2: {
							mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
							mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
							mergeMedia: true, // controls `@media` merging; defaults to true
							mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
							mergeSemantically: false, // controls semantic merging; defaults to false
							overrideProperties: true, // controls property overriding based on understandability; defaults to true
							removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
							reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
							removeDuplicateFontRules: true, // controls duplicate `@font-face` removing; defaults to true
							removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
							removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
							removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
							restructureRules: false, // controls rule restructuring; defaults to false
							skipProperties: [], // controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
						},
					},
				},
				(details) => {
					console.log(
						`${details.name}: Original size:${details.stats.originalSize}`
					);
				}
			)
		)
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(shorthand())
		.pipe(gulpBeautify.css(beautify.css))
		.pipe(ignore.exclude(EXCLUDE_INC_FILE))
		.pipe(ignore.exclude(EXCLUDE_INC_DIR))
		.pipe(gulp.dest(build.css))
		.pipe(
			cleanCSS(
				{
					debug: true,
					compatibility: "*",
					level: {
						2: {
							all: true,
						},
					},
				},
				(details) => {
					console.log(
						`${details.name}: Minified size: ${details.stats.minifiedSize}`
					);
				}
			)
		)
		.pipe(gulpif(CONFIG.SOURCEMAP && CONFIG.MINIFIED, sourcemaps.write()))
		.pipe(gulpif(CONFIG.MINIFIED, rename({ suffix: ".min" })))
		.pipe(gulpif(CONFIG.MINIFIED, gulp.dest(build.css)));
