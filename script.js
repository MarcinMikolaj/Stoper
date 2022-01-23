let root;
let startBtn;
let pauseBtn;
let stopBtn;
let resetBtn;
let timeDisplay;
let lastSavedTime;
let addRound;
let timedRoundList;
let archiveBtn;

let helper;
let openInfoPanelBtn;
let closeInfoPanelBtn;

let shadow;

let openColorPanelBtn;
let colorPanel;
let blueColorP;
let greenColorP;
let orangeColorP;

let time;
let seconds = 0;
let minutes = 0;
let roundIterator = 0;

let coment;

let roundPanel;
let roundPanelInput;
let closeRoundPanelBtn;
let acceptRoundTitle;

const prepareDOMElements = () => {
	root = document.documentElement;
	startBtn = document.querySelector('.startBtn');
	pauseBtn = document.querySelector('.pauseBtn');
	stopBtn = document.querySelector('.stopBtn');
	resetBtn = document.querySelector('.resetBtn');
	timeDisplay = document.querySelector('.time-display');
	addRound = document.querySelector('.addRoundBtn');
	timedRoundList = document.querySelector('.timed-round-list');
	archiveBtn = document.querySelector('.archiveBtn');
	lastSavedTime = document.querySelector('.last-saved-time');
	shadow = document.querySelector('.shadow');

	openColorPanelBtn = document.querySelector('.fa-paint-brush');
	colorPanel = document.querySelector('.color-panel');
	blueColorP = document.querySelector('.blue-color-p');
	greenColorP = document.querySelector('.green-color-p');
	orangeColorP = document.querySelector('.orange-color-p');

	openInfoPanelBtn = document.querySelector('.open-info-panel');
	closeInfoPanelBtn = document.querySelector('.close-info-panel');
	helper = document.querySelector('.helper');

	coment = document.querySelector('.coment');

	roundPanel = document.querySelector('.round-panel');
	roundPanelInput = document.querySelector('.roundtitle-input');
	acceptRoundTitle = document.querySelector('.add-roundtitle-btn');
	closeRoundPanelBtn = document.querySelector('.close-roundtitle-btn');
};

const prepareDOMEvents = () => {
	startBtn.addEventListener('click', countTime);
	pauseBtn.addEventListener('click', pauseTime);
	stopBtn.addEventListener('click', stopTime);
	resetBtn.addEventListener('click', resetAll);

	openInfoPanelBtn.addEventListener('click', openInfoPanel);
	closeInfoPanelBtn.addEventListener('click', closeInfoPanel);

	addRound.addEventListener('click', addNewRound);
	archiveBtn.addEventListener('click', showRounds);
	openColorPanelBtn.addEventListener('click', showColorPanel);

	blueColorP.addEventListener('click', changeToBlue);
	greenColorP.addEventListener('click', changeToGreen);
	orangeColorP.addEventListener('click', changeToOrange);

	timedRoundList.addEventListener('click', roundOperation);
	closeRoundPanelBtn.addEventListener('click', closeRoundPanel);
	acceptRoundTitle.addEventListener('click', changeTitle);
	roundPanelInput.addEventListener('keyup', isEnter);
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();

	pauseBtn.disabled = true;
	stopBtn.disabled = true;
};

const countTime = () => {
	time = window.setInterval(() => {
		if (seconds < 9) {
			seconds++;
			timeDisplay.textContent = `${minutes}:0${seconds}`;
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			timeDisplay.textContent = `${minutes}:${seconds}`;
		} else if (seconds >= 59) {
			seconds = 0;
			minutes++;
			timeDisplay.textContent = `${minutes}:${seconds}`;
		}
	}, 1000);

	lastSavedTime.textContent = '';
	startBtn.disabled = true;
	pauseBtn.disabled = false;
	stopBtn.disabled = false;
};

const pauseTime = () => {
	window.clearInterval(time);

	startBtn.disabled = false;
	pauseBtn.disabled = true;
};

const stopTime = () => {
	window.clearInterval(time);
	lastSavedTime.textContent = `Ostatni zmierzony czas ${timeDisplay.textContent}`;
	timeDisplay.textContent = '0:00';
	seconds = 0;
	minutes = 0;
	startBtn.disabled = false;
};

// Add time round and show rounds

const addNewRound = () => {
	const round = document.createElement('li');
	round.classList.add('round');

	round.innerHTML = `<p>Runda nr: ${roundIterator},Czas: ${timeDisplay.textContent}</p><p class="coment">----------</p><div class="round-icone"><i class="fas fa-sticky-note"></i><i class="fas fa-times"></i></div>`;

	timedRoundList.append(round);
	roundIterator++;
};

const showRounds = () => {
	if (timedRoundList.style.display === 'none') {
		timedRoundList.style.display = 'block';
	} else {
		timedRoundList.style.display = 'none';
	}
};

const resetAll = () => {
	window.clearInterval(time);
	timeDisplay.textContent = '0:00';
	seconds = 0;
	minutes = 0;
	roundIterator = 0;
	startBtn.disabled = false;
	pauseBtn.disabled = false;
	timedRoundList.innerHTML = '';
	lastSavedTime.textContent = '';
};

// Info Panel

const closeInfoPanel = () => {
	helper.style.visibility = 'hidden';
};

const openInfoPanel = () => {
	helper.style.visibility = 'visible';
};

// Color panel

const showColorPanel = () => {
	if (colorPanel.style.visibility === 'hidden') {
		colorPanel.style.visibility = 'visible';
	} else {
		colorPanel.style.visibility = 'hidden';
	}
};

const changeToBlue = () => {
	root.style.setProperty('--bright-color', 'rgb(21, 115, 223)');
};

const changeToGreen = () => {
	root.style.setProperty('--bright-color', 'rgb(57, 180, 20)');
};
const changeToOrange = () => {
	root.style.setProperty('--bright-color', 'rgb(223, 95, 21)');
};

let ev;

const roundOperation = (e) => {
	// console.log(e.target);
	if (e.target.matches('.fa-sticky-note') === true) {
		openRoundPanel();
		ev = e;
	} else if (e.target.matches('.fa-times') === true) {
		removeSingleNote(e);
	}
};

// round options - Change round title, removeSingle round

const removeSingleNote = (e) => {
	e.target.closest('li').remove();
};

const changeTitle = () => {
	roundPanel.style.visibility = 'visible';
	let comentTitle = roundPanelInput.value;

	let changedElement = ev.target.closest('li').children.item(1);

	if (changedElement.matches('.coment')) {
		changedElement.textContent = comentTitle;
	} else {
		changedElement.textContent = '----------';
	}

	roundPanelInput.value = '';
	roundPanel.style.visibility = 'hidden';
};

const isEnter = (e) => {
	if (e.keyCode === 13) {
		changeTitle();
	}
};

const closeRoundPanel = () => {
	roundPanelInput.value = '';
	roundPanel.style.visibility = 'hidden';
};

const openRoundPanel = () => {
	roundPanelInput.value = '';
	roundPanel.style.visibility = 'visible';
};

addEventListener('DOMContentLoaded', main);
