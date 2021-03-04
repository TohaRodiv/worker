const { watch, series, parallel } = require("gulp");
const config = require("./../config");

module.exports = (createServer = null) => () => {
	const tasks = [];
	let server = null;

	let configWatch = config.watch.filter((item) => true === item.enable);

	configWatch = configWatch.map((item) => {
		item.watch = item.watch.map((watch) => require(`./${watch}`));
		return item;
	});

	/**
	 * TODO: Check parallel work.

	 * ? Parallel is work ?
	 */
	configWatch.forEach((item) => {
		if (item.parallel) {
			item.watch.forEach((watch) => {
				tasks.push(parallel(watch));
			});
		} else {
			tasks.push(...item.watch);
		}
	});

	if (null !== createServer) {
		
		tasks.push(() => {
			server = createServer();
		});
	}

	series(tasks)();

	configWatch.forEach((item) => {
		const tasks = item.watch.map((task) => {
			if (item.stream && createServer) {
				return () => task().pipe(server.stream());
			} else {
				return task;
			}
		});

		watch(item.glob, item.options, ...tasks).on("change", () => {
			if (!item.stream && !item.notReload && null !== server) {
				server.reload();
			}
		});
	});
};
