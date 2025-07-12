function Aura(name) {
	this.name = name;
	this.manaCost = 0;
	this.healthCost = 0;
	this.pic;
	this.displayPic;
	this.damage = 0;
	this.defense = 0;
	this.attackRate = 0;
	this.speed = 0;
	this.health = 0;
	this.mana = 0;
	this.duration;
	this.range; //tiles, not implemented yet
	this.rank;
	this.prerequisites = []; 
	this.rankUpFunction;
	this.auraTreeX;
	this.auraTreeY;
	this.angle = 0;
	this.source;
	this.cooldown; //not implemented yet

	this.hasInterval = false;
	this.intervalTime;
	this.intervalFunction;
	this.interval;

	this.effectFunctions = [];

	this.begin = function(source) {
		if (source.mana < this.manaCost) {
			return;
		}
		this.source = source;
		this.source.activeAura = this;
		this.source.mana -= this.manaCost;
		this.source.health -= this.healthCost;
		this.source.baseDamage += this.damage;
		this.source.baseDefense += this.defense;
		this.source.baseSpeed += this.speed;
		this.source.baseAttackRate += this.attackRate;
		this.source.maxHealth += this.health;
		this.source.health += this.health;
		this.source.maxMana += this.mana;
		this.source.mana += this.mana;
		this.source.setValuesFromInventory();
		if (this.hasInterval) {
			var fn = this.intervalFunction;
			this.interval = setInterval(fn, this.intervalTime);
		}
		setTimeout(function() {source.activeAura.end();}, this.duration);
	}

	this.end = function() {
		this.source.baseDamage -= this.damage;
		this.source.baseDefense -= this.defense;
		this.source.baseSpeed -= this.speed;
		this.source.baseAttackRate -= this.attackRate;
		this.source.maxHealth -= this.health;
		this.source.health -= this.health;
		this.source.maxMana -= this.mana;
		this.source.mana -= this.mana;
		this.source.setValuesFromInventory();
		if (this.hasInterval) {
			clearInterval(this.interval);
		}
		this.source.activeAura = null;
	}

	this.draw = function() {
		this.angle += 0.01;
		drawImageRotatedScaled(this.pic, this.source.x, this.source.y+25, this.angle, 1.5);
	}
}

Aura.prototype.setHealth = function(health) {
	this.health = health;
	return this;
};

Aura.prototype.setMana = function(mana) {
	this.mana = mana;
	return this;
};

Aura.prototype.setDamage = function(damage) {
	this.damage = damage;
	return this;
};

Aura.prototype.setSpeed = function(speed) {
	this.speed = speed;
	return this;
};

Aura.prototype.setDefense = function(def) {
	this.defense = def;
	return this;
};

Aura.prototype.setAttackRate = function(attackRate) {
	this.attackRate = attackRate;
	return this;
};

Aura.prototype.setRange = function(range) {
	this.range = range;
	return this;
};

Aura.prototype.setDuration = function(duration) {
	this.duration = duration;
	return this;
};

Aura.prototype.setPic = function(pic) {
	this.pic = pic;
	return this;
};

Aura.prototype.setDisplayPic = function(displayPic) {
	this.displayPic = displayPic;
	return this;
};

Aura.prototype.setRank = function(rank) {
	this.rank = rank;
	return this;
};

Aura.prototype.setManaCost = function(manaCost) {
	this.manaCost = manaCost;
	return this;
};

Aura.prototype.setAuraTreeXY = function(x, y) {
	this.auraTreeX = x;
	this.auraTreeY = y;
	return this;
};

Aura.prototype.setPrerequisites = function(prerequisites) {
	this.prerequisites = prerequisites;
	return this;
}

Aura.prototype.setRankUpFunction = function(fn) {
	this.rankUpFunction = fn;
	return this;
}

Aura.prototype.setIntervalData = function(fn, time) {
	this.hasInterval = true;
	this.intervalFunction = fn;
	this.intervalTime = time;
	return this;
}

