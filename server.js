var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var session = require('express-session');

var app = express();

// Session
var sessionOption = session(config.session);
app.use(sessionOption);


// routes
var books = require('./routes/bookRoutes');
var auths = require('./routes/authRoutes');
var user = require('./routes/userRoutes');

// for templates
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// use on statics
app.use(express.static('node_modules'));
app.use(express.static('public'));


// middleware application
var checkAuth = function(req, res, next) {
	if (req.session.authUser) {
		// userID = req.session.authUser.id;
		next();
	} else {
		res.redirect('/auth/login');
	}
};

app.use('/user/', checkAuth);
app.use('/books/', checkAuth);

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


// Set local variables // can be access to views
global.siteTitle = 'MyBook';
global.siteDescription = 'A portal for the collection of your books';
global.siteCopy = 'Copyright © '+siteTitle+' 2015';
global.authorName = 'Nichole John Martinez';
global.authorContact = 'xinmartinez@gmail.com';


// use other routes
app.use('/books', books);
app.use('/auth', auths);
app.use('/user', user);

app.get('/', function (req, res) {
	var response = 'Hello ';
	res.render('pages/landing/index');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

