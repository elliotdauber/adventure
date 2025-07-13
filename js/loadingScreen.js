//web worker!! must be in this separate file

var loadingImage = document.createElement('img');
loadingImage.src = "images/loadingCircle.png";
var loadingRadians = 0;

loadingInterval = setInterval(loadingScreen, 20);

function loadingScreen() {
	console.log("loading...");
	colorRect(0, 0, canvas.width, canvas.height, "black");
	drawImageRotatedScaled(loadingImage, canvas.width / 2, canvas.height / 2, loadingRadians, 1);
	loadingRadians += 0.1;
}
