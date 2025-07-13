function enemyClass(name) {
	this.x;
	this.y;
	this.pic;
	this.type; //ranged, melee, or special
	this.moveToPlayerProbability;
	this.moveToPlayerDetectionRange;
	this.transparency = 1.0;
	this.name = name;
	this.maxHealth;
	this.health = this.maxHealth;
	this.index;
	this.attackSpeed;
	this.attackRate;
	this.canAttack = true;
	this.attackDamage;
	this.defense;
	this.projectile = false;
	this.alive = true;
	this.gotoX;
	this.gotoY;
	this.UNIT_MOVE_RATE;
	this.picConstant;
	this.damagedPic;
	this.expYield;
	this.coinYield;

	this.hasTrail = false;
	this.trailConstant;
	this.trailTimeout;

	this.enemiesArrayIndex;

	this.movingToPlayer = false;

	this.splitLevel = 1;
	this.splits = false;
	this.numSplits;
	this.enemiesPerSplit;

	this.specialAttackFunctions = [];
	this.isBoss = false;

	this.knockedBack = false;
	this.knockbackSpeed = 10; //default

	this.frozen = false;
	this.frozenPic;
	this.burning = false;
	this.burningDamage;
	this.burningPic;

	this.effectFunctions = [];

	this.reset = function () {
		this.health = this.maxHealth;
		this.alive = true;

		for (var row = 0; row < TRACK_ROWS; row++) {
			for (var col = 0; col < TRACK_COLS; col++) {
				var index = getIndex(col, row);
				if (trackGrid[index] == this.picConstant) {
					trackGrid[index] = TRACK_ROAD;
					this.x = col * TRACK_W + TRACK_W / 2;
					this.y = row * TRACK_H + TRACK_H / 2;
					this.gotoX = this.x;
					this.gotoY = this.y;
					this.index = index;
					this.enemiesArrayIndex = enemies.length;
					return;
				}
			}
		}
	}

	this.move = function () {
		if (this.burning) {
			this.takeDamage(this.burningDamage, false);
		}
		if (this.knockedBack && (Math.abs(this.x - this.gotoX) <= 15 && Math.abs(this.y - this.gotoY) <= 15)) {
			this.knockedBack = false;
		}
		if (!this.knockedBack && Math.random() < 0.01) {
			if (Math.random() > 0.5) {
				this.gotoX = this.x - Math.random() * 100;
			} else {
				this.gotoX = this.x + Math.random() * 100;
			}
			if (Math.random() > 0.5) {
				this.gotoY = this.y - Math.random() * 100;
			} else {
				this.gotoY = this.y + Math.random() * 100;
			}

		}

		//move to player
		else if (!this.knockedBack && isAdjacent(this, warrior, this.moveToPlayerDetectionRange) && Math.random() < this.moveToPlayerProbability && !this.movingToPlayer) {
			var dX = warrior.x - this.x;
			var dY = warrior.y - this.y;
			var dist = Math.sqrt(dX * dX + dY * dY);
			this.gotoX = this.x + 10 * this.UNIT_MOVE_RATE * dX / dist;
			this.gotoY = this.y + 10 * this.UNIT_MOVE_RATE * dY / dist;
			this.movingToPlayer = true;
		}

		else {
			if (Math.abs(this.x - this.gotoX) <= 20 && Math.abs(this.y - this.gotoY) <= 20) {
				this.movingToPlayer = false;
			}
			if (Math.random() > 0.9) {
				this.movingToPlayer = false;
			}
			var dX = this.gotoX - this.x;
			var dY = this.gotoY - this.y;
			var distToGo = Math.sqrt(dX * dX + dY * dY);
			var moveX;
			var moveY;

			var speed = this.UNIT_MOVE_RATE;
			if (this.knockedBack) {
				speed = this.knockbackSpeed;
			} else if (this.frozen) {
				speed /= 30;
			}

			if (distToGo >= 1) {
				moveX = speed * dX / distToGo;
				moveY = speed * dY / distToGo;
			} else {
				moveX = 0;
				moveY = 0;
			}
			var newX;
			var newY;
			if (distToGo > this.UNIT_MOVE_RATE) {
				newX = this.x + moveX;
				newY = this.y + moveY;
			} else {
				newX = this.gotoX;
				newY = this.gotoY;
			}

			var index = getIndexFromXY(newX, newY)
			var tileKindHere = trackGrid[index];
			if (tileKindHere != TRACK_WALL && tileKindHere != PORTAL_IN &&
				tileKindHere != TRACK_DOOR && tileKindHere != SHOP &&
				!isBlockNearbyXY(newX, newY, TRACK_WALL) && !isBlockNearbyXY(newX, newY, SHOP)) {
				var lastIndex = getIndexFromXY(this.x, this.y);
				var tileKindLast = trackGrid[lastIndex];
				if (this.alive && this.hasTrail && lastIndex != index && tileKindLast == TRACK_ROAD) {
					var currLevel = currentLevel;
					trackGrid[lastIndex] = this.trailConstant;
					this.trailTimeout = setTimeout(function () {
						if (currentLevel == currLevel) trackGrid[lastIndex] = TRACK_ROAD;
						else currLevel.mapArray[lastIndex] = TRACK_ROAD;
					}, 3000);
				}
				this.x = newX
				this.y = newY;

			}
		}
	}

	this.takeDamage = function (damage, playSoundBoolean) { //use z index
		var normalPic;
		if (this.health > 0 && this.pic != this.damagedPic) {
			normalPic = this.pic;
			this.pic = this.damagedPic;
			var index = this.enemiesArrayIndex;
			var currLevel = currentLevel;
			setTimeout(function () {
				if (currentLevel == currLevel) enemies[index].pic = normalPic;
				else currLevel.enemies[index].pic = normalPic;
			}, 50);
		}
		this.health -= damage * (randomInt(8, 12) * 0.1) / (this.defense * gameDifficulty * currentLevel.levelDifficulty);
		if (this.health <= 0) {
			if (this.alive) {
				warrior.exp += this.expYield * gameDifficulty * currentLevel.levelDifficulty;
				strikeSound.play();
				this.coinYield = Math.round(this.coinYield * gameDifficulty * currentLevel.levelDifficulty);
				createCoins(this);
				if (this.splits && this.numSplits > 0) {
					for (var i = 0; i < this.enemiesPerSplit; i++) {
						let newSplit = Object.assign({}, this);
						newSplit.splitLevel++;
						newSplit.numSplits--;
						newSplit.attackDamage /= 2;
						newSplit.maxHealth /= 2;
						newSplit.health = newSplit.maxHealth;
						newSplit.pic = normalPic;
						enemies.push(newSplit);
					}
				}
				if (this.isBoss) {
					warrior.bossesKilled.push(this.name);
				}
			}
			this.projectile = false;
			this.alive = false; //find a way to not have to use this -- actually clear the enemy
			//console.log(this.name + "dead");
			//enemies[this.enemiesArrayIndex] = null; use this to remove dead enemies from array
		} else if (arguments.length == 1 || (arguments.length > 1 && playSoundBoolean)) {
			punchSound.play();
		}
	}

	this.attack = function (player) {
		if (!this.alive || !this.canAttack) {
			return;
		}
		if (this.type == "ranged") {
			this.attackRanged(player);
		} else if (this.type == "melee") {
			this.attackMelee(player);
		} else if (this.type == "special") {
			this.attackSpecial(player);
		}
	}

	this.attackSpecial = function (player) {
		var random = Math.random();
		var numFunctions = this.specialAttackFunctions.length;
		var probability = 1 / numFunctions;
		var specialFunction;
		for (var i = 0; i < numFunctions; i++) {
			if (random >= (i * probability) && random < ((i + 1) * probability)) {
				specialFunction = this.specialAttackFunctions[i];
			}
		}
		var cooldown = specialFunction(this);
		var index = this.enemiesArrayIndex;
		var currLevel = currentLevel;
		setTimeout(function () {
			if (currentLevel == currLevel) enemies[index].canAttack = true;
			else currLevel.enemies[index].canAttack = true;
		}, cooldown);
	}

	this.attackMelee = function (player) {
		if (player.blocking && player.companion.alive && isAdjacentXY(player.companion, this, 1)) {
			target = player.companion;
		} else if (isAdjacentXY(player, this, 25, 25)) {
			target = player;
		} else if (player.companion.alive && isAdjacentXY(player.companion, this, 25, 25)) {
			target = player.companion;
		} else {
			return;
		}
		for (var i = 0; i < this.effectFunctions.length; i++) {
			var curr = this.effectFunctions[i];
			var params = [target, curr.params.slice()]
			curr.attackFunction.apply(this, params);
		}
		target.takeDamage(this.attackDamage, this);
		this.canAttack = false;
		var index = this.enemiesArrayIndex;
		var currLevel = currentLevel;
		setTimeout(function () {
			if (currentLevel == currLevel) enemies[index].canAttack = true;
			else currLevel.enemies[index].canAttack = true;
		}, this.attackRate);
	}

	this.attackRanged = function (player) {
		var projectile;
		if (!this.projectile) {
			var target;
			if (player.blocking && player.companion.alive && isAdjacent(player.companion, this, 3)) {
				target = player.companion;
			} else if (isAdjacent(player, this, 3)) {
				target = player;
			} else if (player.companion.alive && isAdjacent(player.companion, this, 3)) {
				target = player.companion;
			} else {
				return;
			}
			projectile = new projectileClass(this);
			projectiles.push(projectile);
			projectile.attack(target);
			this.projectile = true;
			this.canAttack = false;
			var index = this.enemiesArrayIndex;
			var currLevel = currentLevel;
			setTimeout(function () {
				if (currentLevel == currLevel) enemies[index].canAttack = true;
				else currLevel.enemies[index].canAttack = true;
			}, this.attackRate);
		}
	}

	this.draw = function () {
		if (this.alive) {
			drawImageTransparentScaled(this.pic[currentLevel.theme], this.x, this.y, this.transparency, 1 / this.splitLevel);
			if (isAdjacent(warrior, this, 8) && !this.isBoss) {
				ctx.globalAlpha = 0.5;
				colorRect(this.x - 25, this.y - 30, 50, 5, "#E0E0E0");
				colorRect(this.x - 25, this.y - 30, 50 * (this.health / this.maxHealth), 5, "red");
				ctx.globalAlpha = 1.0;
			}
			if (!this.isBoss && this.frozen) {
				drawImageRotatedScaled(this.frozenPic, this.x, this.y, 0, 1);
			}
			if (!this.isBoss && this.burning) {
				drawImageRotatedScaled(this.burningPic, this.x, this.y, 0, 1);
			}
		}
	}
}

