let path = require('path');
let routes = require('./routes/routes');
let express = require("express");
let app = express();

app.set('views/**/', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use('/', routes)

let server = app.listen(8080,function(){
	let host = server.address().address;
	let port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
});