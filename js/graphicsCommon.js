function drawImageRotated(image, x, y, angle, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.save();
	cntx.translate(x, y);
	cntx.rotate(angle);
	cntx.drawImage(image, -image.width / 2, -image.height / 2);
	cntx.restore();
}

function drawImageRotatedScaled(image, x, y, angle, scalar, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.save();
	cntx.translate(x, y);
	cntx.rotate(angle);
	var w = image.width * scalar;
	var h = image.height * scalar;
	cntx.drawImage(image, (-image.width / 2) * scalar, (-image.height / 2) * scalar, w, h);
	cntx.restore();
}

function drawImageTransparent(image, x, y, transparency, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.save();
	cntx.translate(x, y);
	var lastTransparency = cntx.globalAlpha;
	cntx.globalAlpha = transparency;
	cntx.drawImage(image, -image.width / 2, -image.height / 2);
	cntx.globalAlpha = lastTransparency;
	cntx.restore();
}

function drawImageTransparentScaled(image, x, y, transparency, scalar, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.save();
	cntx.translate(x, y);
	var lastTransparency = cntx.globalAlpha;
	cntx.globalAlpha = transparency;
	var w = image.width * scalar;
	var h = image.height * scalar;
	cntx.drawImage(image, (-image.width / 2) * scalar, (-image.height / 2) * scalar, w, h);
	cntx.globalAlpha = lastTransparency;
	cntx.restore();
}

function colorCircle(X, Y, radius, color, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.fillStyle = color;
	cntx.beginPath();
	cntx.arc(X, Y, radius, 0, Math.PI * 2, true);
	cntx.fill();
}

function colorCirclePartial(X, Y, radius, percentFilled, color, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.fillStyle = color;
	cntx.beginPath();
	var start = Math.PI / 2 + (percentFilled) * Math.PI;
	var end = Math.PI / 2 - (percentFilled) * Math.PI;
	cntx.arc(X, Y, radius, start, end, true);
	cntx.fill();
}

function colorRect(X, Y, width, height, color, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.fillStyle = color;
	cntx.fillRect(X, Y, width, height);
}

function colorText(words, x, y, color, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.fillStyle = color;
	cntx.fillText(words, x, y);
}

function colorLine(x1, y1, x2, y2, color, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.fillStyle = color;
	cntx.beginPath();
	cntx.moveTo(x1, y1);
	cntx.lineTo(x2, y2);
	cntx.stroke();
}

function coloredOutlineRectCorners(x1, y1, x2, y2, color, context) {
	var cntx;
	if (context) {
		cntx = context;
	} else {
		cntx = ctx;
	}
	cntx.strokeStyle = color;
	cntx.beginPath();
	cntx.rect(x1, y1, x2 - x1, y2 - y1);
	cntx.stroke();
}

//canvas-specific
