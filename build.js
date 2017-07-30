let webpack = require('webpack'),
	webpackConfig = require('./wpconfig/webpack.config.js');

console.log('  Build start.\n');

webpack(webpackConfig, (err, stats) => {
	if (err) throw err
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n\n')

	console.log('  Build complete.\n');
});
