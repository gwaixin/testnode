var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var models = require('../server/models/');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '../../public/images/profile/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var uploading = multer({storage:storage});


router.use(bodyParser.urlencoded({ extended: true }));

router.get('/profile', function(req, res) {
	models.User.find({
		where: {
			id: 1
		}
	}).then(function(user) {
		if (user) {
			// res.send(user);
			res.render('pages/user/profile', {user: user, message:""});
		} else {
			res.send('No user found');
		}
	});
});

router.post('/profile/save_picture', uploading.single('picture'), function(req, res) {
	models.User.find({
		where: {
			id: req.body.id
		}
	}).then(function(user) {
		if (user) {
			user.updateAttributes({
				picture: req.file.filename
			}).then(function(userUpdate) {
				res.json({result:true});
			});
		} else {
			// no user found;
			res.json({result:false});
		}
	});
});

router.post('/profile', function(req, res) {
	var data = req.body;
	models.User.find({
		where: {
			id: data.id
		}
	}).then(function(user) {
		if (user) {
			user.updateAttributes({
				username: req.body.username,
				password: req.body.password,
				first_name: req.body.first_name,
				last_name: req.body.last_name
			}).then(function(userUpdate) {
				res.render('pages/user/profile', {user: userUpdate, message: "Successfully update profile"});
			});
		} else {
			res.render('pages/user/profile', {user: userUpdate, message: "Internal Server Error"});
		}
	});
});

module.exports = router;