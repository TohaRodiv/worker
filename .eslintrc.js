module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2020": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
	],
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 11,
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true
		}
	},
	"plugins": [],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"space-infix-ops": 2,
		"space-in-parens": 2,
		"no-multi-spaces": 2,
		"semi-spacing": 2,
		"no-multiple-empty-lines": 2,
	}
};
