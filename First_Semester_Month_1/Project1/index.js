class User {
	constructor(userName, password, confirmPassword) {


		this.userName = userName;
		this.password = password;
		this.confirmPassword = confirmPassword;
		// Validate immediately in constructor and throw errors
		// this.validate();
	}
	

	validateUserUserDetails() {
	
		if (userName.length >= 10) {
			return false;
		}
		return true;
	}
		while (!validateUserName(userName)) {
			let userName = prompt('Invalid username. Please enter a username with less than 10 characters:');
			if (userName === null) {
				return;
			}
}
}
	}

let displayUser = new User
	// Method to display user details
	displayUserDetails() {
		const userData = {
			userName: this.userName,
			email: this.email,
			passwordLength: this.password.length,
			createdAt: new Date().toLocaleString(),
		};
		console.log('User created successfully:', userData);
		return userData;
};
