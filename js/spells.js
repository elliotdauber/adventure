function Spell(name) {
	this.name = name;
	this.attackFunction;
	this.effectFunctions = [];
	this.manaCost;
	this.pic;
	this.displayPic;
	this.damage;
	this.speed;
	this.accuracy;
	this.attackRate;
	this.range;
	this.rank;
	this.prerequisites = []; 
	this.rankUpFunction;
	this.skillTreeX;
	this.skillTreeY;
	this.numBounces = 3;//only used for boucing spells
}

Spell.prototype.setDamage = function(damage) {
	this.damage = damage;
	return this;
};

Spell.prototype.setSpeed = function(speed) {
	this.speed = speed;
	return this;
};

Spell.prototype.setAccuracy = function(acc) {
	this.accuracy = acc;
	return this;
};

Spell.prototype.setAttackRate = function(attackRate) {
	this.attackRate = attackRate;
	return this;
};

Spell.prototype.setRange = function(range) {
	this.range = range;
	return this;
};

Spell.prototype.setPic = function(pic) {
	this.pic = pic;
	return this;
};

Spell.prototype.setDisplayPic = function(displayPic) {
	this.displayPic = displayPic;
	return this;
};

Spell.prototype.setRank = function(rank) {
	this.rank = rank;
	return this;
};

Spell.prototype.setNextSpells = function(spellArray) {
	this.nextSpells = spellArray;
	return this;
};

Spell.prototype.setAttackFunction = function(attackFunction) {
	this.attackFunction = attackFunction;
	return this;
};

Spell.prototype.setManaCost = function(manaCost) {
	this.manaCost = manaCost;
	return this;
};

Spell.prototype.setSkillTreeXY = function(x, y) {
	this.skillTreeX = x;
	this.skillTreeY = y;
	return this;
};

Spell.prototype.setPrerequisites = function(prerequisites) {
	this.prerequisites = prerequisites;
	return this;
};

Spell.prototype.setRankUpFunction = function(fn) {
	this.rankUpFunction = fn;
	return this;
};

// Spell.prototype.addSpecialAttackFunction = function(fn, paramsArray) {
// 	this.specialAttackFunctions.push({
// 										attackFunction: fn,
// 										params: paramsArray
// 									}) 
// 	return this;
// };

Spell.prototype.addEffectFunction = function(effectFunction) {
	this.effectFunctions.push(effectFunction); //effectFunction refers to the class
	return this;
};


function radialAF() {
	new charProjectile(warrior, warrior.x+1, warrior.y);
	new charProjectile(warrior, warrior.x+1, warrior.y+1);
	new charProjectile(warrior, warrior.x, warrior.y+1);
	new charProjectile(warrior, warrior.x-1, warrior.y+1);
	new charProjectile(warrior, warrior.x-1, warrior.y);
	new charProjectile(warrior, warrior.x-1, warrior.y-1);
	new charProjectile(warrior, warrior.x, warrior.y-1);
	new charProjectile(warrior, warrior.x+1, warrior.y-1);
}

function multishotAF(mouseX, mouseY) { //idea: increase num projectiles with rank
	console.log("multishot");
	var tan = (mouseY-warrior.y)/(mouseX/warrior.x);
	var angle = Math.abs(Math.atan(tan));
	new charProjectile(warrior, mouseX, mouseY);
	if ((angle >= Math.PI/4 && angle <= 3*Math.PI/4)) {
		 new charProjectile(warrior, mouseX+50, mouseY);
		 new charProjectile(warrior, mouseX-50, mouseY);
	} else {
		new charProjectile(warrior, mouseX, mouseY+50);
		new charProjectile(warrior, mouseX, mouseY-50);
	}
}

function basicAF(mouseX, mouseY) {
	new charProjectile(warrior, mouseX, mouseY);
}

function rotatingAF() {
	new rotatingProjectile(warrior, 50);
}

function bouncingAF(mouseX, mouseY) {
	new bouncingProjectile(warrior, mouseX, mouseY);
}

function spiralingAF(mouseX, mouseY) {
	new spiralingProjectile(warrior);
}