enemyClass.prototype.setDamage = function (damage) {
	this.attackDamage = damage;
	return this;
};

enemyClass.prototype.setDefense = function (defense) {
	this.defense = defense;
	return this;
};

enemyClass.prototype.setSpeed = function (speed) {
	this.UNIT_MOVE_RATE = speed;
	return this;
};

enemyClass.prototype.setAttackSpeed = function (attackSpeed) {
	this.attackSpeed = attackSpeed;
	return this;
};

enemyClass.prototype.setAttackRate = function (attackRate) {
	this.attackRate = attackRate;
	return this;
};

enemyClass.prototype.setMaxHealth = function (maxHealth) {
	this.maxHealth = maxHealth;
	return this;
};

enemyClass.prototype.setExpYield = function (expYield) {
	this.expYield = expYield;
	return this;
};

enemyClass.prototype.setProjectileColor = function (color) {
	this.projectileColor = color;
	return this;
};

enemyClass.prototype.setTransparency = function (transparency) {
	this.transparency = transparency;
	return this;
};

enemyClass.prototype.setCoinYield = function (coinYield) {
	var min = Math.round(3 * coinYield / 4);
	var max = Math.round(5 * coinYield / 4);
	this.coinYield = randomInt(min, max);
	return this;
};

enemyClass.prototype.setSplitting = function (numSplits, enemiesPerSplit) {
	this.splits = true;
	this.numSplits = numSplits;
	this.enemiesPerSplit = enemiesPerSplit;
	return this;
};

