function charProjectile(source, clickX, clickY) {
	this.source = source;
	this.x = source.x;
	this.y = source.y;
	this.clickX = clickX;
	this.clickY = clickY;
	if (Math.random() > this.accuracy) {
		this.clickX += randomInt(-20, 20);
	}
	if (Math.random() > this.accuracy) {
		this.clickY += randomInt(-20, 20);
	}
	this.dX = this.clickX - this.x;
	this.dY = this.clickY - this.y;
	var dist = Math.sqrt(this.dX*this.dX + this.dY*this.dY);

	this.projectilesArrayIndex = source.projectiles.size();
	this.speed = source.currentSpell.speed;
	this.range = source.currentSpell.range;
	this.damage = source.damage + source.currentSpell.damage;
	this.pic = source.currentSpell.pic;

	var tan = this.dY/this.dX;
	this.angle = Math.atan(tan);

	if (this.clickX < this.x) {
		this.angle += Math.PI;
	}

	this.specialAttackFunctions = source.inventory[source.currInv]["weapon"].effectFunctions.concat(source.currentSpell.effectFunctions);
	for (var i = 0; i < source.inventory[source.currInv]["weapon"].gemsLength; i++) {
		this.specialAttackFunctions = this.specialAttackFunctions.concat(source.inventory[source.currInv]["weapon"].gems[i].effectFunctions);
	}

	source.projectiles.push(this);

	this.removeFromProjectilesArray = function() {
		warrior.projectiles.remove(this.projectilesArrayIndex, 1);
	}

	this.move = function() {
		var tileKindHere = trackGrid[getIndexFromXY(this.x, this.y)]
		if ((tileKindHere == TRACK_WALL && !THEME_SETTINGS_ARRAY[currentLevel.theme].wallTransparency) || tileKindHere == TRACK_DOOR) {
			this.removeFromProjectilesArray();
		}

		var moveX = this.speed * this.dX/dist;
		var moveY = this.speed * this.dY/dist;
		var totalMoved = Math.sqrt(moveX*moveX + moveY*moveY)

		this.x += this.speed * this.dX/dist;
		this.y += this.speed * this.dY/dist;
		
		this.range -= totalMoved;

		for (var i = 0; i < enemies.length; i++) {
			if (Math.abs(this.x - enemies[i].x) < 20 && Math.abs(this.y - enemies[i].y) < 20) {
				if (enemies[i].alive) {
					for (var j = 0; j < this.specialAttackFunctions.length; j++) {
						var curr = this.specialAttackFunctions[j];
						var params = [enemies[i], curr.params.slice()]
						curr.attackFunction.apply(this, params);
					}
					enemies[i].takeDamage(this.damage);
					if (this.source.companion != null) {
						this.source.companion.target = enemies[i];
					}
					this.removeFromProjectilesArray();
				}
			}
		} 
		if (this.range <= 0) {
			this.removeFromProjectilesArray();
		}
	}

	this.draw = function() {
		drawImageRotatedScaled(this.pic, this.x, this.y, this.angle, 1);
	}
}

