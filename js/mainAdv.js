var canvas, ctx;

var warrior = new charClass();
var GC; //global constants
var OSC; //opening screen constants

var enemies = []; //make into vector?
var projectiles = new Vector();

var paused = false;
var gamePaused = false;
var gameStarted = false;
var gameLoading = false;
var levelLoading = false;

var fps = 50;

var randomArea; //no functionality yet

var gameMode = "story";

var notification = null;

var worker;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	// use these to set canvas width/height dynamically for other devices
		// canvas.width = window.outerWidth - 20;
		// canvas.height = window.outerHeight - 20;
	ctx = canvas.getContext('2d');
	ctx.font = "15px Georgia";

	canvas.addEventListener('mousedown', handleMouseClick);
	canvas.addEventListener('mousemove', updateMousePos);

	// makeGrid();
	// return;

	//runVectorTests();
	setOpeningScreenConstants();
	showCharacterChoiceScreen();


	// fetch('https://xhbs3fz8r5.execute-api.us-west-1.amazonaws.com/dev/player?username=elliot&password=wmtpai2001!', {
	//     method: 'GET',
	//     headers: {
	//       'Content-type': 'application/json',
	//     },
    // }).then(response => {
	//     if (response.ok) {
	//       console.log(response.json())
	//     }
	//     throw new Error('Request failed!');
	// }, networkError => {
	//     console.log(networkError.message)
	// })

	startInterval = setInterval(gameStartSetup, 100)
}

function gameStartSetup() {
	if (!gameStarted) {
		showCharacterChoiceScreen();
		return;
	}
	// startWorker();
	clearInterval(startInterval);
	drawStaticLoadingScreen();
	setGlobalConstants();
	setSkillTreeLocations();
	setAuraTreeLocations();

	if (gameMode == "random") {
		setRandomAreas(numRandomLevels) //areaClass.js
		loadNextRandomArea();
	}
	loadImages();
	warrior.setValuesFromInventory();
	backgroundMusic.loopSong("night-in-venice");
	walkingSound.loopSong("footsteps");
	walkingSound.startOrStopMusic();
	backgroundMusic.startOrStopMusic();
}

// var cblock = 'function workerFunc(e) { console.log("worker working!");}'

// function startWorker() {
//   if (typeof(Worker) !== "undefined") {
//     if (typeof(worker) == "undefined") {
//       // new Worker(URL.createObjectURL(new Blob(["("+loadingScreen.toString()+")()"], {type: 'text/javascript'})));
//       worker = new Worker("js/loadingScreen.js");
//     }
//   } else {
//   	console.log("worker not working");
//   }
// }

// function stopWorker() { 
//   worker.terminate();
//   worker = undefined;
// }

function drawStaticLoadingScreen() {
	console.log("drawing")
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(10, 10, canvas.width-20, canvas.height-20, "#565656");
	colorText("Loading...", canvas.width/2+20, 80, "#E0E0E0");
}

function imageLoadingDoneStartGame() {
	// stopWorker();
	gameLoading = false;
	setInterval(updateAll, 1000/fps);
	setupInput();
	if (gameMode == "story") {
		loadArea(area1);
	} else if (gameMode == "random") {
		loadLevel(currentLevel);
	}
}

function updateAll() {
	if (gamePaused) {
		pauseGame();
		return;
	}
	moveAll();

	ctx.save();
	ctx.translate(-camPanX, -camPanY);
	if (!paused) {
		drawAll();
	}
	ctx.restore();
}

function moveAll() {
	cameraFollow();
	if (levelLoading) return;
	if (!gameStarted) return;
	if (showingWinScreen) return; 
	if (showingLoseScreen) return;
	if (selectedTab != null) return;
	if (warrior.talkingToNPC) return;
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].move();
	}
	var projectilesSize = projectiles.size();
	for (var i = 0; i < projectilesSize; i++) {
		projectiles.getElemAtIndex(i).move();
	}
	for (var i = 0; i < coins.size(); i++) {
		var coin = coins.getElemAtIndex(i);
		coin.move();
	}
	if (warrior.companion.alive && warrior.companion.currentProjectile != null) {
		warrior.companion.currentProjectile.moveToEnemy(warrior.companion.target);
	}
	for (var i = 0; i < enemies.length; i++) enemies[i].attack(warrior);
	if (warrior.companion.alive) {
		warrior.companion.move();
		warrior.companion.attack();
	}
	if (warrior.onIce && !warrior.iceBoots) {
		warrior.handleIce();
	} else if (!warrior.blocking) {
		warrior.move();
	} 
}

function drawAll() {
	if (!gameStarted) {
		showCharacterChoiceScreen();
		return;
	} else if (levelLoading) {
		ctx.save();
		ctx.globalAlpha = 0.1;
		ctx.translate(camPanX, camPanY);
		colorRect(0, 0, canvas.width, canvas.height, "black");
		ctx.restore();
		return;
	}
	else if (showingWinScreen) {
		win();
		return;
	} else if (showingLoseScreen) {
		lose();
		return;
	}
	drawTracks();
	drawNPCs();
	drawQuestItems();
	for (var i = 0; i < enemies.length; i++) enemies[i].draw();
	for (var i = 0; i < coins.size(); i++) coins.getElemAtIndex(i).draw();
	warrior.draw();
	var projectilesSize = projectiles.size();
	for (var i = 0; i < projectilesSize; i++) projectiles.getElemAtIndex(i).draw(7);
	if (warrior.companion.alive && warrior.companion.currentProjectile != null) {
		warrior.companion.currentProjectile.draw(7);
	}
	if (warrior.inChest) {
		warrior.currentChest.showItems();
	}
	if (notification != null) {
		notification.draw();
	}
	drawBossHealth();
	if (warrior.talkingToNPC) {
		handleQuestDialogue();
	}
	if (showingMinimap) {
		drawMinimap();
	}
	if (selectedTab != null) {
		drawScreenTabs();
	} 
	drawHUD();
}

function resetProjectilesAndEnemies() {
	for (var i = 0; i < projectiles.size(); i++) {
		delete projectiles[i];
	}
	for (var i = 0; i < enemies.length; i++) {
		delete enemies[i];
	}
	projectiles.clear();
	enemies = [];
}

function pauseGame() { 
	ctx.globalAlpha = 0.05;
	colorRect(0, 0, canvas.width, canvas.height, "#565656");
	ctx.globalAlpha = 1.0;
	showSettings();
}

function win() {
	ctx.save();
	ctx.translate(camPanX, camPanY);
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorText("You win!", canvas.width/2 - 20, canvas.height/2, "white");
	colorText("Click to continue", canvas.width/2 - 17, canvas.height/2 + 10, "white");
	ctx.restore();
}

function lose() {
	ctx.save();
	ctx.translate(camPanX, camPanY);
	ctx.globalAlpha = 0.01;
	colorRect(0, 0, canvas.width, canvas.height, "red");
	colorCircle(canvas.width/2, canvas.height/2, 225, "black");
	ctx.globalAlpha = 1.0;
	var lastFont = ctx.font;
	ctx.font = "50px Georgia"
	colorText("You lose :(", canvas.width/2 - 110, canvas.height/2-30, "white");
	colorText("Click to continue", canvas.width/2 - 190, canvas.height/2 + 40, "white");
	ctx.restore();
}