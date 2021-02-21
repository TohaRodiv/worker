const { build, src, } = require ("./../config");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const beautify = require("gulp-beautify");


module.exports = () => 
	gulp
		.src ([`${src.js}/**/*.js`])
		.pipe(eslint({
			fix: true,
			/**
			 * 0 - disable
			 * 1 - warning
			 * 2 - error
			 */
			rules: {
				"no-undef": 1,
				"no-unused-vars": 1,
				"no-mixed-spaces-and-tabs": 1,
			}
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe (beautify.js (
			{
				"indent_size": 1,
				"indent_char": "	",
				"indent_level": 0,
				"end-with-newline": true,
				"indent_with_tabs": false,
				"preserve_newlines": true,
				"max_preserve_newlines": 10,
				"jslint_happy": false,
				"space_after_anon_function": false,
				"brace_style": "collapse,preserve-inline",
				"keep_array_indentation": false,
				"keep_function_indentation": false,
				"space_before_conditional": true,
				"break_chained_methods": false,
				"eval_code": false,
				"unescape_strings": false,
				"wrap_line_length": 0,
			}
		))
		.pipe (gulp.dest (build.js))
		.pipe (terser ())
		.pipe(rename({ suffix: ".min" }))
		.pipe (gulp.dest (build.js));