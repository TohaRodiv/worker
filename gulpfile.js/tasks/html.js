const gulp = require("gulp");
const { build, src, } = require ("./../config");
const include = require ("gulp-file-include");
const ignore = require("gulp-ignore");
const validator = require("gulp-w3c-html-validator");
const beautify = require("gulp-html-beautify");


const EXCLUDE_INC_FILE = "**/*.inc.html";
const EXCLUDE_INC_DIR = "inc/**/*";


module.exports = () =>
	gulp
		.src (`${src.html}/**/*.html`)
		.pipe (include ({
			prefix: "@",
		}))
		.pipe (ignore.exclude (EXCLUDE_INC_FILE))
		.pipe (ignore.exclude (EXCLUDE_INC_DIR))
		.pipe (validator ())
		.pipe (validator.reporter ())
		.pipe (beautify (
			{
				"indent_size": 1,
				"indent_char": "	",
				"eol": "\n",
				"indent_level": 0,
				"indent_with_tabs": true,
				"preserve_newlines": true,
				"max_preserve_newlines": 10,
				"jslint_happy": false,
				"space_after_anon_function": false,
				"brace_style": "collapse",
				"keep_array_indentation": false,
				"keep_function_indentation": false,
				"space_before_conditional": true,
				"break_chained_methods": false,
				"eval_code": false,
				"unescape_strings": false,
				"wrap_line_length": 0,
				"wrap_attributes": "auto",
				"wrap_attributes_indent_size": 4,
				"end_with_newline": false
			}
		))
		.pipe (gulp.dest (build.html));