function rotatingProjectile(source, radius) {
	this.source = source;
	this.radius = radius;
	this.centerX = source.x;
	this.centerY = source.y;
	this.circlePosRadians = 0;
	this.x = this.centerX;
	this.y = this.centerY + this.radius;
	this.projectilesArrayIndex = source.projectiles.size();
	this.speed = source.currentSpell.speed;
	this.damage = source.damage + source.currentSpell.damage;
	this.pic = source.currentSpell.pic;
	this.specialAttackFunctions = source.inventory[source.currInv]["weapon"].effectFunctions.concat(source.currentSpell.effectFunctions);
	for (var i = 0; i < source.inventory[source.currInv]["weapon"].gemsLength; i++) {
		this.specialAttackFunctions = this.specialAttackFunctions.concat(source.inventory[source.currInv]["weapon"].gems[i].effectFunctions);
	}
	source.projectiles.push(this);

	this.removeFromProjectilesArray = function() {
		warrior.projectiles.remove(this.projectilesArrayIndex, 1);
	}

	this.move = function() {
		var tileKindHere = trackGrid[getIndexFromXY(this.x, this.y)]
		
		this.centerX = source.x;
		this.centerY = source.y
		this.circlePosRadians += 0.0174533*this.speed; //1 degree
		this.x = this.centerX + Math.cos(this.circlePosRadians)*radius;
		this.y = this.centerY + Math.sin(this.circlePosRadians)*radius;

		for (var i = 0; i < enemies.length; i++) {
			if (Math.abs(this.x - enemies[i].x) < 20 && Math.abs(this.y - enemies[i].y) < 20) {
				if (enemies[i].alive) {
					for (var j = 0; j < this.specialAttackFunctions.length; j++) {
						var curr = this.specialAttackFunctions[j];
						var params = [enemies[i], curr.params.slice()]
						curr.attackFunction.apply(this, params);
					}
					enemies[i].takeDamage(this.damage);
					if (this.source.companion != null) {
						this.source.companion.target = enemies[i];
					}
					this.removeFromProjectilesArray();
				}
			}
		} 
	}

	this.draw = function() {
		drawImageRotatedScaled(this.pic, this.x, this.y, 0, 1);
	}
}

function spiralingProjectile(source) {
	this.source = source;
	this.centerX = source.x;
	this.centerY = source.y;
	this.circlePosRadians = 0;
	this.x = this.centerX;
	this.y = this.centerY;
	this.projectilesArrayIndex = source.projectiles.size();
	this.speed = source.currentSpell.speed;
	this.damage = source.damage + source.currentSpell.damage;
	this.pic = source.currentSpell.pic;
	this.range = source.currentSpell.range;
	this.radius = 0;
	this.specialAttackFunctions = source.inventory[source.currInv]["weapon"].effectFunctions.concat(source.currentSpell.effectFunctions);
	for (var i = 0; i < source.inventory[source.currInv]["weapon"].gemsLength; i++) {
		this.specialAttackFunctions = this.specialAttackFunctions.concat(source.inventory[source.currInv]["weapon"].gems[i].effectFunctions);
	}
	source.projectiles.push(this);

	this.removeFromProjectilesArray = function() {
		warrior.projectiles.remove(this.projectilesArrayIndex, 1);
	}

	this.move = function() {
		var tileKindHere = trackGrid[getIndexFromXY(this.x, this.y)]
		if ((tileKindHere == TRACK_WALL && !THEME_SETTINGS_ARRAY[currentLevel.theme].wallTransparency) || tileKindHere == TRACK_DOOR) {
			this.removeFromProjectilesArray();
		}
		
		this.centerX = source.x;
		this.centerY = source.y;
		this.circlePosRadians += 0.0174533*this.speed; //1 degree
		this.x = this.centerX + Math.cos(this.circlePosRadians)*this.radius;
		this.y = this.centerY + Math.sin(this.circlePosRadians)*this.radius;
		this.radius += 0.5; //<-- key to spiral!

		for (var i = 0; i < enemies.length; i++) {
			if (Math.abs(this.x - enemies[i].x) < 20 && Math.abs(this.y - enemies[i].y) < 20) {
				if (enemies[i].alive) {
					for (var j = 0; j < this.specialAttackFunctions.length; j++) {
						var curr = this.specialAttackFunctions[j];
						var params = [enemies[i], curr.params.slice()]
						curr.attackFunction.apply(this, params);
					}
					enemies[i].takeDamage(this.damage);
					if (this.source.companion != null) {
						this.source.companion.target = enemies[i];
					}
				}
			}
		}

		if (this.radius >= this.range) {
			this.removeFromProjectilesArray();
		}
	}
	this.draw = function() {
		drawImageRotatedScaled(this.pic, this.x, this.y, this.circlePosRadians, 1);
	}
}


