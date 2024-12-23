var submit_button;

document.addEventListener('DOMContentLoaded', (event) => {
	submit_button = document.querySelector('#submit-button');

	document.querySelector('#contact-form').addEventListener('submit', (event2) => {
		event2.preventDefault();

		submit_button.disabled = true;
		submit_button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></span> <span>Sending...</span>';

		let contact_form_result_alert = document.querySelector('#contact-form-result .alert');

		if (contact_form_result_alert) {
			new bootstrap.Alert(contact_form_result_alert);
			bootstrap.Alert.getInstance(contact_form_result_alert).close();
		}

		fetch('https://usebasin.com/f/f8a55f3aacfc.json', {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json'
			},
			'body': JSON.stringify({
				'Name': document.querySelector('#name').value,
				'Email': document.querySelector('#email').value,
				'Message': document.querySelector('#message').value,
				'cf-turnstile-response': document.querySelector('input[name="cf-turnstile-response"]').value
			}),
			'cache': 'no-store'
		})
		.then((response) => {
			if (response['ok']) {
				return response.json();
			} else {
				throw 'Error';
			}
		})
		.then((data) => {
			document.querySelector('#contact-form-result').innerHTML = '<div class="alert alert-success alert-dismissible fade show mt-2 mb-0" role="alert"><span>Email sent successfully.</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
			// document.querySelectorAll('#name, #email, #message').forEach(e => e.value = '');
			document.querySelector('#contact-form').reset();
		})
		.catch((error) => {
			document.querySelector('#contact-form-result').innerHTML = '<div class="alert alert-danger alert-dismissible fade show mt-2 mb-0" role="alert"><span>Error. Please try again.</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
		})
		.finally(() => {
			turnstile.reset();
			submit_button.disabled = false;
			submit_button.textContent = 'Send';
		});
	});
});