enemyClass.prototype.setPic = function (picConstant) {
	this.picConstant = picConstant;
	this.pic = trackPics[picConstant];
	return this;
};

enemyClass.prototype.setDamagedPic = function (damagedPicConstant) {
	this.damagedPic = trackPics[damagedPicConstant];
	return this;
};

enemyClass.prototype.setFrozenPic = function (frozenPic) {
	this.frozenPic = frozenPic;
	return this;
};

enemyClass.prototype.setBurningPic = function (burningPic) {
	this.burningPic = burningPic;
	return this;
};

enemyClass.prototype.setBoss = function () {
	this.isBoss = true;
	return this;
};

enemyClass.prototype.setTrail = function (trailConstant) {
	this.trailConstant = trailConstant;
	this.hasTrail = true;
	return this;
};

enemyClass.prototype.setType = function (type) {
	this.type = type;
	if (type == "melee") {
		this.moveToPlayerProbability = 0.9;
		this.moveToPlayerDetectionRange = 7;
	} else if (type == "ranged") {
		this.moveToPlayerProbability = 0.015;
		this.moveToPlayerDetectionRange = 10;
	}
	return this;
};

enemyClass.prototype.addSpecialAttackFunction = function (fn) {
	this.specialAttackFunctions.push(fn);
	return this;
};

