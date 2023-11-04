const form = document.querySelector('form');
const submitBtn = document.getElementById('submitBtn');
form.addEventListener('submit', function() {
	submitBtn.disabled = true;
	submitBtn.innerText = 'Submitting...';});