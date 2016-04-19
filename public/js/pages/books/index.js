$(document).ready(function() {
	
	$('#add-book').click(function() {
		$('#book-form').remove();
		$.post('/books/add-form', {}, function(data) {
			$('#book-table').append('<tr id="book-form">' + data + '<tr>');
		});
	});

	$('.book-save').click(function() {
		var formRow = $('#book-form-row');
		var bookData = {
			id: formRow.find('.book-id').val(),
			title: formRow.find('.book-title').val(),
			description: formRow.find('.book-description').val(),
			author: formRow.find('.book-author').val(),
			quantity: formRow.find('.book-quantity').val()
		};
		
		// console.log(bookData);
		$.post('/books/save', bookData, function(data) {
			if (data['result']) {
				successMessage(data['message']);
				$('#book-form-row').find('input').val('');
				if (data['type'] == 'update') {
					$("tr[data-book-row='"+ bookData.id +"']").html(data['row']);
				} else {
					$('#book-table').append(data['row']);
				}
				
			} else {
				errorMessage(data['message']);
			}
		}, 'JSON');
	});
});

// Delete row
$(document).on('click', '.delete-book', function() {
	var id = $(this).data('book-id');
	if (confirm('Are you really really sure to delete book # ' + id + '?')) {
		$.ajax({
			type: "DELETE",
			url: "/books/" + id,
			success: function(data) {
				if (data['result']) {
					successMessage(data['message']);
					$("tr[data-book-row='"+id+"']").fadeOut('slow').remove();
				} else {
					errorMessage(data['message']);
				}
			}
		});
	}
});

// Edit row
$(document).on('click', '.edit-book', function() {
	var id = $(this).data('book-id');
	var rowBook = $("tr[data-book-row='"+id+"']");
	var book = {
		id: rowBook.find('.book-row-id').html(),
		title: rowBook.find('.book-row-title').html(),
		description: rowBook.find('.book-row-description').html(),
		author: rowBook.find('.book-row-author').html(),
		quantity: rowBook.find('.book-row-quantity').html()
	};
	console.log(book);
	$('.book-id').val(book.id);
	$('.book-title').val(book.title);
	$('.book-description').val(book.description);
	$('.book-author').val(book.author);
	$('.book-quantity').val(book.quantity);
});
