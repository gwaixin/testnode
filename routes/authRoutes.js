var express = require('express');
var authRoute = express.Router();
var bodyParser = require('body-parser');
var models = require('../server/models/');
var jwt    = require('jsonwebtoken');
var session = require('express-session');
var config = require('../config');

authRoute.use(bodyParser.urlencoded({ extended: true }));

//auth login
authRoute.get('/login', function(req, res) {
		res.render('pages/auth/login');
});

authRoute.post('/login', function(req, res) {
		models.User.find({
			where: {
				username: req.body.username,
				password: req.body.password
			}
		}).then(function(user) {
			var data = {};
			if (user) {
				var token = jwt.sign(JSON.stringify(user), 'testing lang', { expiresIn: '60'});
				req.session.authToken = token;
				console.log(req.session.authToken);
				data = {result:true, token: token};
			} else {
				data = {result:false};
			}
			res.json(data);
		});
});


// auth register
authRoute.get('/register', function(req, res) {
	res.render('pages/auth/register');
});

authRoute.post('/register', function(req, res) {
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
	req.session.authToken = null;
	res.render('pages/auth/logout');
});

module.exports = authRoute;