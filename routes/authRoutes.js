var express = require('express');
var authRoute = express.Router();
var bodyParser = require('body-parser');
var models = require('../server/models/');
var console = require('../config');

authRoute.use(bodyParser.urlencoded({ extended: true }));

// Middleware for alreadyLogin
var isLogin = function(req, res, next) {
	if (req.session.authUser) {
		res.redirect('/books/');
	} else {
		next();
	}
}

//auth login
authRoute.get('/login', isLogin, function(req, res) {
		res.render('pages/auth/login');
});

authRoute.post('/login', isLogin, function(req, res) {
		models.User.find({
			where: {
				username: req.body.username,
				password: req.body.password
			}
		}).then(function(user) {
			var data = {};
			if (user) {
				req.session.authUser = user;
				data = {result:true};
			} else {
				data = {result:false};
			}
			res.json(data);
		});
});


// auth register
authRoute.get('/register', isLogin, function(req, res) {
	res.render('pages/auth/register');
});

authRoute.post('/register', isLogin, function(req, res) {
	models.User.create({
		username: req.body.username,
		password: req.body.password,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		status: true
	}).then(function(user) {
		res.render('pages/auth/register_complete');
	});
});

// Logout
authRoute.get('/logout', function(req, res) {
	req.session.authUser = null;
	res.render('pages/auth/logout');
});

module.exports = authRoute;