function bouncingProjectile(source, clickX, clickY) {
	this.source = source;
	this.x = source.x;
	this.y = source.y;
	this.accuracy = source.currentSpell.accuracy;
	this.clickX = clickX;
	this.clickY = clickY;
	this.numBounces = source.currentSpell.numBounces;
	if (Math.random() > this.accuracy) {
		this.clickX += randomInt(-20, 20);
	}
	if (Math.random() > this.accuracy) {
		this.clickY += randomInt(-20, 20);
	}
	this.dX = this.clickX - this.x;
	this.dY = this.clickY - this.y;
	var dist = Math.sqrt(this.dX*this.dX + this.dY*this.dY);

	this.projectilesArrayIndex = source.projectiles.size();
	this.speed = source.currentSpell.speed;
	this.range = source.currentSpell.range;
	this.bouncingRange = this.range;
	this.damage = source.damage+ source.currentSpell.damage;
	this.pic = source.currentSpell.pic;

	this.specialAttackFunctions = source.inventory[source.currInv]["weapon"].effectFunctions.concat(source.currentSpell.effectFunctions);
	for (var i = 0; i < source.inventory[source.currInv]["weapon"].gemsLength; i++) {
		this.specialAttackFunctions = this.specialAttackFunctions.concat(source.inventory[source.currInv]["weapon"].gems[i].effectFunctions);
	}

	source.projectiles.push(this);
	this.setAngle = function() {
		var tan = this.dY/this.dX;
		this.angle = Math.atan(tan);

		if (this.clickX < this.x) {
			this.angle += Math.PI;
		}
	}
	this.setAngle();
	this.mostRecentEnemy = null;

	this.removeFromProjectilesArray = function() {
		warrior.projectiles.remove(this.projectilesArrayIndex, 1);
	}

	this.setAngle = function() {
		var tan = this.dY/this.dX;
		this.angle = Math.atan(tan);

		if (this.clickX < this.x) {
			this.angle += Math.PI;
		}
	}

	this.findNewTarget = function(fromEnemy) {
		var bouncingX = this.bouncingRange;
		var bouncingY = this.bouncingRange;
		var bestDistFound = Math.sqrt(bouncingX*bouncingX + bouncingY+bouncingY)+1;
		var closestEnemyFound = null;
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i].alive && enemies[i] != fromEnemy && isAdjacent(fromEnemy, enemies[i], Math.floor(this.bouncingRange/TRACK_W))) {
				var dX = Math.abs(fromEnemy.x-enemies[i].x);
				var dY = Math.abs(fromEnemy.y-enemies[i].y)
				var distToEnemy = Math.sqrt(dX*dX + dY*dY);
				if (distToEnemy < bestDistFound) {
					bestDistFound = distToEnemy;
					closestEnemyFound = enemies[i];
				}
			}
		}
		console.log(bestDistFound)
		return closestEnemyFound;
	}

	this.move = function() {
		var tileKindHere = trackGrid[getIndexFromXY(this.x, this.y)]
		if ((tileKindHere == TRACK_WALL && !THEME_SETTINGS_ARRAY[currentLevel.theme].wallTransparency) || tileKindHere == TRACK_DOOR) {
			this.removeFromProjectilesArray();
		}
		
		var moveX = this.speed * this.dX/dist;
		var moveY = this.speed * this.dY/dist;
		var totalMoved = Math.sqrt(moveX*moveX + moveY*moveY)

		this.x += this.speed * this.dX/dist;
		this.y += this.speed * this.dY/dist;
		
		this.range -= totalMoved;

		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i] != this.mostRecentEnemy && enemies[i].alive && Math.abs(this.x - enemies[i].x) < 30 && Math.abs(this.y - enemies[i].y) < 30) {
				this.mostRecentEnemy = enemies[i];
				for (var j = 0; j < this.specialAttackFunctions.length; j++) {
					var curr = this.specialAttackFunctions[j];
					var params = [enemies[i], curr.params.slice()]
					curr.attackFunction.apply(this, params);
				}
				enemies[i].takeDamage(this.damage);
				if (this.source.companion != null) {
					this.source.companion.target = enemies[i];
				}
				if (this.numBounces == 0) {
					this.removeFromProjectilesArray();
					return;
				}
				var nextEnemy = this.findNewTarget(enemies[i]);
				this.range = this.bouncingRange;
				if (nextEnemy == null) {
					this.removeFromProjectilesArray();
					return;
				}
				this.clickX = nextEnemy.x; //for finding angle
				this.dX = nextEnemy.x - this.x;
				this.dY = nextEnemy.y - this.y;
				dist = Math.sqrt(this.dX*this.dX + this.dY*this.dY);
				this.numBounces--;
				this.setAngle();
			}
		} 
		if (this.range <= 0) {
			this.removeFromProjectilesArray();
		}
	}

	this.draw = function() {
		drawImageRotatedScaled(this.pic, this.x, this.y, this.angle, 1);
	}
}


