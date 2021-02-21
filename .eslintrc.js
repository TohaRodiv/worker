module.exports = {
	"env": {
		"browser": false,
		"commonjs": true,
		"es2021": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
	],
	"parserOptions": {
		"ecmaFeatures": {},
		"ecmaVersion": 12
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
		]
	}
};
