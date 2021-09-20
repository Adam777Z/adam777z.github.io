document.addEventListener('DOMContentLoaded', function (event) {
	// new bootstrap.ScrollSpy(document.body, {
	// 	target: '#navbar'
	// });

	// Smooth Scroll to ID
	document.querySelector('a[href^="#"]').addEventListener('click', function (event) {
		event.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({ 'behavior': 'smooth' });
	});
});