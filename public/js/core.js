function errorMessage(msg) {
	new PNotify({
		title: 'Fail',
		text: msg,
		type: 'error'
	});
}

function successMessage(msg) {
	new PNotify({
		title: 'Success',
		text: msg
	});
}