var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// routes
var books = require('./routes/bookRoutes');
var auths = require('./routes/authRoutes');
var user = require('./routes/userRoutes');

app.use('/books', books);
app.use('/auth', auths);
app.use('/user', user);

// Database
// var userDB = require('./models');

// for templates
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// use on statics
app.use(express.static('node_modules'));
app.use(express.static('public'));


// middleware application
// app.use('/user/:id', function(req, res, next) {
//   console.log('Request URL:', req.originalUrl);
//   next();
// }, function (req, res, next) {
//   console.log('Request Type:', req.method);
//   next();
// });

// app.get('/user/:id', function(req, res, next) {
// 		console.log('Request Type:', req.method);
// 		res.send('USER');
// });



app.get('/', function (req, res) {
	var response = 'Hello ';
	res.render('pages/landing/index');
	// res.send(response + ' ' + req.requestTime2);
});

// Handling erros
function logErros(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({error: 'Something failed'});
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', {error: err});
}

app.use(logErros);
app.use(clientErrorHandler);
app.use(errorHandler);


app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

