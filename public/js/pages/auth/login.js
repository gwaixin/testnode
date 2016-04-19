$('#form-login').submit(function(e) {
	e.preventDefault();
	$.post($(this).attr('action'), $(this).serialize(), function(data) {
		if (data['result']) {
			successMessage('Please wait while we redirect you to your dashboard.');
			setTimeout(function() {
				location.href = 'http://localhost:3000/books';
			}, 2000);
		} else {
			errorMessage('Username and password does not match, please try again.');
		}
	});
});