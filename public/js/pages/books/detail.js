$(document).ready(function() {
	var socket = io();
	var idUser = $('#user-id').val();
	var firstName = $('#user-name').val();
	var ioRoom = $('#book-page').val();

	$('#send-comment').click(function() {
		var message = $('#comment-text').val();
		socket.emit('comment message', {message: message, userid: idUser, firstname:firstName, ioRoom:ioRoom});
		$('#comment-text').val('');
	});

	socket.on('comment message', function(commentRow) {
		$('#comments').prepend(commentRow);
	});
});