function meteorProjectile(source, clickX, clickY) {
	this.source = source;
	this.x = 100;
	this.y = 0;
	this.clickX = clickX;
	this.clickY = clickY;
	if (Math.random() > this.accuracy) {
		this.clickX += randomInt(-20, 20);
	}
	if (Math.random() > this.accuracy) {
		this.clickY += randomInt(-20, 20);
	}
	this.dX = this.clickX - this.x;
	this.dY = this.clickY - this.y;
	var dist = Math.sqrt(this.dX*this.dX + this.dY*this.dY);

	this.projectilesArrayIndex = source.projectiles.size();
	this.speed = source.currentSpell.speed;
	this.range = source.currentSpell.range;
	this.damage = source.damage + source.currentSpell.damage;
	this.pic = source.currentSpell.pic;

	var tan = this.dY/this.dX;
	this.angle = Math.atan(tan);

	if (this.clickX < this.x) {
		this.angle += Math.PI;
	}

	this.specialAttackFunctions = source.inventory[source.currInv]["weapon"].effectFunctions.concat(source.currentSpell.effectFunctions);
	for (var i = 0; i < source.inventory[source.currInv]["weapon"].gemsLength; i++) {
		this.specialAttackFunctions = this.specialAttackFunctions.concat(source.inventory[source.currInv]["weapon"].gems[i].effectFunctions);
	}

	source.projectiles.push(this);

	this.removeFromProjectilesArray = function() {
		warrior.projectiles.remove(this.projectilesArrayIndex, 1);
	}

	this.move = function() {
		var moveX = this.speed * this.dX/dist;
		var moveY = this.speed * this.dY/dist;
		var totalMoved = Math.sqrt(moveX*moveX + moveY*moveY)

		this.x += this.speed * this.dX/dist;
		this.y += this.speed * this.dY/dist;
		
		this.range -= totalMoved;

		for (var i = 0; i < enemies.length; i++) {
			if (Math.abs(this.x - enemies[i].x) < 20 && Math.abs(this.y - enemies[i].y) < 20) {
				if (enemies[i].alive) {
					for (var j = 0; j < this.specialAttackFunctions.length; j++) {
						var curr = this.specialAttackFunctions[j];
						var params = [enemies[i], curr.params.slice()]
						curr.attackFunction.apply(this, params);
					}
					enemies[i].takeDamage(this.damage);
					if (this.source.companion != null) {
						this.source.companion.target = enemies[i];
					}
					this.removeFromProjectilesArray();
				}
			}
		} 
		if (this.range <= 0) {
			this.removeFromProjectilesArray();
		}
	}

	this.draw = function() {
		drawImageRotatedScaled(this.pic, this.x, this.y, this.angle, 1);
	}
}