function meteorAF(mouseX, mouseY) {
	new meteorProjectile(warrior, mouseX, mouseY);
}

function setSkillTreeLocations() {
	fireballSpell.setSkillTreeXY(GC.FIRE_SPELL_1X, GC.SPELLS_FIRST_ROW_Y);
	lightningSpell.setSkillTreeXY(GC.LIGHTNING_SPELL_1X, GC.SPELLS_FIRST_ROW_Y);
	snowflakeSpell.setSkillTreeXY(GC.SNOWFLAKE_SPELL_1X, GC.SPELLS_FIRST_ROW_Y);
	fireballRadialSpell.setSkillTreeXY(GC.FIRE_SPELL_1X, GC.SPELLS_SECOND_ROW_Y);
	lightningRadialSpell.setSkillTreeXY(GC.LIGHTNING_SPELL_1X, GC.SPELLS_SECOND_ROW_Y);
	snowflakeRadialSpell.setSkillTreeXY(GC.SNOWFLAKE_SPELL_1X, GC.SPELLS_SECOND_ROW_Y);
	fireballMultishotSpell.setSkillTreeXY(GC.FIRE_SPELL_1X, GC.SPELLS_THIRD_ROW_Y);
	snowflakeRotatingSpell.setSkillTreeXY(GC.SNOWFLAKE_SPELL_1X, GC.SPELLS_THIRD_ROW_Y);
	lightningBouncingSpell.setSkillTreeXY(GC.LIGHTNING_SPELL_1X, GC.SPELLS_THIRD_ROW_Y);
	// fireballSpiralingSpell.setSkillTreeXY(GC.SNOWFLAKE_SPELL_1X, GC.SPELLS_FIRST_ROW_Y);
}

function rankUpDamage(spell) {
	spell.damage += 0.1;
}

function rankUpSpeed(spell) {
	spell.speed += 1;
}

function rankUpIncreaseBounces(spell) {
	spell.numBounces++;
}

var fireballSpell = new Spell("fireball")
						.setDamage(1)
						.setSpeed(10)
						.setRange(300)
						.setAccuracy(0.95)
						.setAttackRate(-200)
						.setRank(1)
						.setPic(fireballPic)
						.setDisplayPic(fireballPic)
						.setAttackFunction(basicAF)
						.setManaCost(0.5)
						.setRankUpFunction(rankUpDamage)
						.addEffectFunction(createEffectCopy(burnEffect).setDuration(3000).setDPS(0.5).setProbability(0.8))
						.setPrerequisites([]);

var lightningSpell = new Spell("lightning")
						.setDamage(0.5)
						.setSpeed(15)
						.setRange(500)
						.setAccuracy(0.5)
						.setAttackRate(-400)
						.setRank(1)
						.setPic(lightningPic)
						.setDisplayPic(lightningPic)
						.setAttackFunction(basicAF)
						.setManaCost(0.5)
						.setRankUpFunction(rankUpDamage)
						.setPrerequisites([]);

var snowflakeSpell = new Spell("snowflake")
						.setDamage(2)
						.setSpeed(5)
						.setRange(200)
						.setAccuracy(0.8)
						.setAttackRate(-300)
						.setRank(1)
						.setPic(snowflakePic)
						.setDisplayPic(snowflakePic)
						.setAttackFunction(basicAF)
						.setManaCost(0.5)
						.setRankUpFunction(rankUpDamage)
						.addEffectFunction(createEffectCopy(freezeEffect).setDuration(3000).setProbability(0.8))
						.setPrerequisites([]);


var fireballRadialSpell = new Spell("fireball radial")
						.setDamage(1)
						.setSpeed(4)
						.setRange(300)
						.setAccuracy(0.95)
						.setAttackRate(-200)
						.setRank(0)
						.setPic(fireballPic)
						.setDisplayPic(fireballRadialPic)
						.setAttackFunction(radialAF)
						.setManaCost(1.5)
						.setRankUpFunction(rankUpDamage)
						.addEffectFunction(createEffectCopy(burnEffect).setDuration(3000).setDPS(0.5).setProbability(1))
						.setPrerequisites([[fireballSpell, 1]]);

