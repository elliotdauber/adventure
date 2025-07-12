function Notification(message, color) {
	this.message = message;
	this.y = GC.NOTIFICATIONS_START_Y;
	this.color = "orange";
	if (arguments.length > 1) {
		this.color = color;
	}
	var self = this;
	if (notification != null) {
		clearTimeout(notification.timeout);
		clearInterval(notification.upInterval);
		clearTimeout(notification.downInterval);
	}
	notification = this;

	this.moveDown = function() {
		if (self.y < GC.NOTIFICATIONS_START_Y) {
			self.y += 2;
		} else {
			clearInterval(self.downInterval);
			notification = null;
		}
	}

	this.moveUp = function() {
		if (self.y > GC.NOTIFICATIONS_Y) {
			self.y -= 2;
		}
	}

	this.draw = function() {
		ctx.save();
		ctx.translate(camPanX, camPanY);
		var heightHidden = GC.NOTIFICATIONS_H - (GC.NOTIFICATIONS_START_Y - this.y); //180, 180: 40    180,150: 10
		if (heightHidden > GC.NOTIFICATIONS_H) {
			heightHidden = GC.NOTIFICATIONS_H;
		}
		if (heightHidden < 0) {
			heightHidden = 0;
		}
		colorRect(GC.NOTIFICATIONS_X, this.y, GC.NOTIFICATIONS_W, GC.NOTIFICATIONS_H - heightHidden, this.color);
		coloredOutlineRectCorners(GC.NOTIFICATIONS_X, this.y, GC.NOTIFICATIONS_X+GC.NOTIFICATIONS_W, this.y+GC.NOTIFICATIONS_H - heightHidden, "black");
		if (GC.NOTIFICATIONS_START_Y-this.y > 10) {
			colorText(this.message, GC.NOTIFICATIONS_X + -110 + GC.NOTIFICATIONS_W - this.message.length*3, this.y+20, "black");
		}
		ctx.restore();
	}

	this.downInterval;
	this.upInterval = setInterval(notification.moveUp, 20); 
	this.timeout = setTimeout(function() {
		clearInterval(notification.upInterval);
		notification.downInterval = setInterval(notification.moveDown, 20);
	}, 4000);
}