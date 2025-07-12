const DURATION = 0;
const DAMAGE = 1;
const DISTANCE = 2;
const SPEED = 3;
const PERCENT = 4;
const PROBABILITY = 5;
const BOUNCES = 6;
const DPS = 7;

function EffectFunction(name) {
	this.name = name;
	this.attackFunction = null;
	this.defenseFunction = null;
	this.params = [null, null, null, null, null, null, null, null];
	this.icon;
	this.chanceToBind = 1;

	this.setAttackFunction = function(fn) {
		this.attackFunction = fn;
		return this;
	};

	this.setDefenseFunction = function(fn) {
		this.defenseFunction = fn;
		return this;
	};

	this.setIcon = function(pic) {
		this.icon = pic;
		return this;
	};

	this.setDuration = function(duration) {
		this.params[DURATION] = duration;
		return this;
	};

	this.setDamage = function(damage) {
		this.params[DAMAGE] = damage;
		return this;
	};

	this.setDistance = function(distance) {
		this.params[DISTANCE] = distance;
		return this;
	};

	this.setSpeed = function(speed) {
		this.params[SPEED] = speed;
		return this;
	};

	this.setPercent = function(percent) {
		this.params[PERCENT] = percent;
		return this;
	};

	this.setProbability = function(prob) {
		this.params[PROBABILITY] = prob;
		return this;
	};

	this.setBounces = function(bounces) {
		this.params[BOUNCES] = bounces;
		return this;
	};

	this.setDPS = function(dps) {
		this.params[DPS] = dps;
		return this;
	};

	this.setChanceToBind = function(prob) {
		this.chanceToBind = prob;
		return this;
	}

};

var lifeStealEffect = new EffectFunction("Life Steal")
							.setAttackFunction(lifeSteal)
							.setIcon(lifeStealEffectIconPic);

var knockbackEffect = new EffectFunction("Knockback")
							.setAttackFunction(knockback)
							.setIcon(knockbackEffectIconPic);	

var freezeEffect = new EffectFunction("Freeze")
							.setAttackFunction(freeze)
							.setIcon(snowflakePic);		

var burnEffect = new EffectFunction("Burn")
							.setAttackFunction(burn)
							.setIcon(burningEffectIconPic);

var lightningChainEffect = new EffectFunction("Lightning Chain")
							.setAttackFunction(lightningChain)
							.setIcon(lightningBouncingPic);

var splashDamageEffect = new EffectFunction("Splash Damage")
							.setAttackFunction(splashDamage)
							.setIcon(lightningBouncingPic);

var speedIncreaseOnHitEffect = new EffectFunction("Run Away")
							.setDefenseFunction(speedIncreaseOnHit)
							.setIcon(speedDefenseEffectIconPic);	

var reflectDamageEffect = new EffectFunction("Reflect Damage")
							.setDefenseFunction(reflectDamage)
							.setIcon(reflectDamageEffectIconPic);

var burnDefenseEffect = new EffectFunction("Burn Attacker")
							.setDefenseFunction(burnDefense)
							.setIcon(burningEffectIconPic);

var knockbackDefenseEffect = new EffectFunction("Knockback Attacker")
							.setDefenseFunction(knockbackDefense)
							.setIcon(knockbackEffectIconPic);







var allItems; //defined at bottom of this page
var itemTypes = ["weapon", "helmet", "boots", "armor", "shield"];
var weapons = [];
var helmets = [];
var boots = [];
var armors = [];
var shields = [];
var consumables = [];
var currentPowerups = [];
var currentCherry = null;
var currentPineapple = null;
var currentBanana = null;
var numPowerups = 0;

function getItem(name, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].name == name) {
			return array[i];
		}
	}
}

