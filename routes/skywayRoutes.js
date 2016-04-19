var express = require('express');
var peer = require('peer', {key: '01705a88-7aa7-4b2b-9b43-f5df318c9fc4'});


var router = express.Router();

// peer.on('open', function(id) {
// 	console.log('My peer ID is: ' + id);
// });




//Routes

// define the home page route
router.get('/', function(req, res) {
	
});

// define the about route
router.get('/about', function(req, res) {
	res.send('About skyway');
});

module.exports = router;