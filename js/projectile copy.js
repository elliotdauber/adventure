function magicClass(player) {
	this.x = player.x;
	this.y = player.y;
	this.moveSpeed = 5;
	this.attackSpeed = 5;
	//this.pic;
	this.index;
	this.directionX;
	this.directionY;
	this.endX;
	this.endY;
	this.source = player;
	this.damage = source.attackDamage;


	this.attack = function (player) {
		this.endX = player.x;
		this.endY = player.y;
	}

	this.move = function () {
		//console.log(this.x+ "," +this.y);

	}

	this.draw = function (size) {
		colorCircle(this.x, this.y, size, "red");
	}
}
