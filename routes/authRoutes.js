var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../server/models/');

router.use(bodyParser.urlencoded({ extended: true }));

//auth login
router.get('/login', function(req, res) {
		res.render('pages/auth/login');
});

router.post('/login', function(req, res) {
		// if (req.body.username == 'admin') {
		// 	res.json({'result': true});
		// } else {
		// 	res.json({'result': false});
		// }
		models.User.find({
			where: {
				username: req.body.username,
				password: req.body.password
			}
		}).then(function(result) {
			var data = {};
			if (result) {
				data = {result:true};
			} else {
				data = {result:false};
			}
			res.json(data);
		});
});


// auth register
router.get('/register', function(req, res) {
	res.render('pages/auth/register');
});

router.post('/register', function(req, res) {
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

module.exports = router;