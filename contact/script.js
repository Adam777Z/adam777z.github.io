var submit_button;

document.addEventListener('DOMContentLoaded', function (event) {
	submit_button = document.getElementById('submit-button');

	document.getElementById('contact-form').addEventListener('submit', function (event) {
		event.preventDefault();
		grecaptcha.reset();
		grecaptcha.execute();
	});
});

function onloadCallback() {
	grecaptcha.render('recaptcha', {
		'sitekey': '6Lew3SMUAAAAAJ82QoS7gqOTkRI_dhYrFy1f7Sqy',
		'callback': onSubmit,
		'size': 'invisible'
	});
}

function onSubmit(token) {
	submit_button.disabled = true;
	submit_button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></span> <span>Sending...</span>';

	let contact_form_result_alert = document.querySelector('#contact-form-result .alert');

	if (contact_form_result_alert) {
		new bootstrap.Alert(contact_form_result_alert);
		bootstrap.Alert.getInstance(contact_form_result_alert).close();
	}

	$.ajax({
		url: 'https://usebasin.com/f/f8a55f3aacfc.json',
		method: 'POST',
		data: {
			'Name': $('#name').val(),
			'Email': $('#email').val(),
			'Message': $('#message').val(),
			'g-recaptcha-response': token
		},
		dataType: 'json'
	})
	.done(function() {
		$('#contact-form-result').html('<div class="alert alert-success alert-dismissible fade show mt-2 mb-0" role="alert"><span>Email sent successfully.</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
		// $('#name, #email, #message').val('');
		$('#contact-form').trigger('reset');
	})
	.fail(function() {
		$('#contact-form-result').html('<div class="alert alert-danger alert-dismissible fade show mt-2 mb-0" role="alert"><span>Error. Please try again.</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
	})
	.always(function() {
		submit_button.disabled = false;
		submit_button.textContent = 'Send';
	});
}