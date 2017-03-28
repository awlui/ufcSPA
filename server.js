var express = require('express');
var http = require('http');
var logger = require('morgan');
var path = require('path');
var app = express();
var api = require('./src/api/index.js');
var port = process.env.PORT || 3000;
app.set('port', port);
app.use(logger('dev'));

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(api);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('Running on port: ' + app.get('port'));
});
