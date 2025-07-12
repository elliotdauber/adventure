var coins = new Vector();

function Coin(source, value, pic) {
	this.x = source.x;
	this.y = source.y;
	this.value = value;
	this.pic = pic;
	this.speed = 0.5;
	this.moveToPlayerSpeed = 3;
	this.endX;
	this.endY;
	this.index = coins.size();
	this.followingPlayer = false;

	if (Math.random() > 0.5) this.endX = source.x + 30*Math.random()+15;
	else this.endX = source.x - (20*Math.random()+15);

	if (Math.random() > 0.5) this.endY = source.y + 30*Math.random()+15;
	else this.endY = source.y - (20*Math.random()+15);

	this.move = function() {
		var speed = this.speed;
		if ((!this.followingPlayer && isAdjacent(this, warrior, 1)) || (this.followingPlayer && isAdjacent(this, warrior, 5))) {
			this.endX = warrior.x;
			this.endY = warrior.y;
			speed = this.moveToPlayerSpeed;
			this.moveToPlayerSpeed += 0.05;
			this.followingPlayer = true;
		} else if (this.followingPlayer) {
			//if player is too far away
			return;
		}

		var dX = this.endX - this.x;
		var dY = this.endY - this.y;
		var distToGo = Math.sqrt(dX*dX + dY*dY);
		var moveX = 0;
		var moveY = 0;
		if (distToGo <= 4) {
			return;
		}
		moveX = speed * dX/distToGo;
		moveY = speed * dY/distToGo;
		this.x += moveX;
		this.y += moveY;
	}

	this.draw = function() {
		drawImageRotatedScaled(this.pic, this.x, this.y, 0, 1);
	}
}

function createCoins(source) {
	while (source.coinYield > 0) {
		if (source.coinYield >= 25) {
			var newCoin = new Coin(source, 25, highCoinPic); //red
			coins.push(newCoin);
			source.coinYield -= 25;
		} else if (source.coinYield >= 10) {
			var newCoin = new Coin(source, 25, mediumCoinPic); //blue
			coins.push(newCoin);
			source.coinYield -= 10;
		} else if (source.coinYield >= 5) {
			var newCoin = new Coin(source, 5, coinPic);
			coins.push(newCoin);
			source.coinYield -= 5;
		} else {
			var newCoin = new Coin(source, source.coinYield, coinPic);
			coins.push(newCoin);
			source.coinYield = 0;
		}
	}
}