function itemClass(name) {
	this.name = name;
	this.type;
	this.damage;
	this.defense;
	this.speed;
	this.attackRate;
	this.mainStat;
	this.numGemSlots = 0;
	this.gems = [];
	this.gemsLength = 0;

	this.specialAttackFunctions = [];
	this.specialDefenseFunctions = [];

	this.effectFunctions = [];

	// this.effectIcons = [];

	this.cost;
	this.pic;

	this.weaponType;

	this.bagOffsetX;
	this.bagOffsetY;
	this.bagScale;

	this.effectFunction;
	this.useCondition;
	this.storedStat;
	this.powerupsIndex;
	this.maxTime;
	this.timeLeft;
	this.timer;
	this.countdown;

	this.addGem = function(gem) {
		this.gems.push(gem);
		this.gemsLength++;
		warrior.maxHealth += gem.health;
		warrior.health += gem.health;
		warrior.maxMana += gem.mana;
		warrior.mana += gem.mana;
		this.damage += gem.damage;
		this.defense += gem.defense;
		this.speed += gem.speed;
		this.attackRate += gem.attackRate;
		warrior.setValuesFromInventory();
	}

	this.removeGem = function(gem, index) {
		this.gems.splice(index, 1);
		this.gemsLength--;
		warrior.maxHealth -= gem.health;
		warrior.health -= gem.health;
		warrior.maxMana -= gem.mana;
		warrior.mana -= gem.mana;
		this.damage -= gem.damage;
		this.defense -= gem.defense;
		this.speed -= gem.speed;
		this.attackRate -= gem.attackRate;
		warrior.setValuesFromInventory();
	}
}

itemClass.prototype.setType = function(type) {
	this.type = type;
	if (type == "weapon") {
		this.mainStat = "damage";
		this.bagOffsetX = -35;
		this.bagOffsetY = 12;
		this.bagScale = 1.5;
		weapons.push(this);
	} else if (type == "armor") {
		this.mainStat = "defense";
		this.bagOffsetX = 2;
		this.bagOffsetY = -5;
		this.bagScale = 1.1;
		armors.push(this);
	} else if (type == "boots") {
		this.mainStat = "speed";
		this.bagOffsetX = 3;
		this.bagOffsetY = -40;
		this.bagScale = 1.75;
		boots.push(this);
	} else if (type == "helmet") {
		this.mainStat = "defense";
		this.bagOffsetX = 3;
		this.bagOffsetY = 32;
		this.bagScale = 1.75;
		helmets.push(this);
	} else if (type == "shield") {
		this.mainStat = "defense";
		this.bagOffsetX = 47;
		this.bagOffsetY = -5;
		this.bagScale = 2;
		shields.push(this);
	} else if (type == "consumable") {
		this.mainStat = null;
		this.bagOffsetX = 0;
		this.bagOffsetY = 0;
		this.bagScale = 1;
		consumables.push(this);
	}
	return this;
};

function lifeSteal(target, params) {
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	warrior.health += target.maxHealth * (params[PERCENT]/100);
	if (warrior.health > warrior.maxHealth) {
		warrior.health = warrior.maxHealth;
	} 
}

function knockback(target, params) {
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	var dX = target.x - warrior.x;
	var dY = target.y - warrior.y;
	var dist = Math.sqrt(dX*dX + dY*dY);

	target.gotoX = target.x;
	target.gotoY = target.y;

	//fix this with an Object.assign
	while (params[DISTANCE] > 0) {
		var moveX = params[SPEED] * dX/dist;
		var moveY = params[SPEED] * dY/dist;
		params[DISTANCE] -= Math.sqrt(moveX*moveX + moveY*moveY)

		target.gotoX += moveX;
		target.gotoY += moveY;
	}
	target.knockedBack = true;
	target.knockbackSpeed = params[SPEED];
}

function freeze(target, params) {
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	target.frozen = true;
	var index = target.enemiesArrayIndex;
	var currLevel = currentLevel;
	setTimeout(function() {if (currentLevel == currLevel) enemies[index].frozen = false;
								   else currLevel.enemies[index].frozen = false;}, params[DURATION]);
}

