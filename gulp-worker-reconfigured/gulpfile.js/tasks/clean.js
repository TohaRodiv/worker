const del = require("del");
const { build } = require ("./../config");


module.exports = () => del (build.root);