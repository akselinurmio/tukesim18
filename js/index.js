if (localStorage.getItem("playerInstalled") === null) {
	localStorage.setItem("playerInstalled", "false");
} else if (localStorage.getItem("playerInstalled") === "false") {
	document.querySelector("#sequenceTrigger").style.display = "inline-block";
} else if (localStorage.getItem("playerInstalled") === "true") {
	document.querySelector(".installed").style.display = "block";
	document.querySelector(".js-player__play").style.display = "inline-block";
}

import "./video.js";
import "./videoSequence.js";
