const del = require("del");
const { dist_dir } = require("./../config");


module.exports = function clean (cb) {
	return del (dist_dir).then(() => {
		cb ();
	})
};