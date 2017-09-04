var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//environment config
var port = process.env.PORT || 3000;

//Dabase connection
var db = mongoose.connect('mongodb://mongodb/bookapi');
var Book = require('./models/bookModel');

//App configuration
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Routes
bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books',bookRouter);

//connection handler
app.listen(port,function(){
	console.log('Running on port '+port);
});
