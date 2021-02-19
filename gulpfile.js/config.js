/**
 * @const dist - папка с результатом работы
*/
const dist_dir = "dist";
/**
 * @const src - папка с исходниками
*/
const src_dir = "src";
/**
 * @const config - настройки и пути до файлов
*/
 const config = {
	TINYPNG_API_KEY: "gPC3S4MSYBxXtsYwQV8KTrlkSgW3p086",
	dist_dir,
	src_dir,

	dist: {
		img: `${dist_dir}/img`,
	},

	src: {
		img: {
			all: `${src_dir}/img/**/*.{gif,png,jpg,jpeg,svg,webp}`,
			webp: `${src_dir}/img/**/*.webp`,
			to_webp: `${src_dir}/img/**/*.{png,jpeg,tiff,webp}`,
			to_jpeg2000: `${src_dir}/img/**/*.{jpg,jpeg,png}`
		}
	},

	watch: {},
};

module.exports = config;