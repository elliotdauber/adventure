//adventure

var audioFormat;

function setFormat() {
	var audio = new Audio();
	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg"
	}
}

function backgroundMusicClass() {
	var musicSound = null;

	this.loopSong = function(filename) {
		setFormat();
		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("music/"+filename+audioFormat);
		musicSound.loop = true;
		musicSound.play();
	}

	this.startOrStopMusic = function() {
		if (musicSound.paused) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
	}

	this.setVolume = function(newVol) {
		musicSound.volume = newVol;
	}

	this.checkTimestamp = function() {
		console.log(musicSound.currentTime);
		return musicSound.currentTime;
	}

	this.pause = function() {
		musicSound.pause();
	}
}

function soundOverlapsClass(filename, vol, start) {

	setFormat();
	var mainSound = new Audio("sounds/"+filename+audioFormat);
	var altSound = new Audio("sounds/"+filename+audioFormat);
	var altSoundTurn = false;
	mainSound.volume = vol;
	altSound.volume = vol;
	this.baseVolume = vol;
	sounds.push(this);
	this.startTime = start; //why doesn't this work???

	this.play = function() {
		if (altSoundTurn) {
			altSound.currentTime = this.startTime;
			altSound.play();
		} else {
			mainSound.currentTime = this.startTime;
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
	}

	this.setVolume = function(newVol) {
		mainSound.volume = newVol;
		altSound.volume = newVol;
	}
}

