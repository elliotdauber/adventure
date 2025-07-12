function projectileClass(source) {
	this.x = source.x;
	this.y = source.y;
	this.speed = source.attackSpeed;
	//this.pic;
	this.index = projectiles.size();
	this.endX;
	this.endY;
	this.source = source;
	this.damage = source.attackDamage
	this.color = source.projectileColor;
	this.target;
	this.radius = null;

	this.attack = function(target) {
		this.endX = target.x;
		this.endY = target.y;
		this.target = target;
	}

	this.move = function() {
		var tileKindHere = trackGrid[getIndexFromXY(this.x, this.y)]
		if ((tileKindHere == TRACK_WALL && !THEME_SETTINGS_ARRAY[currentLevel.theme].wallTransparency) || tileKindHere == TRACK_DOOR) {
			this.source.projectile = false;
			projectiles.remove(this.index, 1);
		}
		
		var dX = this.endX - this.x;
		var dY = this.endY - this.y;
		var distToGo = Math.sqrt(dX*dX + dY*dY);
		var moveX = 0;
		var moveY = 0;
		if (distToGo != 0) {
			moveX = this.speed * dX/distToGo;
			moveY = this.speed * dY/distToGo;
		} 
		this.x += moveX;
		this.y += moveY;


		if (Math.abs(this.x - this.target.x) < this.speed+10 && Math.abs(this.y - this.target.y) < this.speed+10) {
			this.target.takeDamage(this.damage*gameDifficulty*currentLevel.levelDifficulty, this.source);
			this.source.projectile = false;
			projectiles.remove(this.index, 1);
		} else if (Math.abs(this.x - this.endX) < this.speed + 5 && Math.abs(this.y - this.endY) < this.speed + 5) {
			this.source.projectile = false;
			this.source.currentProjectile = null;
			projectiles.remove(this.index, 1);
		}
	}

	this.moveToEnemy = function(target) { //used when shooting from a companion
		var tileKindHere = trackGrid[getIndexFromXY(this.x, this.y)]
		if (tileKindHere == TRACK_WALL || tileKindHere == TRACK_DOOR) {
			this.source.projectile = false;
			this.source.currentProjectile = null;
		}
		
		var dX = this.endX - this.x;
		var dY = this.endY - this.y;
		//console.log(dX+":"+dY)
		var distToGo = Math.sqrt(dX*dX + dY*dY);
		var moveX = 0;
		var moveY = 0;
		if (distToGo != 0) {
			moveX = this.speed * dX/distToGo;
			moveY = this.speed * dY/distToGo;
		} 
		//console.log(this.x + "," + this.y);
		this.x += moveX;
		this.y += moveY;

		if (Math.abs(this.x - target.x) < 10 && Math.abs(this.y - target.y) < 10 ) {
			playerDamageSound.play();
			this.source.projectile = false;
			this.source.currentProjectile = null; //add defense here
			target.takeDamage(this.damage);
			if (!target.alive) {
				this.source.target = null;
			} 
			//console.log(player.health);
		} else if (Math.abs(this.x - this.endX) < 5 && Math.abs(this.y - this.endY) < 5) {
			this.source.projectile = false;
			this.source.currentProjectile = null;
		}
	}

	this.draw = function(size) {
		if (this.radius) {
			size = this.radius;
		}
		ctx.globalAlpha = 0.6;
		colorCircle(this.x, this.y, size, this.color);
		ctx.globalAlpha = 1.0;
	}
}
