var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../server/models/');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/profile', function(req, res) {
	models.User.find({
		where: {
			id: 1
		}
	}).then(function(user) {
		if (user) {
			// res.send(user);
			res.render('pages/user/profile', {first_name: user.first_name, testing: "wadwad"});
		} else {
			res.send('No user found');
		}
	});
});

module.exports = router;