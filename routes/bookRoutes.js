var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../server/models/');

router.use(bodyParser.urlencoded({ extended: true }));

router.use(function timeLog (req, res, next) {
	next();
});

// define the home page route
router.get('/', function(req, res) {
	models.Book.findAll({}).then(function(books) {
		
		res.render('pages/books/index', {books: books});
	});
});

// define the about route
router.get('/about', function(req, res) {
	res.send('About books');
});


// define book save
router.post('/save', function(req, res) {
	var data = req.body;
	if (data.id) {
		// update
		models.Book.find({
			where: {
				id: data.id
			}
		}).then(function(book) {
			if (book) { // Checks whether book id found our not
				book.updateAttributes({
					title: data.title,
					description: data.description,
					author: data.author,
					quantity: data.quantity
				}).then(function(bookUpdate) {
					if (bookUpdate) {
						res.json({
							type: 'update',
							result: true,
							message:'Successfully updated book # ' + data.id,
							row: createRow(bookUpdate)
						});
					} else {
						res.json({type: 'update', result: false, message:'Internal Server Error'});
					}
				});
			} else {
				res.json({type: 'update', result: false, message:'Book # ' + data.id + 'not found'});
			}
		});
	} else {
		// insert
		models.Book.create({
			title: data.title,
			description: data.description,
			author: data.author,
			quantity: data.quantity,
			user_id: 1 // static as of now
		}).then(function(result) {
			if (result) {
				res.json({
					type: 'create',
					result: true,
					message: 'You have successfully created new book man!',
					row: "<tr data-book-row='"+result.id+"'>" + createRow(result) + "</tr>"
				});
			} else {
				res.json({
					type: 'create',
					result: false,
					message: 'Internal Server Error'
				});
			}
		});
	}
});

// define book delete
router.delete('/:id', function(req, res) {
	models.Book.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(book) {
		if (book) {
			res.json({
				type: 'delete',
				result: true,
				message: 'Successfully deleted book # ' + req.params.id
			});
		} else {
			res.json({
				type: 'delete',
				result: false,
				message: 'Server Internal Error'
			});
		}
	});
});

// Define view detail
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	if (isNaN(id)) {
		next();
	} else {
		models.Book.find({
			where: {
				id: id
			}
		}).then(function(book) {
			if (book) {
				res.render('pages/books/detail', {book:book});
			} else {
				res.send('No book found');
			}
		});
	}
});


function createRow(bookData) {
	var strRow = "<td class='book-row-id'>"+bookData.id+"</td>"+
								"<td class='book-row-title'><a href='/books/"+bookData.id+"'><p>"+bookData.title+"</p></a></td>" +
								"<td class='book-row-description'>"+bookData.description+"</td>" + 
								"<td class='book-row-author'>"+bookData.author+"</td>" +
								"<td class='book-row-quantity'>"+bookData.quantity+"</td>" +
								"<td><button data-book-id="+bookData.id+" class='delete-book btn btn-xs btn-danger'>remove</button>" +
								"<button data-book-id="+bookData.id+" class='edit-book btn btn-xs btn-success'>edit</button></td>";
	return strRow;
}

module.exports = router;