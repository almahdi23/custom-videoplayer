$(document).ready(function () {
	var vdo = document.getElementById("video");
	var sound = document.getElementById("sound")
	var tr = document.getElementById("tr")
	var s = vdo.volume;
	sound.value = s;

	var c = document.cookie
	var co = c.split("=");
	var tf = co[1];
	if (tf == "true") {
		vdo.play();
	} else if (tf == "false") {
		vdo.pause();
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
	}

	function ppi() {
		$(".play").toggleClass("sc")
		$(".pause").toggleClass("sc")
	}
	$(sound).mousemove(function () {
		var s = sound.value;
		vdo.volume = s;
	})

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
		}
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
			vdo.currentTime -= 3;
		} else if (k == 39) {
			vdo.currentTime += 3;
		};

		var k = e.keyCode
		// volume up down
		if (k == 38) {
			if (sound.value < 1) {
				vdo.volume = (vdo.volume + 0.05).toFixed(2);
				sound.value = vdo.volume;
			}
		} else if (k == 40) {
			if (sound.value > 0) {
				vdo.volume = (vdo.volume - 0.05).toFixed(2);
				sound.value = vdo.volume;
			}
		}
	});
	sound.addEventListener("keydown", function (e) {
		var k = e.keyCode
		if (k == 37) {
			e.preventDefault()
		} else if (k == 39) {
			e.preventDefault()
		}
	})

	tr.addEventListener("click", function () {
		var vl = tr.value;
		vdo.currentTime = (vdo.duration * vl) / 100;
		var ct = document.getElementById("ct");
		ct.style.width = vl + "%";
	})
	tr.addEventListener("mousedown", function () {
		var vl = tr.value;
		tr.value = vl
		vdo.currentTime = (vdo.duration * vl) / 100;
		var ct = document.getElementById("ct");
		ct.style.width = vl + "%";
	})

	$("#du").html("" + " : " + "")

	function videoduration() {
		setInterval(function () {
			$("#du").html(((vdo.duration) / 60).toFixed(0) + " : " + ((vdo.duration) % 60).toFixed(0))
		}, 0)
	}
	videoduration()

	$("#autoplay").click(function () {
		if (this.checked) {
			var d = new Date();
			d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000)) /* after 10 days of current date */
			document.cookie = "ap=true;expires=" + d.toUTCString() + ";";
			console.log(d.toUTCString())
		} else {
			document.cookie = "ap=false;expires= Sat, 29 Aug 2000 12:00:00 UTC";
		}
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
		}
	})

	$(".main").removeClass("disnone");
});