function burn(target, params) {
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	target.burning = true;
	target.burningDamage = params[DPS]/fps;
	var index = target.enemiesArrayIndex;
	var currLevel = currentLevel;
	setTimeout(function() {if (currentLevel == currLevel) enemies[index].burning = false;
								   else currLevel.enemies[index].burning = false;}, params[DURATION]);
}

function lightningChain(target, params) {
	//could add in other parameters here
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	var tempSpell = Object.assign({}, lightningBouncingSpell);
	tempSpell.numBounces = params[BOUNCES];
	tempSpell.damage = params[DAMAGE];
	var lastSpell = warrior.currentSpell;
	warrior.currentSpell = tempSpell;
	new bouncingProjectile(warrior, target.x, target.y);
	warrior.currentSpell = lastSpell;
}

function splashDamage(target, params) {
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	for (var i = 0; i < enemies.length; i++) {
		if (isAdjacentXY(target, enemies[i], params[DISTANCE], params[DISTANCE])) {
			enemies[i].takeDamage(warrior.damage*params[PERCENT]*0.01);
		}
	}
}

//defense

function reflectDamage(target, damageDealt, params) {
	//always contain target and damageDealt!!! or it will fail!!! (for armor only)
	if (Math.random() > params[PROBABILITY] || !target) {
		return;
	}
	var damage = damageDealt*(params[PERCENT]*0.01);
	warrior.health += damage;
	target.takeDamage(damage);
}

function speedIncreaseOnHit(target, damageDealt, params) {
	if (Math.random() > params[PROBABILITY]) {
		return;
	}
	warrior.speed += params[SPEED];
	setTimeout(function() {warrior.speed -= increase.val}, params[DURATION]); //TODO: edge case if you die before the timeout ends, it will fuck up you speed
}

function burnDefense(target, damageDealt, params) {
	//doesn't totally work on melee enemies :(
	if (Math.random() > params[PROBABILITY] || !target) {
		return;
	}
	target.burning = true;
	target.burningDamage = params[DPS]/fps;
	var index = target.enemiesArrayIndex;
	var currLevel = currentLevel;
	setTimeout(function() {if (currentLevel == currLevel) enemies[index].burning = false;
								   else currLevel.enemies[index].burning = false;}, params[DURATION]);
}

function knockbackDefense(target, damageDealt, params) {
	if (Math.random() > params[PROBABILITY] || !target) {
		return;
	}
	var dX = target.x - warrior.x;
	var dY = target.y - warrior.y;
	var dist = Math.sqrt(dX*dX + dY*dY);

	target.gotoX = target.x;
	target.gotoY = target.y;

	while (params[DISTANCE] > 0) {
		var moveX = params[SPEED] * dX/dist;
		var moveY = params[SPEED] * dY/dist;
		params[DISTANCE] -= Math.sqrt(moveX*moveX + moveY*moveY)

		target.gotoX += moveX;
		target.gotoY += moveY;
	}
	target.knockedBack = true;
	target.knockbackSpeed = params[SPEED];
}

itemClass.prototype.addEffectFunction = function(effectFunction) {
	this.effectFunctions.push(effectFunction); //effectFunction refers to the class
	return this;
};

itemClass.prototype.setDamage = function(damage) {
	this.damage = damage;
	return this;
};

itemClass.prototype.setDefense = function(defense) {
	this.defense = defense;
	return this;
};

itemClass.prototype.setSpeed = function(speed) {
	this.speed = speed;
	return this;
};

itemClass.prototype.setAttackRate = function(attackRate) {
	this.attackRate = attackRate;
	return this;
};

itemClass.prototype.setNumGemSlots = function(num) {
	this.numGemSlots = num;
	return this;
};

itemClass.prototype.setWeaponType = function(weaponType) {
	this.weaponType = weaponType;
	return this;
};

itemClass.prototype.setCost = function(cost) {
	this.cost = cost;
	return this;
};

itemClass.prototype.setEffect = function(fn) {
	this.effectFunction = fn; 
	return this;
};

itemClass.prototype.setUseCondition = function(condition) {
	this.useCondition = condition; 
	return this;
};

