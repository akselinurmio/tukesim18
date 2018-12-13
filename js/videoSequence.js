const overlay = document.querySelector(".overlay");
const installed = document.querySelector(".installed");

const requestDialog = document.querySelector("#requestDialog");
const downloadDialog = document.querySelector("#downloadDialog");
const errorDialog = document.querySelector("#errorDialog");
const resetDialog = document.querySelector("#resetDialog");

const sequenceTrigger = document.querySelector("#sequenceTrigger");
const downloadTrigger = document.querySelector("#downloadTrigger");
const cancelTrigger = document.querySelector("#cancelTrigger");
const errorTrigger = document.querySelector("#errorTrigger");
const continueTrigger = document.querySelector("#continueTrigger");
const resetTrigger = document.querySelector("#resetTrigger");
const deleteTrigger = document.querySelector("#deleteTrigger");

const errorContainer = document.querySelector(".errorDialogContainer");
const bsod = document.querySelector(".bsod");
const reboot = document.querySelector(".reboot");
const loadingText = document.querySelector("#loadingText");

const chimesSound = require("../sounds/chimes.wav");
const chordSound = require("../sounds/chord.wav");
const dingSound = require("../sounds/ding.wav");

const chimes = new Audio(chimesSound);
const chord = new Audio(chordSound);
const ding = new Audio(dingSound);

sequenceTrigger.onclick = function requestShow() {
	if (localStorage.getItem("playerInstalled") !== "true") {
		requestDialog.style.display = "block";
		overlay.style.display = "block";
		ding.play();
	}
};

cancelTrigger.onclick = function cancel() {
	requestDialog.style.display = "none";
	overlay.style.display = "none";
};

downloadTrigger.onclick = function downloadSequence() {
	requestDialog.style.display = "none";
	downloadDialog.style.display = "block";

	setTimeout(function() {
		loadingText.innerHTML = "Lataus valmis!";
		errorTrigger.style.display = "inline-block";
		chimes.play();
	}, 7000);
};

errorTrigger.onclick = function errorShow() {
	errorDialog.style.display = "block";
	chord.play();
};

continueTrigger.onclick = function errorSequence() {
	let errorCount = 1;

	let addErrors = setInterval(function() {
		let translate =
			"translate(calc(-50% + " +
			errorCount * 10 +
			"px), calc(-50% + " +
			errorCount * 10 +
			"px))";
		let clone = errorDialog.cloneNode(true);

		clone.style.transform = translate;
		clone.style.pointerEvents = "none";
		errorContainer.appendChild(clone);

		let chordClone = chord.cloneNode(true);
		chordClone.play();

		errorCount++;

		if (errorCount === 50) {
			clearInterval(addErrors);
			bsodSequence();
		}
	}, 50);
};

function bsodSequence() {
	bsod.style.display = "block";
	errorContainer.innerHTML = null;
	downloadDialog.style.display = "none";

	setTimeout(function() {
		bsod.style.display = "none";
		rebootSequence();
	}, 3000);
}

function rebootSequence() {
	reboot.style.display = "block";

	setTimeout(function() {
		reboot.style.display = "none";
		resetDialog.style.display = "block";
		ding.play();
	}, 4000);
}

resetTrigger.onclick = function changeState() {
	resetDialog.style.display = "none";
	overlay.style.display = "none";
	localStorage.setItem("playerInstalled", "true");
	sequenceTrigger.style.display = "none";
	installed.style.display = "block";
	document.querySelector(".js-player__play").style.display = "inline-block";
};

deleteTrigger.onclick = function resetState() {
	localStorage.setItem("playerInstalled", "false");
	location.reload();
};
