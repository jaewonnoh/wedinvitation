const 
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: [
		path.join(__dirname, '../src/entry.js'),
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
	],
	output: {
		filename: 'src/bundle.js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [[
						'env', {
							targets: {
							browsers: ['last 2 versions']
							}
						}
					]]
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					preserveWhitespace: false,
					loaders: {
						js: 'babel-loader'
					}
				}
			}
		]
	}
};
