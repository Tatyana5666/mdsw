module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,png,html,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};