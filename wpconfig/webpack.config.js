let path = require('path')

module.exports = {
	entry: {
		app: path.join(__dirname, '..', '/src/entry.js')
	},
	output: {
		filename: 'src/bundle.js'
	},
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
					loaders: {
						js: 'babel-loader'
					}
				}
			}
		]
	}
};
