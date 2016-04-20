$(document).ready(function() {
	var socket = io();
	var idUser = $('#user-id').val();
	var firstName = $('#user-name').val();
	var ioRoom = $('#book-page').val();
	var bookid = $('#book-id').val();

	$('#send-comment').click(function() {
		var message = $('#comment-text').val();
		socket.emit('comment message', {
			message: message,
			userid: idUser,
			firstname: firstName,
			ioRoom: ioRoom,
			bookid: bookid
		});
		$('#comment-text').val('');
	});

	socket.on('comment message', function(data) {
		if (data.result) { 
			$('#comments').prepend(data.message);
		} else {
			errorMessage(data.message);
		}
	});
});