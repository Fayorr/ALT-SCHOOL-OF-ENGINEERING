const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('time');

let startTime;
let elapsedTime = 0;
let timerInterval = null;

function startTimer() {
	startTime = Date.now() - elapsedTime;
	timerInterval = setInterval(() => {
		elapsedTime = Date.now() - startTime;
		updateDisplay();
		console.log(elapsedTime);
	}, 100);
}

function stopTimer() {
	clearInterval(timerInterval);
	timerInterval = null;
}

function resetTimer() {
	clearInterval(timerInterval);
	timerInterval = null;
	elapsedTime = 0;
	updateDisplay();
}

function updateDisplay() {
	const totalSeconds = Math.floor(elapsedTime / 1000);
	const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
	const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
		2,
		'0'
	);
	const seconds = String(totalSeconds % 60).padStart(2, '0');
	const milliSeconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(
		2,
		'0'
	);
	timeDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliSeconds}`;
}

startBtn.addEventListener('click', () => {
	if (!timerInterval) {
		startTimer();
	}
});
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);

// DARK MODE
document.addEventListener('DOMContentLoaded', () => {
	const themeToggle = document.getElementById('theme-toggle');
	const body = document.body;

	// Function to set the theme
	function setTheme(theme) {
		body.classList.remove('light-theme', 'dark-theme');
		body.classList.add(theme);
		localStorage.setItem('theme', theme);
		themeToggle.textContent = theme === 'dark-theme' ? '🌞' : '🌙';
	}

	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		setTheme(savedTheme);
	} else {
		setTheme('light-theme');
	}

	themeToggle.addEventListener('click', () => {
		if (body.classList.contains('light-theme')) {
			setTheme('dark-theme');
		} else {
			setTheme('light-theme');
		}
	});
});