itemClass.prototype.setBagGraphics = function(bagOffsetX, bagOffsetY, bagScale) {
	this.bagOffsetX = bagOffsetX;
	this.bagOffsetY = bagOffsetY;
	this.bagScale = bagScale;
	return this;
};

itemClass.prototype.setBagScale = function(bagScale) {
	this.bagScale = bagScale;
	return this;
};

itemClass.prototype.setPic = function(bruteFilename, wizardFilename, nerdFilename) {
	if (this.type == "consumable") {
		var image = document.createElement("img");
		image.src = "images/" + bruteFilename;
		this.pic = image;
		return this;
	}
	if (arguments.length == 1) {
		var image = document.createElement("img");
		image.src = "images/" + bruteFilename;
		this.pic = {
			"Brute": image,
			"Wizard": image,
			"Nerd": image
		};
	} else {
		var bruteImage = document.createElement("img");
		var wizardImage = document.createElement("img");
		var nerdImage = document.createElement("img");
		bruteImage.src = "images/" + bruteFilename;
		wizardImage.src = "images/" + wizardFilename;
		nerdImage.src = "images/" + nerdFilename;
		this.pic = {
			"Brute": bruteImage,
			"Wizard": wizardImage,
			"Nerd": nerdImage
		};
	}
	return this;
};

function noUseCondition() {
	return true;
}

function appleEffect() {
	appleBite.play();
	var timeToHeal = 2000;
	var totalHealthGain = randomInt(15, 20)*0.01*warrior.maxHealth;
	var healthInterval = setInterval(function () {warrior.health+=totalHealthGain/100;
												  if (warrior.health > warrior.maxHealth) warrior.health = warrior.maxHealth;}, 20);
	var stopHealthgain = setTimeout(function() {clearInterval(healthInterval);}, timeToHeal);
}

function grapeEffect() {
	appleBite.play(); //make grape sound?
	var timeToHealMana = 2000;
	var totalManaGain = randomInt(15, 20)*0.01*warrior.maxMana;
	var manaInterval = setInterval(function () {warrior.mana+=totalManaGain/100;
												  if (warrior.manah > warrior.maxMana) warrior.mana = warrior.maxMana;}, 20);
	var stopManagain = setTimeout(function() {clearInterval(manaInterval);}, timeToHealMana);
}

function grapeUseCondition() {
	return warrior.mana < warrior.maxMana;
}

function appleUseCondition() {
	return warrior.health < warrior.maxHealth;
}

function cherriesEffect(curr) {
	var effectLength = 10000;
	if (currentCherry == null) {
		currentCherry = curr;
		curr.storedStat = warrior.speed;
		warrior.speed *= 2;
		curr.timeLeft = effectLength;
		curr.maxTime = effectLength;
		curr.powerupsIndex = numPowerups;
		currentPowerups.push(curr);
		numPowerups++;
		curr.countdown = setInterval(function() {currentCherry.timeLeft-=500;}, 500);
		curr.timer = setTimeout(function() {warrior.speed = currentCherry.storedStat; 
							   currentPowerups.splice(currentCherry.powerupsIndex, 1);
							   numPowerups--;
							   clearInterval(currentCherry.countdown);
							   currentCherry = null;}, effectLength);
	} else {
		clearTimeout(currentCherry.timer);
		clearInterval(currentCherry.countdown);
		currentCherry.timeLeft += effectLength;
		currentCherry.maxTime += effectLength;
		setInterval(function() {currentCherry.timeLeft-=500;}, 500);
		currentCherry.timer = setTimeout(function() {warrior.speed = currentCherry.storedStat; 
							   currentPowerups.splice(currentCherry.powerupsIndex, 1);
							   numPowerups--;
							   clearInterval(currentCherry.countdown);
							   currentCherry = null;}, currentCherry.timeLeft);
	}
}

