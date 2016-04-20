$(document).ready(function() {
	var socket = io();
	var idUser = $('#user-id').val();
	var firstName = $('#user-name').val();
	$('#send-comment').click(function() {
		var message = $('#comment-text').val();
		socket.emit('comment message', {message: message, userid: idUser, firstname:firstName});
		$('#comment-text').val('');
	});

	socket.on('comment message', function(commentRow) {
		$('#comments').append(commentRow);
	});
});