const path = require("path");
const concatOrder = require("./concat-order.config");
const beautifyConfig = require("./beautifyrc.json");

const root = path.join(__dirname, "../");
const build_dir = path.join(root, "build");
const src_dir = path.join(root, "src");

const sourceFiles = {
	root: src_dir,
	img: path.join(src_dir, "images"),
	html: path.join(src_dir, "html"),
	pug: path.join(src_dir, "pug"),
	css: path.join(src_dir, "css"),
	sass: path.join(src_dir, "sass"),
	js: path.join(src_dir, "js"),
};

const config = {
	/**
	 * Tinypng api-key
	 */
	TINYPNG_API_KEY: ["gPC3S4MSYBxXtsYwQV8KTrlkSgW3p086"][0],
	/**
	 * Root dir
	 */
	root,
	/**
	 * Lighthouse report
	 */
	report: path.join(build_dir, "lighthouse-report"),
	/**
	 * Concat order config
	 */
	order: concatOrder,
	/**
	 * Config gulp-beautify
	 */
	beautify: beautifyConfig,
	/**
	 * Build folder
	 */
	build: {
		root: build_dir,
		img: path.join(build_dir, "images"),
		html: build_dir,
		css: path.join(build_dir, "css"),
		js: path.join(build_dir, "js"),
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
			glob: `${sourceFiles.sass}/**/*.{sass,scss}`,
			options: {},
			watch: ["sass"],
			stream: true,
		},
		{
			enable: true,
			glob: `${sourceFiles.js}/**/*.js`,
			options: {},
			watch: ["script"],
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
			watch: ["imageMinify"],
			parallel: true,
		},
	],
	/**
	 * Tasks for building project
	 */
	buildTasks: {
		series: ["clean"],
		parallel: ["pug", "sass", "script", "tinypngCompress"],
	}
};

module.exports = config;