Aura.prototype.addEffectFunction = function(effectFunction) {
	this.effectFunctions.push(effectFunction); //effectFunction refers to the class
	return this;
};


function setAuraTreeLocations() {
	healthAura.setAuraTreeXY(GC.FIRE_SPELL_1X, GC.SPELLS_FIRST_ROW_Y);
	damageAura.setAuraTreeXY(GC.LIGHTNING_SPELL_1X, GC.SPELLS_FIRST_ROW_Y);
	defenseAura.setAuraTreeXY(GC.SNOWFLAKE_SPELL_1X, GC.SPELLS_FIRST_ROW_Y);
	healthRegenAura.setAuraTreeXY(GC.FIRE_SPELL_1X, GC.SPELLS_SECOND_ROW_Y);
	// lightningRadialSpell.setAuraTreeXY(GC.LIGHTNING_SPELL_1X, GC.SPELLS_SECOND_ROW_Y);
	// snowflakeRadialSpell.setAuraTreeXY(GC.SNOWFLAKE_SPELL_1X, GC.SPELLS_SECOND_ROW_Y);
	// fireballMultishotSpell.setAuraTreeXY(GC.FIRE_SPELL_1X, GC.SPELLS_THIRD_ROW_Y);
	// snowflakeRotatingSpell.setAuraTreeXY(GC.SNOWFLAKE_SPELL_1X, GC.SPELLS_THIRD_ROW_Y);
	// lightningBouncingSpell.setAuraTreeXY(GC.LIGHTNING_SPELL_1X, GC.SPELLS_THIRD_ROW_Y);
	// fireballSpiralingSpell.setAuraTreeXY(GC.FIRE_SPELL_1X, GC.SPELLS_FOURTH_ROW_Y);
}

function rankUpHealth(aura) {
	aura.health += 2;
}

function rankUpDefense(aura) {
	aura.defense += 0.5;
}

function rankUpDamage(aura) {
	aura.damage += 0.5;
}

function rankUpHealthRegen(aura) {
	aura.intervalTime /= 4;
}

function healthRegenInterval() {
	warrior.health += 0.03;
	if (warrior.health > warrior.maxHealth) {
		warrior.health = warrior.maxHealth
	}
} 

var healthAura = new Aura("health")
						.setRange(3) //not used yet
						.setHealth(5)
						.setRank(1)
						.setPic(healthAuraPic)
						.setDisplayPic(healthAuraDisplayPic)
						.setManaCost(0.5)
						.setDuration(10000)
						.setRankUpFunction(rankUpHealth)
						.setPrerequisites([]);

var healthRegenAura = new Aura("health regeneration")
						.setRange(3) //not used yet
						.setRank(0)
						.setPic(healthRegenAuraPic)
						.setDisplayPic(healthRegenAuraDisplayPic)
						.setManaCost(3)
						.setDuration(5000)
						.setRankUpFunction(rankUpHealthRegen)
						.setIntervalData(healthRegenInterval, 50)
						.setPrerequisites([[healthAura, 1]]);

var defenseAura = new Aura("defense")
						.setRange(3) //not used yet
						.setDefense(1)
						.setRank(1)
						.setPic(defenseAuraPic)
						.setDisplayPic(defenseAuraDisplayPic)
						.setManaCost(5)
						.setDuration(10000)
						.setRankUpFunction(rankUpDefense)
						.addEffectFunction(createEffectCopy(burnDefenseEffect).setDuration(5000).setDPS(0.5).setProbability(1))
						.addEffectFunction(createEffectCopy(knockbackDefenseEffect).setDistance(20).setSpeed(8).setProbability(1))
						.setPrerequisites([]);

var damageAura = new Aura("damage")
						.setRange(3) //not used yet
						.setDamage(1.5)
						.setRank(1)
						.setPic(damageAuraPic)
						.setDisplayPic(damageAuraDisplayPic)
						.setManaCost(5)
						.setDuration(10000)
						.setRankUpFunction(rankUpDamage)
						.setPrerequisites([]);

