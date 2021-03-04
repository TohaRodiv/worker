const path = require("path");
const concatOrder = require("./concat-order.config");
const beautifyConfig = require("./beautifyrc.json");
const jsdocConfig = require("./jsdocConfig.json");

const root = path.join(__dirname, "../");
const build_dir = path.join(root, "build");
const src_dir = path.join(root, "src");

const sourceFiles = {
	root: src_dir,
	img: path.join(src_dir),
	html: path.join(src_dir),
	pug: path.join(src_dir),
	css: path.join(src_dir),
	sass: path.join(src_dir),
	js: path.join(src_dir),
	doc: path.join(src_dir),
	encoding: path.join(src_dir),
};

const config = {
	/**
	 * Tinypng api-key
	 */
	TINYPNG_API_KEY: ["YOUR-API-KEY-TINYPNG"][0],
	/**
	 * Root dir
	 */
	root,
	/**
	 * Lighthouse report
	 */
	report: path.join(build_dir, "lighthouse-report"),
	/**
	 * tsconfig.json file path
	 */
	tsconfig: path.join (root, "gulpfile.js", "tsconfig.json"),
	/**
	 * Concat order config
	 */
	order: concatOrder,
	/**
	 * Config gulp-beautify
	 */
	beautify: beautifyConfig,
	/**
	 * JSDoc config
	 */
	jsdocConfig: jsdocConfig,
	/**
	 * Build folder
	 */
	build: {
		root: build_dir,
		img: path.join(build_dir),
		html: build_dir,
		css: path.join(build_dir),
		js: path.join(build_dir),
		encoding: path.join(build_dir),
	},
	/**
	 * Source folder
	 */
	src: sourceFiles,
	/**
	 * Watching folders/files
	 */
	watch: [
		{
			enable: true,
			glob: `${sourceFiles.pug}/**/*.pug`,
			options: {},
			watch: ["pug"],
			stream: true,
		},
		{
			enable: true,
			glob: `${sourceFiles.sass}/**/*.{scss,sass}`,
			options: {},
			watch: ["sass"],
			stream: false,
		},
		{
			enable: true,
			glob: `${sourceFiles.js}/**/*.js`,
			options: {},
			watch: ["js"],
			stream: true,
		},
		{
			enable: true,
			glob: `${sourceFiles.js}/**/*.ts`,
			options: {},
			watch: ["ts"],
			stream: true,
		},
		{
			enable: true,
			glob: `${sourceFiles.img}/**/*.{png,jpg,jpeg,svg,webp,gif}`,
			options: {},
			watch: ["copy-images"],
			notReload: true,
		},
		{
			enable: false,
			glob: `${sourceFiles.img}/**/*.{png,jpg,jpeg,svg,webp}`,
			options: {},
			watch: ["imagemin"],
			parallel: true,
		},
	],
	/**
	 * Tasks for building project
	 */
	buildTasks: {
		series: ["clean"],
		parallel: ["pug", "sass", "js"],
	}
};

module.exports = config;
