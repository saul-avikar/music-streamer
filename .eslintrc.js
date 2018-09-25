// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	"rules": {
		// disallow single quotes
		"quotes": ["error", "double"],
		// force semi-colons
		"semi": ["error", "always"],
		// allow tabs
		"no-tabs": [0],
		// use tab indentation
		"indent": ["error", "tab", {"SwitchCase": 1}],
		// allow paren-less arrow functions
		"arrow-parens": 0,
		// allow async-await
		"generator-star-spacing": 0,
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
	}
}
