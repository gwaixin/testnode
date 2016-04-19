$(document).ready(function() {
	$('#picture').change(function() {
		$('.save-profile-picture').fadeOut('fast');
		$.when(readURL($(this)[0], $('#user-preview'))).then( function(success) {
			$('.save-profile-picture').fadeIn('slow');
		});;
	});
	$('.save-profile-picture').click(function(e) {
		e.preventDefault();
		var formData = new FormData();
		formData.append('id', $(this).data('user-id'));
		formData.append('picture', $('#picture')[0].files[0]);
		$.ajax({
			url: '/user/profile/save_picture',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			type: 'POST',
			success: function(data) {
				if (data['result']) {
					$('.save-profile-picture').fadeOut('fast');
					successMessage('Successfully change image');
				} else {
					errorMessage('SOMETHING IS WRONG');
				}
			}
		});
	});
});