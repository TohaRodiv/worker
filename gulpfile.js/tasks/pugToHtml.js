const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const pugLinter = require("gulp-pug-linter");
const htmlValidator = require("gulp-w3c-html-validator");
const bemValidator = require("gulp-html-bem-validator");
const beautify = require("gulp-html-beautify");
const createNotify = require("./../util/create-notify");
const { build, src } = require("./../config");

const onError = createNotify("error", {
	title: "ошибка компиляции!",
	sound: true,

	paramNames: {
		plugin: "plugin",
		title: "title",
		msg: "msg",
		file: "filename",
	},

	isDebug: true,
});

module.exports = () =>
	gulp
		.src(`${src.pug}/**/*.pug`)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(pugLinter({ reporter: "default" }))
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(htmlValidator())
		.pipe(bemValidator())
		.pipe(
			beautify({
				indent_size: 1,
				indent_char: "	",
				eol: "\n",
				indent_level: 0,
				indent_with_tabs: true,
				preserve_newlines: true,
				max_preserve_newlines: 10,
				jslint_happy: false,
				space_after_anon_function: false,
				brace_style: "collapse",
				keep_array_indentation: false,
				keep_function_indentation: false,
				space_before_conditional: true,
				break_chained_methods: false,
				eval_code: false,
				unescape_strings: false,
				wrap_line_length: 0,
				wrap_attributes: "auto",
				wrap_attributes_indent_size: 4,
				end_with_newline: false,
			})
		)
		.pipe(gulp.dest(build.html));
