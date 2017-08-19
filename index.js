const 
	express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	cors = require('cors')(),
	webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	compiler = webpack(require(path.join(__dirname, './wpconfig/webpack.config.js')));

app.use(cors);

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: '/',
	stats: { colors: true },
	watchOptions: {
		aggregateTimeout: 300,
		poll: true
	}
}));

app.use(webpackHotMiddleware(compiler));

app.get('/',  (req, res) => {
	res.sendFile(path.join(__dirname, './src/index.html'));
});

app.use('/src', express.static(__dirname + '/src'));

server.listen(80,  () => {
  console.log('Example app listening on port 80!');
});