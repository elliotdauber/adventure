var backgroundMusic = new backgroundMusicClass();
var walkingSound = new backgroundMusicClass();

var playingWalkSound = false;

var sounds = [];
var songs = ["night-in-venice",
	"all-of-us",
	"come-and-find-me",
	"digital-native",
	"jumpshot",
	"arpanauts"];

var currSong = 0;


var strikeSound = new soundOverlapsClass("strike", 1.0, 0);
var punchSound = new soundOverlapsClass("punch", 0.2, 0.4);
var playerDamageSound = new soundOverlapsClass("player-damage", 0.5, 0);
var keyPickup = new soundOverlapsClass("short-clink", 0.5, 0);
var doorOpen = new soundOverlapsClass("long-clink", 0.5, 2);
var chestOpen = new soundOverlapsClass("creak", 0.5, 1.5);
var buyItem = new soundOverlapsClass("ka-ching", 0.5, 0);
var appleBite = new soundOverlapsClass("apple-bite", 0.7, 0);
var swooshSound = new soundOverlapsClass("swoosh", 0.7, 0);

var bombSound1 = new soundOverlapsClass("explosion1", 0.7, 0);
var bombSound2 = new soundOverlapsClass("explosion2", 0.7, 0);
var bombSound3 = new soundOverlapsClass("explosion3", 0.7, 0);

var musicLevel = 0.5;
var soundLevel = 0.5;

var slidingMusic = false;
var slidingSound = false;

var slidingDifficulty = false;

function keepInBounds(slider) {
	if (slider < 0) {
		slider = 0;
	} else if (slider > 1.0) {
		slider = 1.0;
	}
	return slider;
}

function handleSliderUp(evt) {
	//mouseup event
	if (slidingMusic) {
		slidingMusic = false;
	} else if (slidingSound) {
		slidingSound = false;
	} else if (slidingDifficulty) {
		slidingDifficulty = false;
	}
}

function handleSliderMove(evt) {
	//mousemove event
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	if (slidingMusic) {
		var newPos = mouseX - GC.SLIDER_X;
		musicLevel = newPos / GC.SLIDER_LENGTH;
		musicLevel = keepInBounds(musicLevel);
	}

	if (slidingSound) {
		var newPos = mouseX - GC.SLIDER_X;
		soundLevel = newPos / GC.SLIDER_LENGTH;
		soundLevel = keepInBounds(soundLevel);
	}

	if (slidingDifficulty) {
		var newPos = mouseX - GC.SLIDER_X;
		gameDifficulty = newPos / GC.SLIDER_LENGTH;
		gameDifficulty = keepInBounds(gameDifficulty) * (maxGameDifficulty - minGameDifficulty) + minGameDifficulty;
	}
	setAudioFromSliders();
}

function handleSliderInput(evt) {
	//mousedown event
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	var musicSliderPosX = musicLevel * GC.SLIDER_LENGTH + GC.SLIDER_X;
	var soundSliderPosX = soundLevel * GC.SLIDER_LENGTH + GC.SLIDER_X;
	var difficultySliderPosX = ((gameDifficulty - minGameDifficulty) / (maxGameDifficulty - minGameDifficulty)) * GC.SLIDER_LENGTH + GC.SLIDER_X;

	var closeEnoughMusicY = Math.abs(mouseY - GC.TOP_SLIDER_Y) <= GC.SLIDER_RADIUS * 2;
	var closeEnoughMusicX = Math.abs(mouseX - musicSliderPosX) <= GC.SLIDER_RADIUS;

	var closeEnoughSoundY = Math.abs(mouseY - GC.BOTTOM_SLIDER_Y) <= GC.SLIDER_RADIUS * 2;
	var closeEnoughSoundX = Math.abs(mouseX - soundSliderPosX) <= GC.SLIDER_RADIUS;

	var closeEnoughDiffY = Math.abs(mouseY - GC.DIFF_SLIDER_Y) <= GC.SLIDER_RADIUS * 2;
	var closeEnoughDiffX = Math.abs(mouseX - difficultySliderPosX) <= GC.SLIDER_RADIUS;

	if (closeEnoughMusicY) {
		if (!closeEnoughMusicX) {
			var newPos = mouseX - GC.SLIDER_X;
			musicLevel = newPos / GC.SLIDER_LENGTH;
			musicLevel = keepInBounds(musicLevel);
		} else {
			slidingMusic = true;
		}
	}

	if (closeEnoughSoundY) {
		if (!closeEnoughSoundX) {
			var newPos = mouseX - GC.SLIDER_X;
			soundLevel = newPos / GC.SLIDER_LENGTH;
			soundLevel = keepInBounds(soundLevel);
		} else {
			slidingSound = true;
		}
	}

	if (closeEnoughDiffY) {
		if (!closeEnoughDiffX) {
			var newPos = mouseX - GC.SLIDER_X;
			gameDifficulty = newPos / GC.SLIDER_LENGTH;
			gameDifficulty = keepInBounds(gameDifficulty) * (maxGameDifficulty - minGameDifficulty) + minGameDifficulty;
		} else {
			slidingDifficulty = true;
		}
	}
	setAudioFromSliders();
}

