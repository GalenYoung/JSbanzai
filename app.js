var express = require('express');
var path = require('path');
var routes = require('./routes/routes');
var app = express();

app.set('views/**/', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use('/', routes);

var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
});