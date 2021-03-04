const notify = require("gulp-notify");

/**
 * @function createNotify
 * @param {string} type - type notify
 * @param {object} options - options for notify
 * @return {function} - configured notify
 */
function createNotify(type, options = {}) {
	switch (type) {
	case "error":
		return function (err) {
			options.IS_DEBUG && console.log(err);

			notify.onError(options)(err);
			this.emit("end");
		};

	case "info":
		return notify(options);
	}
}

module.exports = createNotify;
