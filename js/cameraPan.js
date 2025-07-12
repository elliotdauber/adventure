var camPanX = 0.0;
var camPanY = 0.0;
const DIST_FROM_CENTER_X = 50;
const DIST_FROM_CENTER_Y = 50;

function instantCamFollow() {
	camPanX = warrior.x - canvas.width/2;
	camPanY = warrior.y - canvas.height/2;
}

function cameraFollow() {
	//console.log("following");
	var cameraFocusCenterX = camPanX + canvas.width/2;
	var cameraFocusCenterY = camPanY + canvas.height/2;

	var distFromCameraFocusX = Math.abs(warrior.x - cameraFocusCenterX);
	var distFromCameraFocusY = Math.abs(warrior.y - cameraFocusCenterY);

	if (distFromCameraFocusX > DIST_FROM_CENTER_X) {
		var scalar = 1;
		if (distFromCameraFocusX > 350) {
			scalar = 20;
		}
		if (cameraFocusCenterX < warrior.x) {
			camPanX += warrior.speed * scalar;
		} else {
			camPanX -= warrior.speed * scalar;
		}
	}

	if (distFromCameraFocusY > DIST_FROM_CENTER_Y) {
		var scalar = 1;
		if (distFromCameraFocusY > 200) {
			scalar = 20;
		}
		if (cameraFocusCenterY < warrior.y) {
			camPanY += warrior.speed * scalar;
		} else {
			camPanY -= warrior.speed * scalar;
		}
	}

	if (camPanX < 0) {
		camPanX = 0;
	}
	if (camPanY < 0) {
		camPanY = 0;
	}

	var maxPanRight = TRACK_COLS * TRACK_W - canvas.width;
	var maxPanTop = TRACK_ROWS * TRACK_H - canvas.height;
	if (camPanX > maxPanRight) {
		camPanX = maxPanRight;
	}
	if (camPanY > maxPanTop) {
		camPanY = maxPanTop;
	}
}