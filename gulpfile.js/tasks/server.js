const server = require("browser-sync").create();
const config = require("./../config");

/**
 * {@link https://browsersync.io/docs/options}
 */
module.exports = () => {
	server.init({
		server: config.build.root,
		notify: false,
		// Can be true, local, external, ui, ui-external, tunnel or false
		open: true,
		cors: true,
		tunnel: false,
		online: false,
	});
	return server;
};
