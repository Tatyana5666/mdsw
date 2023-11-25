module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{html,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};