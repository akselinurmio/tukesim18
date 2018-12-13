(function initVideoStuff() {
	const [player] = document.getElementsByClassName("js-player");
	if (!player) return;

	const [video] = player.getElementsByTagName("video");
	if (!video) return;

	const [play] = player.getElementsByClassName("js-player__play");
	if (play) {
		const playText = play.textContent;
		const pauseText = play.dataset.pauseText;

		play.onclick = () => {
			if (video.paused) {
				video.play();
				play.textContent = pauseText;
			} else {
				video.pause();
				play.textContent = playText;
			}
		};
	}

	const [startAgain] = player.getElementsByClassName("js-player__start-again");
	if (startAgain) {
		startAgain.onclick = () => {
			video.currentTime = 0;
		};
	}

	const [volume] = player.getElementsByClassName("js-player__volume");
	if (volume) {
		const quieterText = volume.textContent;
		const louderText = volume.dataset.louderText;
		volume.onclick = () => {
			if (video.volume < 1) {
				video.volume = 1;
				volume.textContent = quieterText;
			} else {
				video.volume = 0.25;
				volume.textContent = louderText;
			}
		};
	}

	// Set listeners for video events
	video.addEventListener("play", () => {
		player.classList.add("js-player--playing");
	});
	video.addEventListener("pause", () => {
		player.classList.remove("js-player--playing");
	});

	// Change logo's color on marquee bumps :'D
	const [logo] = player.getElementsByClassName("js-player__logo");
	if (!logo) return;

	const changeLogoColor = () => {
		const hue = Math.floor(Math.random() * 360);
		logo.style.color = `hsl(${hue}, 100%, 50%)`;
	};

	// Following tries to follow the X axis bumps
	window.setInterval(changeLogoColor, 6810);
	// Following simulates the Y axis bumps
	window.setInterval(changeLogoColor, 3870);
})();
