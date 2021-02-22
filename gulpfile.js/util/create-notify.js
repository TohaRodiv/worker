const notify = require("gulp-notify");
const { root } = require("./../config");
const path = require("path");

/**
 * @function createNotify
 * @param {string} type - type notify
 * @param {object} options - options for notify
 * @return {function} - configured notify
 */
function createNotify(type, options = {}) {
	if ("error" === type) {
		return function (err) {
			options.isDebug && console.log (err);
			const error = {
				plugin: options.paramNames?.plugin ? err[options.paramNames.plugin] : "",
				title: options.paramNames?.title ? err[options.paramNames.title] : "",
				file: options.paramNames?.file ? err[options.paramNames.file] : "",
				msg: options.paramNames?.msg ? err[options.paramNames.msg] : "",
			};

			notify.onError({
				title: `${error.plugin}: ${options.title || "ошибка!"}`,
				message: `${error.file
					.toString()
					// eslint-disable-next-line no-useless-escape
					.replace(new RegExp(".*?.{1}" + path.basename(root)), "")} - ${error.msg}`,
				sound: options.sound || false,
			})(err);
			this.emit("end");
		};
	}
}

module.exports = createNotify;
