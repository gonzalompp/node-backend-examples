var express = require('express');

var routes = function(Book) {
	var bookRouter = express.Router();

	bookRouter.route('/')
		.post(function(req,res) {
			var book = new Book(req.body);

			book.save();
			//created status
			res.status(201).send(book);
		})
		.get(function(req,res) {

			var query = {};

			if (req.query.genre)
				query.genre = req.query.genre;

			Book.find(query, function(err,books) {
				if (err)
					res.status(500).send(err);
				else {
					res.json(books);
				}
			});
		});

	//Middleware for find the book first that will be used in the GET and PATCH
	bookRouter.use('/:bookId', function(req,res,next) {
		Book.findById(req.params.bookId, function(err,book) {
			if (err)
				res.status(500).send(err);
			else if (book) {
				req.book = book;

				//Go to the next Middleware or Route operation
				next();
			} else {
				//book not found
				res.status(404).send('Book not found');
			}
		});
	});
	bookRouter.route('/:bookId')
	.get(function(req,res) {
		res.json(req.book);
	})
	.put(function(req,res) {
		let book = req.book;

		book.title = req.body.title;
		book.author = req.body.author;
		book.genre = req.body.genre;
		book.read = req.body.read;
		book.save();

		res.json(book);
	})
	.patch(function(req,res){
		if (req.body._id)
			delete req.body._id;

		let book = req.book;

		for (var p in req.body)
			book[p] = req.body[p];

		book.save();
		res.json(book);
	});

	return bookRouter;
};

module.exports = routes;
