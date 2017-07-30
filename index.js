let express = require('express'),
	app = express(),
	server = require('http').createServer(app);

app.get('/',  (req, res) => {
	res.sendfile('./src/index.html');
});

server.listen(8080,  () => {
  console.log('Example app listening on port 80!');
});