enemyClass.prototype.addEffectFunction = function (effectFunction) {
	this.effectFunctions.push(effectFunction); //effectFunction refers to the class
	return this;
};

function enemyBurn(target, params) {
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	target.burning = true;
	target.burningDamage = params[DPS] / fps;
	var currLevel = currentLevel;
	setTimeout(function () { target.burning = false }, params[DURATION]);
}

var enemyBurnEffect = new EffectFunction("Burn")
	.setAttackFunction(enemyBurn)
	.setIcon(burningEffectIconPic);

function spawnGhost() {
	var newGhost = new enemyClass("ghost")
		.setType("ranged")
		.setDamage(1)
		.setDefense(1)
		.setSpeed(4)
		.setAttackSpeed(5)
		.setAttackRate(500)
		.setMaxHealth(10)
		.setExpYield(100)
		.setCoinYield(10)
		.setProjectileColor("white")
		.setTransparency(0.7)
		.setPic(GHOST_START)
		.setDamagedPic(GHOST_DAMAGED)
		.setBurningPic(ghostBurning)
		.setFrozenPic(ghostFrozen);
	return newGhost;
}

function spawnZombie() {
	var newZombie = new enemyClass("zombie")
		.setType("melee")
		.setTrail(POISON)
		.setDamage(1.5)
		.setDefense(1)
		.setSpeed(3)
		.setAttackRate(1500)
		.setMaxHealth(8)
		.setExpYield(75)
		.setCoinYield(35)
		//.setSplitting(2, 4)
		.setPic(ZOMBIE_START)
		.setDamagedPic(ZOMBIE_DAMAGED)
		// .addEffectFunction(createEffectCopy(enemyBurnEffect).setDuration(3000).setDPS(0.5).setProbability(1))
		.setBurningPic(zombieBurning)
		.setFrozenPic(zombieFrozen);
	return newZombie;
}

function spawnSpider() {
	var newSpider = new enemyClass("spider")
		.setType("melee")
		.setTrail(WEB)
		.setDamage(0.2)
		.setDefense(1)
		.setSpeed(6)
		.setAttackRate(400)
		.setMaxHealth(5)
		.setExpYield(50)
		.setCoinYield(5)
		.setPic(SPIDER_START)
		.setDamagedPic(SPIDER_DAMAGED)
		.setBurningPic(spiderBurning)
		.setFrozenPic(spiderFrozen);
	return newSpider;
}


function spawnBombBoss() {
	var newBombBoss = new enemyClass("Bombuardo")
		.setBoss()
		.setType("special")
		.addSpecialAttackFunction(bombBossAttack)
		.addSpecialAttackFunction(bombBossSpiderSpawn)
		.addSpecialAttackFunction(bossCageAttack)
		.addSpecialAttackFunction(bossNormalProjectileAttack)
		.setDamage(3)
		.setDefense(1)
		.setSpeed(6)
		.setAttackRate(300)
		.setMaxHealth(100)
		.setExpYield(2000)
		.setCoinYield(1200)
		.setProjectileColor("red")
		.setAttackSpeed(15)
		.setPic(BOMB_BOSS_START)
		.setDamagedPic(BOMB_BOSS_START);
	return newBombBoss;
}