function pineappleEffect(curr) {
	var effectLength = 10000;
	if (currentPineapple == null) {
		console.log("current pineapple: "+currentPineapple);
		currentPineapple = curr;
		curr.storedStat = warrior.defense;
		warrior.defense *= 2;
		curr.timeLeft = effectLength;
		curr.maxTime = effectLength;
		curr.powerupsIndex = numPowerups;
		currentPowerups.push(curr);
		numPowerups++;
		curr.countdown = setInterval(function() {currentPineapple.timeLeft-=500;}, 500);
		curr.timer = setTimeout(function() {warrior.defense = currentPineapple.storedStat;
							   currentPowerups.splice(currentPineapple.powerupsIndex, 1);
							   numPowerups--;
							   clearInterval(currentPineapple.countdown);
							   currentPineapple = null;}, effectLength);
	} else {
		clearTimeout(currentPineapple.timer);
		clearInterval(currentPineapple.countdown);
		currentPineapple.timeLeft += effectLength;
		currentPineapple.maxTime += effectLength;
		setInterval(function() {currentPineapple.timeLeft-=500;}, 500);
		currentPineapple.timer = setTimeout(function() {warrior.defense = currentPineapple.storedStat; 
							   currentPowerups.splice(currentPineapple.powerupsIndex, 1);
							   numPowerups--;
							   clearInterval(currentPineapple.countdown);
							   currentPineapple = null;}, currentPineapple.timeLeft);
	}
}

function bananaEffect(curr) {
	var effectLength = 10000;
	if (currentBanana == null) {
		currentBanana = curr;
		curr.storedStat = warrior.damage;
		warrior.damage *= 2;
		curr.timeLeft = effectLength;
		curr.maxTime = effectLength;
		curr.powerupsIndex = numPowerups;
		currentPowerups.push(curr);
		numPowerups++;
		curr.countdown = setInterval(function() {currentBanana.timeLeft-=500;}, 500);
		curr.timer = setTimeout(function() {warrior.damage = currentBanana.storedStat;
							   currentPowerups.splice(currentBanana.powerupsIndex, 1);
							   numPowerups--;
							   clearInterval(currentBanana.countdown);
							   currentBanana = null;}, currentBanana.timeLeft);
	} else {
		clearTimeout(currentBanana.timer);
		clearInterval(currentBanana.countdown);
		currentBanana.timeLeft += effectLength;
		currentBanana.maxTime += effectLength;
		setInterval(function() {currentBanana.timeLeft-=500;}, 500);
		currentBanana.timer = setTimeout(function() {warrior.damage = currentBanana.storedStat; 
							   currentPowerups.splice(currentBanana.powerupsIndex, 1);
							   numPowerups--;
							   clearInterval(currentBanana.countdown);
							   currentBanana = null;}, currentBanana.timeLeft);
	}
}

function createItemCopy(itemToCopy) {
	//could replace these two with deep copy (lodar)
	let item = Object.assign({}, itemToCopy);
	item.effectFunctions = item.effectFunctions.slice();
	for (var i = 0; i < item.effectFunctions.length; i++) {
		item.effectFunctions[i] = Object.assign({}, item.effectFunctions[i]);
		item.effectFunctions[i].params = item.effectFunctions[i].params.slice();
	}
	item.cost = randomInt(Math.ceil(7*item.cost/8), Math.ceil(9*item.cost/8))

	var effectsToRemove = [];
	for (var i = 0; i < item.effectFunctions.length; i++) {
		var curr = item.effectFunctions[i];
		if (Math.random() > curr.chanceToBind) {
			effectsToRemove.push(i);
		}
	}
	var newEffectFunctions = [];
	for (var i = 0; i < item.effectFunctions.length; i++) {
		if (effectsToRemove.indexOf(i) == -1) newEffectFunctions.push(item.effectFunctions[i]);
	}

	for (var i = 0; i < newEffectFunctions.length; i++) {
		item.cost = Math.ceil(item.cost*1.25);
		var params = newEffectFunctions[i].params;
		for (var j = 0; j < params.length; j++) {
			var currParam = params[j];
			if (currParam) { 
				var newVal
				if (currParam < 1) {
					newVal = Math.round(randomInt(75,125)*0.01*currParam*10);
					newVal /= 10;
				} else {
					newVal = Math.round(randomInt(75,125)*0.01*currParam);
				}
				params[j] = newVal;
				if (j == PROBABILITY && params[PROBABILITY] > 1) {
					params[PROBABILITY] = 1;
				} 
			}
		}
	}
	item.effectFunctions = newEffectFunctions;
	return item;
}

