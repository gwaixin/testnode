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

function readURL(input, target) {
	var dfd = $.Deferred();
  if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
  	var reader = new FileReader();
    reader.onload = function (e) {
      target.attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
    dfd.resolve("correct file");
  } else {
  	dfd.reject("invalid file");
  }
  return dfd.promise();
}