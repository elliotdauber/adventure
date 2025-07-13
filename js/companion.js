function Location(x, y) {
	this.x = x;
	this.y = y;

	this.distanceFromPlayer = function () {
		var dX = this.x - warrior.x;
		var dY = this.y - warrior.y;
		return Math.sqrt(dX * dX + dY * dY);
	}

	this.isCompletedMove = function (completed) {
		for (var i = 0; i < completed.length; i++) {
			if (completed[i].x == this.x && completed[i].y == this.y) {
				return true;
			}
		}
		return false;
	}

	this.validMoves = function (stepLength, completed) {
		var validMoves = [];
		var indexNorth = getIndexFromXY(this.x, this.y - stepLength);
		var indexEast = getIndexFromXY(this.x + stepLength, this.y)
		var indexSouth = getIndexFromXY(this.x, this.y + stepLength)
		var indexWest = getIndexFromXY(this.x - stepLength, this.y)
		if (trackGrid[indexNorth] == TRACK_ROAD) {
			var north = new Location(this.x, this.y - stepLength);
			if (!this.isCompletedMove(completed)) {
				validMoves.push(north);
			}
		}
		if (trackGrid[indexEast] == TRACK_ROAD) {
			var east = new Location(this.x + stepLength, this.y)
			if (!this.isCompletedMove(completed)) {
				validMoves.push(east);
			}
		}
		if (trackGrid[indexSouth] == TRACK_ROAD) {
			var south = new Location(this.x, this.y + stepLength)
			if (!this.isCompletedMove(completed)) {
				validMoves.push(south);
			}
		}
		if (trackGrid[indexWest] == TRACK_ROAD) {
			var west = new Location(this.x - stepLength, this.y)
			if (!this.isCompletedMove(completed)) {
				validMoves.push(west);
			}
		}
		return validMoves;
	}
}


