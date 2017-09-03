var express = require('express');

var app = express();

//environment config
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send('Welcome to the Backend API');
});

//connection handler
app.listen(port,function(){
	console.log('Gulp is running on port '+port);
});