function setAudioFromSliders() {
	//console.log(musicLevel);
	backgroundMusic.setVolume(musicLevel);
	walkingSound.setVolume(soundLevel);
	for (var i = 0; i < sounds.length; i++) {
		var newVol = sounds[i].baseVolume * soundLevel;
		sounds[i].setVolume(newVol);
	}
}

function changeMusic(direction) {
	if (direction == "next") {
		currSong++;
	} else if (direction == "last" && backgroundMusic.checkTimestamp() < 5) {
		currSong--;
		if (currSong == -1) {
			currSong = songs.length - 1;
		}
	}
	backgroundMusic.loopSong(songs[currSong % songs.length]);
}

function showAudioSliders() {
	//music
	colorRect(GC.SLIDER_X, GC.TOP_SLIDER_Y, GC.SLIDER_LENGTH, GC.SLIDER_HEIGHT, "#E0E0E0");
	colorText("Music Volume", (GC.SLIDER_LENGTH / 2) + GC.SLIDER_X - 65, GC.TOP_SLIDER_Y + GC.SLIDER_HEIGHT * 4, "#E0E0E0");
	colorCircle(GC.SLIDER_X, GC.TOP_SLIDER_Y + GC.SLIDER_HEIGHT / 2, GC.SLIDER_HEIGHT / 2, "#E0E0E0");
	colorCircle(GC.SLIDER_X + GC.SLIDER_LENGTH, GC.TOP_SLIDER_Y + GC.SLIDER_HEIGHT / 2, GC.SLIDER_HEIGHT / 2, "#E0E0E0");

	colorCircle(musicLevel * GC.SLIDER_LENGTH + GC.SLIDER_X, GC.TOP_SLIDER_Y + GC.SLIDER_HEIGHT / 2, GC.SLIDER_RADIUS, "green");

	//sound
	colorRect(GC.SLIDER_X, GC.BOTTOM_SLIDER_Y, GC.SLIDER_LENGTH, GC.SLIDER_HEIGHT, "#E0E0E0");
	colorText("Sound Volume", (GC.SLIDER_LENGTH / 2) + GC.SLIDER_X - 70, GC.BOTTOM_SLIDER_Y + GC.SLIDER_HEIGHT * 4, "#E0E0E0");
	colorCircle(GC.SLIDER_X, GC.BOTTOM_SLIDER_Y + GC.SLIDER_HEIGHT / 2, GC.SLIDER_HEIGHT / 2, "#E0E0E0");
	colorCircle(GC.SLIDER_X + GC.SLIDER_LENGTH, GC.BOTTOM_SLIDER_Y + GC.SLIDER_HEIGHT / 2, GC.SLIDER_HEIGHT / 2, "#E0E0E0");

	colorCircle(soundLevel * GC.SLIDER_LENGTH + GC.SLIDER_X, GC.BOTTOM_SLIDER_Y + GC.SLIDER_HEIGHT / 2, GC.SLIDER_RADIUS, "green");

}