function companionClass(leader) {
	this.x;
	this.y;
	this.leader = leader;
	this.pic;
	this.maxHealth;
	this.health = this.maxHealth;
	this.defense;
	//this.index;
	this.attackSpeed;
	this.attackRate;
	this.canAttack = true;
	this.attackDamage;
	this.projectile = false;
	this.alive = true;
	this.gotoX;
	this.gotoY;
	this.speed;
	this.damagedPic;
	this.projectileColor;
	this.maxTilesFromLeader = 3;
	this.attackDist = 3;
	this.target = null;
	this.currentProjectile = null;
	this.respawnTime = 10000;
	this.moveStack = null;

	this.burning = false;
	this.burningDamage = 0; //just a default

	this.reset = function () {
		// this.health = this.maxHealth;
		// this.alive = true;
		this.x = this.leader.x;
		this.y = this.leader.y;
	}

	// this.findPlayer = function() {
	// 	var masterQueue = new Queue();
	// 	var completedMovesArray = [];
	// 	var warriorLocation = new Location(warrior.x, warrior.y);
	// 	var currLocation = new Location(this.x, this.y);
	// 	var currLocationStack = new Stack();
	// 	currLocationStack.push(currLocation);
	// 	masterQueue.enqueue(currLocationStack);
	// 	var test;
	// 	while (true) {
	// 		test = masterQueue.dequeue();
	// 		var moveToCheck = test.peek();
	// 		if (moveToCheck.distanceFromPlayer() <= 50) {
	// 			break;
	// 		} else {
	// 			var validMoves = moveToCheck.validMoves(20, completedMovesArray);
	// 			for (var i = 0; i < validMoves.length; i++) {
	// 				let newTest = Object.assign({}, test); //make sure this is by value!
	// 				newTest.push(validMoves[i]);
	// 				completedMovesArray.push(validMoves[i]);
	// 				masterQueue.enqueue(newTest);
	// 			}
	// 		}
	// 	}
	// 	console.log(test.elements);
	// 	return test;
	// }

	// function makeDirectionsArray(index, warriorIndex) {
	// 	var north = index - TRACK_COLS;
	// 	var south = index + TRACK_COLS;
	// 	var east = index + 1;
	// 	var west = index - 1;

	// 	var directions = [];
	// 	var warriorCol = getCol(warriorIndex);
	// 	var warriorRow = getRow(warriorIndex);
	// 	var currCol = getCol(index);
	// 	var currRow = getRow(index);

	// 	if (warriorCol < currCol) {
	// 		directions.push(west);
	// 	} else if (warriorCol > currCol) {
	// 		directions.push(east);
	// 	}
	// 	if (warriorRow < currRow) {
	// 		directions.push(north);
	// 	} else if (warriorRow > currRow) {
	// 		directions.push(south);
	// 	}
	// }

	// this.findPlayer = function(index, warriorIndex, soFarVector) {
	// 	if (index == warriorIndex) {
	// 		return true;
	// 	} 
	// 	// if (soFarVector.contains(index)) {
	// 	// 	return false;
	// 	// }
	// 	var directions = makeDirectionsArray(index, warriorIndex);
	// 	for (var i = 0; i < directions.length; i++) {
	// 		if (trackGrid[directions[i]] != TRACK_WALL && !soFarVector.contains(directions[i])) {
	// 			soFarVector.push(directions[i]);
	// 			if (this.findPlayer(directions[i], warriorIndex, soFarVector)) {
	// 				return true;
	// 			} else {
	// 				soFarVector.remove(soFarVector.size()-1, 1);
	// 			}
	// 		}
	// 	}
	// 	return false;
	// }

	this.move = function () {
		if (this.burning) {
			this.takeDamage(this.burningDamage);
		}
		var chanceToMove = 0.05; //default

		if (!leader.keyHeld_North && !leader.keyHeld_East && !leader.keyHeld_South && !leader.keyHeld_West && isAdjacent(this, leader, this.maxTilesFromLeader)) {
			chanceToMove = 0.005;
		}
		if (this.moveStack != null) {
			var stackMove = this.moveStack.pop();
			this.x = stackMove.x;
			this.y = stackMove.y;
			if (this.moveStack.isEmpty()) {
				this.moveStack = null;
			}
			return;
		}
		//console.log("comp moving");
		if (Math.random() < chanceToMove) {
			//console.log("random");
			if (Math.random() > chanceToMove) {
				this.gotoX = this.leader.x - Math.random() * this.maxTilesFromLeader * TRACK_W;
			} else {
				this.gotoX = this.leader.x + Math.random() * this.maxTilesFromLeader * TRACK_W;
			}
			if (Math.random() > chanceToMove) {
				this.gotoY = this.leader.y - Math.random() * this.maxTilesFromLeader * TRACK_H;
			} else {
				this.gotoY = this.leader.y + Math.random() * this.maxTilesFromLeader * TRACK_H;
			}
			//console.log(this.gotoX +","+this.gotoY);

		}

		else {
			var dX = this.gotoX - this.x;
			var dY = this.gotoY - this.y;
			//console.log(dX+":"+dY)
			var distToGo = Math.sqrt(dX * dX + dY * dY);
			var moveX;
			var moveY;
			if (distToGo > 0) {
				moveX = this.speed * dX / distToGo;
				moveY = this.speed * dY / distToGo;
			} else {
				moveX = 0;
				moveY = 0;
			}
			//console.log(this.x + "," + this.y);
			var newX;
			var newY;
			if (distToGo > this.speed) {
				newX = this.x + moveX;
				newY = this.y + moveY;
			} else {
				newX = this.gotoX;
				newY = this.gotoY;
			}

			if (newX < 0) {
				newX = TRACK_W * 1.5;
			} else if (newX > TRACK_COLS * TRACK_W) {
				newX = (TRACK_COLS - 1.5) * TRACK_W;
			}
			if (newY < 0) {
				newY = TRACK_H * 1.5;
			} else if (newY > TRACK_ROWS * TRACK_H) {
				newY = (TRACK_ROWS - 1.5) * TRACK_H;
			}
			var index = getIndexFromXY(newX, newY)
			var tileKindHere = trackGrid[index];
			if (tileKindHere != TRACK_WALL && tileKindHere != TRACK_DOOR &&
				tileKindHere != SHOP) {
				this.x = newX
				this.y = newY;
			}

			// else {
			// 	this.moveStack = this.findPlayer();
			// }
		}
	}

	this.respawn = function () {
		this.alive = true;
		this.health = this.maxHealth;
		this.reset();
	}

	this.takeDamage = function (damage) {
		paused = true;
		this.health -= (damage / this.defense) * (randomInt(8, 12) * 0.1);
		setTimeout(function () { paused = false; }, 50);
		if (this.health <= 0) {
			if (this.alive) {
				strikeSound.play();
			}
			this.projectile = false;
			this.alive = false;
			setTimeout(function () { warrior.companion.respawn() }, this.respawnTime);
			console.log("comp is: " + this.alive);
			//this.leader.companion = null;
		}
	}


	this.attack = function () {
		var companionProjectile;
		if (this.alive && this.target != null && this.target.alive && !this.projectile && isAdjacent(this, this.target, this.attackDist) && this.canAttack) {
			companionProjectile = new projectileClass(this);
			this.currentProjectile = companionProjectile;
			companionProjectile.attack(this.target);
			this.projectile = true;
			this.canAttack = false;
			var cooldown = this.attackRate;
			setTimeout(function () { warrior.companion.canAttack = true; }, cooldown);
		}
	}

	this.draw = function () {
		if (this.alive) {
			drawImageRotated(this.pic, this.x, this.y, 0);
			if (isAdjacent(warrior, this, this.maxTilesFromLeader)) {
				ctx.globalAlpha = 0.5;
				colorRect(this.x - 25, this.y - 30, 50, 5, "#E0E0E0");
				colorRect(this.x - 25, this.y - 30, 50 * (this.health / this.maxHealth), 5, "green");
				ctx.globalAlpha = 1.0;
			}
		}
	}
}

companionClass.prototype.setSpeed = function (speed) {
	this.speed = speed;
	return this;
};

companionClass.prototype.setAttackRate = function (attackRate) {
	this.atackRate = attackRate;
	return this;
};

companionClass.prototype.setAttackSpeed = function (attackSpeed) {
	this.attackSpeed = attackSpeed;
	return this;
};

companionClass.prototype.setDamage = function (damage) {
	this.attackDamage = damage;
	return this;
};

companionClass.prototype.setHealth = function (health) {
	this.maxHealth = health;
	this.health = this.maxHealth;
	return this;
};

companionClass.prototype.setDefense = function (defense) {
	this.defense = defense;
	return this;
};

companionClass.prototype.setPic = function (pic) {
	this.pic = pic;
	return this;
};

companionClass.prototype.setDamagedPic = function (damagedPic) {
	this.damagedPic = damagedPic;
	return this;
};

companionClass.prototype.setProjectileColor = function (color) {
	this.projectileColor = color;
	return this;
};