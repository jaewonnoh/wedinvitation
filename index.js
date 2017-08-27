const 
	express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	compiler = webpack(require(path.join(__dirname, './wpconfig/webpack.config.js')));

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

app.get('/web-only',  (req, res) => {
	res.sendFile(path.join(__dirname, './src/web-only.html'));
});

app.use('/src', express.static(__dirname + '/src'));

server.listen(80,  () => {
  console.log('JW\'s app listening on port 80!');
});