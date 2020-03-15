$(document).ready(function () {
	var vdo = document.getElementById("video");
	var sound = document.getElementById("sound")
	var tr = document.getElementById("tr")
	var s = vdo.volume;
	sound.value = s;
	vdo.pause()

	var apval = getcookie("ap")
	if (apval == "true") {
		vdo.play()
	} else if (apval == "false") {
		vdo.pause()
	};

	if (vdo.paused) {
		$("#play-pause").attr("class", "fa fa-play")
	} else {
		$("#play-pause").attr("class", "fa fa-pause")
	}

	function pp() {
		if (vdo.paused) {
			$("#play-pause").attr("class", "fa fa-pause")
			vdo.play();
		} else {
			$("#play-pause").attr("class", "fa fa-play")
			vdo.pause();
		}
	};

	/* sc class toggler function for arg el */
	function togglescclass(el) {
		$(el).toggleClass("sc")
	};

	function ppi() {
		togglescclass(".play")
		togglescclass(".pause")
	}
	$(sound).mousemove(function () {
		var s = sound.value;
		vdo.volume = s;
	});

	//play-pause button
	$("#play-pause").click(function () {
		// play-pause
		pp();
		// play-pause icon
		ppi();
	});
	// play-pause by clicking in the video
	$(vdo).click(function () {
		// play-pause
		pp();
		// play-pause icon
		ppi();
	});

	// timeviewer
	vdo.addEventListener("timeupdate", function () {
		var pos = (vdo.currentTime / vdo.duration) * 100;
		var ct = document.getElementById("ct");
		ct.style.width = pos + "%";
		tr.value = pos;

		/* showing currentTime of the vidoe */
		var minute = ((vdo.currentTime.toFixed(0)) - ((vdo.currentTime.toFixed(0)) % 60)) / 60;
		var currentTime = vdo.currentTime.toFixed(0)
		$("#ctp").html(minute + " : " + currentTime % 60);

		if (vdo.paused) {
			$("#play-pause").attr("class", "fa fa-play")
		} else {
			$("#play-pause").attr("class", "fa fa-pause")
		};
	});
	// keydown events
	document.addEventListener("keydown", function (e) {
		var k = e.keyCode
		// spacebar play-pause
		if (e.keyCode == 32) {
			// play-pause
			pp();
			// play-pause icon
			ppi();
		};
		// forward and backward
		if (k == 37) {
			if (vdo.currentTime > 0) {
				togglescclass(".backward")
				vdo.currentTime -= 3;
				setTimeout(function () {
					togglescclass(".backward")
				}, 1000);
			};
		} else if (k == 39) {
			if (vdo.currentTime < vdo.duration) {
				togglescclass(".forward")
				vdo.currentTime += 3;
				setTimeout(function () {
					togglescclass(".forward")
				}, 1000);
			};
		};

		var k = e.keyCode
		// volume up down
		if (k == 38) {
			if (sound.value < 1) {
				vdo.volume = (vdo.volume + 0.05).toFixed(2);
				sound.value = vdo.volume;
			};
		} else if (k == 40) {
			if (sound.value > 0) {
				vdo.volume = (vdo.volume - 0.05).toFixed(2);
				sound.value = vdo.volume;
			};
		};
	});
	sound.addEventListener("keydown", function (e) {
		var k = e.keyCode
		if (k == 37) {
			e.preventDefault()
		} else if (k == 39) {
			e.preventDefault()
		};
	});

	tr.addEventListener("click", function () {
		var vl = tr.value;
		vdo.currentTime = (vdo.duration * vl) / 100;
		var ct = document.getElementById("ct");
		ct.style.width = vl + "%";
	});
	tr.addEventListener("mousedown", function () {
		var vl = tr.value;
		tr.value = vl
		vdo.currentTime = (vdo.duration * vl) / 100;
		var ct = document.getElementById("ct");
		ct.style.width = vl + "%";
	});

	$("#autoplay").click(function () {
		if (this.checked) {
			var d = new Date();
			d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000)) /* after 10 days of current date */
			document.cookie = "ap=true;expires=" + d.toUTCString() + ";";
		} else {
			document.cookie = "ap=false;expires= Sat, 29 Aug 2000 12:00:00 UTC";
		};
	})

	/* fullscreen button click event */
	$("#fullscreen").click(function () {
		if (vdo.requestFullscreen) {
			vdo.requestFullscreen();
		} else if (vdo.mozRequestFullScreen) {
			vdo.mozRequestFullScreen();
		} else if (vdo.webkitRequestFullscreen) {
			vdo.webkitRequestFullscreen();
		} else if (vdo.msRequestFullscreen) {
			vdo.msRequestFullscreen();
		};
	});

	function videoduration() {
		setInterval(function () {
			$("#du").html(((vdo.duration) / 60).toFixed(0) + " : " + ((vdo.duration) % 60).toFixed(0))
		}, 100);
	};
	videoduration()

	$(".main").removeClass("disnone");
	$(".chkbox").removeClass("disnone");


	function getcookie(name) {
		var cookies = document.cookie
		var cookiesarray = cookies.split(";")
		for (c in cookiesarray) {
			var cookie = cookiesarray[c]
			var cookiearray = cookie.split("=")
			if (cookiearray[0].trim() == name) {
				return cookiearray[1]
			}
		}
	}
});