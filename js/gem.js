var allGems; //defined at bottom of this page

function Gem(name) {
	this.type = "gem"
	this.name = name;
	this.health = 0;
	this.mana = 0;
	this.damage = 0;
	this.defense = 0;
	this.speed = 0;
	this.attackRate = 0;
	this.cost;
	this.pic;
	this.bagOffsetX = 2;
	this.bagOffsetY = 0;
	this.bagScale = 1;

	this.effectFunctions = [];
}

Gem.prototype.setHealth = function(health) {
	this.health = health;
	return this;
};

Gem.prototype.setMana = function(mana) {
	this.mana = mana;
	return this;
};

Gem.prototype.setDamage = function(damage) {
	this.damage = damage;
	return this;
};

Gem.prototype.setDefense = function(defense) {
	this.defense = defense;
	return this;
};

Gem.prototype.setSpeed = function(speed) {
	this.speed = speed;
	return this;
};

Gem.prototype.setAttackRate = function(attackRate) {
	this.attackRate = attackRate;
	return this;
};

Gem.prototype.setCost = function(cost) {
	this.cost = cost;
	return this;
};

Gem.prototype.setPic = function(pic) {
	this.pic = {
		"Brute": pic,
		"Wizard": pic,
		"Nerd": pic
	};
	return this;
};

Gem.prototype.addEffectFunction = function(effectFunction) {
	this.effectFunctions.push(effectFunction); //effectFunction refers to the class
	return this;
};

allGems = [
	new Gem("basic health gem")
		.setHealth(0.1)
		.setCost(30)
		.setPic(redGemTrianglePic),

	new Gem("basic mana gem")
		.setMana(0.1)
		.setCost(30)
		.setPic(blueGemTrianglePic),

	new Gem("basic damage gem")
		.setDamage(0.2)
		.setCost(60)
		.setPic(blackGemTrianglePic),

	new Gem("basic speed gem")
		.setSpeed(0.2)
		.setCost(60)
		.setPic(greenGemTrianglePic),

	new Gem("basic defense gem")
		.setDefense(0.2)
		.setCost(90)
		.setPic(whiteGemTrianglePic),

	new Gem("basic attack rate gem")
		.setAttackRate(-20)
		.setCost(90)
		.setPic(purpleGemTrianglePic),



	new Gem("medium health gem")
		.setHealth(0.2)
		.setCost(50)
		.setPic(redGemDiamondPic),

	new Gem("medium mana gem")
		.setMana(0.2)
		.setCost(50)
		.setPic(blueGemDiamondPic),

	new Gem("medium damage gem")
		.setDamage(0.4)
		.setCost(100)
		.setPic(blackGemDiamondPic),

	new Gem("medium speed gem")
		.setSpeed(0.4)
		.setCost(100)
		.setPic(greenGemDiamondPic),

	new Gem("medium defense gem")
		.setDefense(0.4)
		.setCost(150)
		.setPic(whiteGemDiamondPic),

	new Gem("medium attack rate gem")
		.setAttackRate(-40)
		.setCost(150)
		.setPic(purpleGemDiamondPic),

	new Gem("advanced health gem")
		.setHealth(0.5)
		.setCost(100)
		.setPic(redGemPic),

	new Gem("advanced mana gem")
		.setMana(0.5)
		.setCost(100)
		.setPic(blueGemPic),

	new Gem("advanced damage gem")
		.setDamage(1)
		.setCost(200)
		.addEffectFunction(createEffectCopy(burnEffect).setDuration(3000).setDPS(0.5).setProbability(1))
		.setPic(blackGemPic),

	new Gem("advanced speed gem")
		.setSpeed(1)
		.setCost(200)
		.setPic(greenGemPic),

	new Gem("advanced defense gem")
		.setDefense(1)
		.setCost(300)
		.setPic(whiteGemPic),

	new Gem("advanced attack rate gem")
		.setAttackRate(-100)
		.setCost(300)
		.setPic(purpleGemPic),


];

