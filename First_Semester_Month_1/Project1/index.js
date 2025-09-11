const form = document.getElementById('form');
const displayUsername = document.getElementById('display-username');
const displayPassword = document.getElementById('display-password');

form.addEventListener('submit', function (event) {
	event.preventDefault();

	const userData = {
		username: document.getElementById('username').value,
		password: document.getElementById('password').value,
		confirmPassword: document.getElementById('confirm-password').value,
	};

	validateData(userData);
});

function validateData(userData) {
	console.log('User Data:', userData);

	if (userData.username.length > 10) {
		alert('Username must be less than 10 characters or less');
	}
	if (userData.password.length < 6) {
		alert('Password must be at least 6 characters long');
	}
	if (userData.password !== userData.confirmPassword) {
		alert('Passwords do not match!');
	} else {
		alert('Form submitted successfully!');
		displayUsername.textContent = `Username: ${userData.username}`;
		displayPassword.textContent = `Password: ${userData.password}`;
	}
}