function createEffectCopy(effectToCopy) {
	var effect = Object.assign({}, effectToCopy);
	effect.params = effect.params.slice();
	return effect;
}

allItems = [
	new itemClass("basic sword")
		.setType("weapon")
		.setWeaponType("melee")
		.setDamage(0.5)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(100)
		.setNumGemSlots(2)
		.addEffectFunction(createEffectCopy(lifeStealEffect).setPercent(5).setProbability(1))
		.addEffectFunction(createEffectCopy(knockbackEffect).setDistance(150).setSpeed(10).setProbability(1).setChanceToBind(0.75))
		.addEffectFunction(createEffectCopy(burnEffect).setDuration(3000).setDPS(0.5).setProbability(0.75).setChanceToBind(0.5))
		.setPic("warriorSword.png"),

	new itemClass("leather helmet")
		.setType("helmet")
		.setDamage(0)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(100)
		.setPic("warriorLeatherHelmet.png", "wizardHat.png", "nerdHat.png"),

	new itemClass("leather armor")
		.setType("armor")
		.setDamage(0)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(100)
		.setPic("warriorLeatherArmor.png", "wizardArmor.png", "nerdArmor.png"),

	new itemClass("leather boots")
		.setType("boots")
		.setDamage(0)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(100)
		.setPic("warriorLeatherBoots.png"),

	new itemClass("basic shield")
		.setType("shield")
		.setDamage(0)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(100)
		.setPic("warriorShield.png"),

	new itemClass("fork of destruction")
		.setType("weapon")
		.setWeaponType("melee")
		.setDamage(5)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(-100)
		.setCost(500)
		.setNumGemSlots(3)
		.addEffectFunction(createEffectCopy(lightningChainEffect).setDamage(1).setBounces(3).setProbability(1))
		.setPic("warriorBetterSword.png"),

	new itemClass("metal helmet")
		.setType("helmet")
		.setDamage(0)
		.setDefense(0.5)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(300)
		.setNumGemSlots(1)
		.setPic("warriorMetalHelmet.png"),

	new itemClass("metal armor")
		.setType("armor")
		.setDamage(0)
		.setDefense(0.6)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(500)
		.setNumGemSlots(2)
		.setPic("warriorMetalArmor.png"),

	new itemClass("metal boots")
		.setType("boots")
		.setDamage(0)
		.setDefense(0)
		.setSpeed(2)
		.setAttackRate(0)
		.setCost(200)
		.setNumGemSlots(1)
		.setPic("warriorMetalBoots.png"),

	new itemClass("speedy boots")
		.setType("boots")
		.setDamage(0)
		.setDefense(0)
		.setSpeed(5)
		.setAttackRate(-100)
		.setCost(600)
		.setNumGemSlots(1)
		.setPic("warriorSpeedyBoots.png"),

	new itemClass("basic wand")
		.setType("weapon")
		.setWeaponType("ranged")
		.setDamage(0)
		.setDefense(0)
		.setSpeed(1)
		.setAttackRate(-100)
		.setCost(700)
		.setNumGemSlots(2)	
		.addEffectFunction(createEffectCopy(lifeStealEffect).setPercent(5).setProbability(1))
		.addEffectFunction(createEffectCopy(knockbackEffect).setDistance(75).setSpeed(10).setProbability(1))
		.addEffectFunction(createEffectCopy(splashDamageEffect).setPercent(50).setDistance(50).setProbability(0.75))
		.setPic("basicWand.png"),

	new itemClass("orb wand")
		.setType("weapon")
		.setWeaponType("ranged")
		.setDamage(0.5)
		.setDefense(0)
		.setSpeed(2)
		.setAttackRate(-200)
		.setCost(1000)
		.setNumGemSlots(3)
		.addEffectFunction(createEffectCopy(splashDamageEffect).setPercent(80).setDistance(75).setProbability(0.9))
		.setPic("orbWand.png"),

	new itemClass("black stabbath")
		.setType("weapon")
		.setWeaponType("melee")
		.setDamage(10)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(-200)
		.setCost(850)
		.setNumGemSlots(3)
		.setPic("blackStabbath.png"),

	new itemClass("who's there?")
		.setType("weapon")
		.setWeaponType("melee")
		.setDamage(2)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(-200)
		.setCost(400)
		.setNumGemSlots(3)
		.addEffectFunction(createEffectCopy(knockbackEffect).setDistance(150).setSpeed(10).setProbability(0.75))
		.addEffectFunction(createEffectCopy(lifeStealEffect).setPercent(30).setProbability(1).setChanceToBind(0.5))
		.setPic("whiteSword.png"),

	new itemClass("put your hands up")
		.setType("weapon")
		.setWeaponType("melee")
		.setDamage(2)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(-200)
		.setCost(500)
		.setNumGemSlots(3)
		.addEffectFunction(createEffectCopy(freezeEffect).setDuration(2000).setProbability(0.75))
		.setPic("freezingSword.png"),

	new itemClass("boom, roasted")
		.setType("weapon")
		.setWeaponType("melee")
		.setDamage(2)
		.setDefense(0)
		.setSpeed(0)
		.setAttackRate(-200)
		.setCost(500)
		.setNumGemSlots(3)
		.addEffectFunction(createEffectCopy(burnEffect).setDuration(3000).setDPS(0.5).setProbability(0.75))
		.setPic("burningSword.png"),

	new itemClass("frequent flyer")
		.setType("armor")
		.setDamage(0)
		.setDefense(0.3)
		.setSpeed(2)
		.setAttackRate(-400)
		.setCost(500)
		.setNumGemSlots(1)
		.setBagScale(0.8)
		.addEffectFunction(createEffectCopy(speedIncreaseOnHitEffect).setSpeed(0.1).setDuration(5000).setProbability(0.5))
		.addEffectFunction(createEffectCopy(knockbackDefenseEffect).setDistance(50).setSpeed(10).setProbability(1).setChanceToBind(0.75))
		.setPic("frequentFlyerArmor.png"),

	new itemClass("stick n' poke")
		.setType("armor")
		.setDamage(0.8)
		.setDefense(1.2)
		.setSpeed(0)
		.setAttackRate(0)
		.setCost(500)
		.setNumGemSlots(1)
		.addEffectFunction(createEffectCopy(reflectDamageEffect).setPercent(100).setProbability(1))
		.setPic("spikeyArmor.png"),

	new itemClass("apple") 
		.setType("consumable")
		.setBagGraphics(2, 0, 2)
		.setEffect(appleEffect)
		.setUseCondition(appleUseCondition)
		.setCost(100)
		.setPic("appleSmall.png"),

	new itemClass("grapes") 
		.setType("consumable")
		.setBagGraphics(2, 0, 2)
		.setEffect(grapeEffect)
		.setUseCondition(grapeUseCondition)
		.setCost(100)
		.setPic("grapesSmall.png"),	

	new itemClass("cherries") 
		.setType("consumable")
		.setEffect(cherriesEffect)
		.setUseCondition(noUseCondition)
		.setCost(200)
		.setPic("cherries.png"),

	new itemClass("pineapple") 
		.setType("consumable")
		.setEffect(pineappleEffect)
		.setUseCondition(noUseCondition)
		.setCost(300)
		.setPic("pineapple.png"),

	new itemClass("banana") 
		.setType("consumable")
		.setEffect(bananaEffect)
		.setUseCondition(noUseCondition)
		.setCost(400)
		.setPic("banana.png")
];