var lightningRadialSpell = new Spell("lightning radial")
						.setDamage(0.5)
						.setSpeed(10)
						.setRange(500)
						.setAccuracy(0.5)
						.setAttackRate(-400)
						.setRank(0)
						.setPic(lightningPic)
						.setDisplayPic(lightningRadialPic)
						.setAttackFunction(radialAF)
						.setManaCost(1.5)
						.setRankUpFunction(rankUpDamage)
						.setPrerequisites([[lightningSpell, 2]]);

var snowflakeRadialSpell = new Spell("snowflake radial")
						.setDamage(2)
						.setSpeed(5)
						.setRange(200)
						.setAccuracy(0.8)
						.setAttackRate(-300)
						.setRank(0)
						.setPic(snowflakePic)
						.setDisplayPic(snowflakeRadialPic)
						.setAttackFunction(radialAF)
						.setManaCost(1.5)
						.setRankUpFunction(rankUpDamage)
						.addEffectFunction(createEffectCopy(freezeEffect).setDuration(5000).setProbability(1))
						.setPrerequisites([[snowflakeSpell, 3]]);

var fireballMultishotSpell = new Spell("fireball multishot")
						.setDamage(2)
						.setSpeed(7)
						.setAccuracy(0.95)
						.setAttackRate(0)
						.setRank(0)
						.setPic(fireballPic)
						.setDisplayPic(fireballMultishotPic)
						.setManaCost(1)
						.setAttackFunction(multishotAF)
						.setRankUpFunction(rankUpDamage)
						.addEffectFunction(createEffectCopy(burnEffect).setDuration(3000).setDPS(0.5).setProbability(0.5))
						.setPrerequisites([[fireballRadialSpell, 2], [lightningRadialSpell, 2]]);

var snowflakeRotatingSpell = new Spell("snowflake rotating")
						.setDamage(0)
						.setSpeed(7)
						.setAccuracy(0.95)
						.setAttackRate(0)
						.setRank(0)
						.setPic(snowflakePic)
						.setDisplayPic(snowflakeRotatingPic)
						.setManaCost(5)
						.setAttackFunction(rotatingAF)
						.setRankUpFunction(rankUpSpeed)
						.addEffectFunction(createEffectCopy(freezeEffect).setDuration(1000).setProbability(1))
						.setPrerequisites([[snowflakeRadialSpell, 1]]);

var lightningBouncingSpell = new Spell("lightning bouncing")
						.setDamage(0)
						.setSpeed(10)
						.setRange(500)
						.setAccuracy(1.0)
						.setAttackRate(0)
						.setRank(0)
						.setPic(lightningPic)
						.setDisplayPic(lightningBouncingPic)
						.setManaCost(1)
						.setAttackFunction(bouncingAF)
						.setRankUpFunction(rankUpIncreaseBounces)
						.setPrerequisites([[lightningRadialSpell, 1]]);

var fireballSpiralingSpell = new Spell("fireball spiraling")
						.setDamage(0)
						.setSpeed(8)
						.setRange(200)
						.setAccuracy(1.0)
						.setAttackRate(-300)
						.setRank(0)
						.setPic(fireballPic)
						.setDisplayPic(fireballSpiralingPic)
						.setManaCost(1)
						.setAttackFunction(spiralingAF)
						.setRankUpFunction(rankUpDamage)
						.addEffectFunction(createEffectCopy(burnEffect).setDuration(3000).setDPS(0.5).setProbability(0.75))
						.setPrerequisites([[fireballMultishotSpell, 1]]);

var meteorSpell = new Spell("meteor")
						.setDamage(4)
						.setSpeed(4)
						.setRange(300)
						.setAccuracy(1)
						.setAttackRate(-300)
						.setRank(0)
						.setPic(fireballPic)
						.setDisplayPic(fireballPic)
						.setAttackFunction(meteorAF)
						.setManaCost(2.0)
						.setRankUpFunction(rankUpDamage)
						.addEffectFunction(createEffectCopy(burnEffect).setDuration(4000).setDPS(1).setProbability(1))
						.setPrerequisites([]);