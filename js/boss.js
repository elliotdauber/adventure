function explodingProjectile(source, hostile) {
  return true;
}

function Bomb(source, hostile) {
    this.source = source;
    this.endX;
    this.endY;
    this.x = source.x;
    this.y = source.y;
    this.pic = bombPic;
    this.damage = source.attackDamage;
    this.speed = 20;
    this.range = 800; //pixels
    this.damageRange = 100;
    this.time = 2000;
    var self = this;
    this.index = projectiles.size(); //to make more general, choose projectiles array based on who is making it 
    projectiles.push(this);
    this.atDestination = false;

    this.findLocation = function() {
      while (true) {
        this.endX = Math.round(this.x + randomInt(-1000, 1000) * this.range * 0.001);
        this.endY = Math.round(this.y + randomInt(-1000, 1000) * this.range * 0.001);
        if (trackGrid[getIndexFromXY(this.endX, this.endY)] == TRACK_ROAD) {
          return;
        }
      }
    }

    this.findLocation();
    var currLevel = currentLevel;
    var time = this.time*randomInt(75, 125)*0.01;
    this.countdown = setTimeout(function() {if (currentLevel == currLevel) self.explode();
                 else projectiles.remove(self.index, 1);}, time); 

    this.explode = function() {
      if (hostile) {
        if (isAdjacentXY(this, warrior, this.damageRange, this.damageRange)) {
          warrior.takeDamage(this.damage, this.source);
        }
        if (isAdjacentXY(this, warrior.companion, this.damageRange, this.damageRange)) {
          warrior.companion.takeDamage(this.damage);
        }
      } else {
        for (var i = 0; i < enemies.length; i++) {
          if (isAdjacentXY(this, enemies[i], this.damageRange, this.damageRange)) {
            enemies[i].takeDamage(this.damage);
          }
        }
      }
      var whichSound = Math.random();
      if (whichSound < 0.33) {
        bombSound1.play();
      } else if (whichSound < 0.67) {
        bombSound2.play();
      } else {
        bombSound3.play();
      }
      colorCircle(this.x, this.y+10, this.damageRange, "white");
      projectiles.remove(this.index, 1);
    }

    this.move = function() {
      if (this.atDestination) {
        return;
      }
      var dX = this.endX - this.x;
      var dY = this.endY - this.y;
      var distToGo = Math.sqrt(dX*dX + dY*dY);
      var moveX = 0;
      var moveY = 0;
      if (distToGo <= 20) {
        this.atDestination = true;
        return;
      }
      moveX = this.speed * dX/distToGo;
      moveY = this.speed * dY/distToGo;
      this.x += moveX;
      this.y += moveY;
    }


    this.draw = function() {
      if (this.atDestination) {
        ctx.globalAlpha = 0.1;
        colorCircle(this.x, this.y+10, this.damageRange, "red");
        ctx.globalAlpha = 1.0;
      }
      drawImageRotatedScaled(this.pic, this.x, this.y, 0, 1);
    }
}

function bombBossAttack(source) {
  for (var i = 0; i < 50; i++) {
    new Bomb(source, true);
  }
  source.canAttack = false;
  return 4000; //cooldown
}

//could make more general for all enemy types
function spawnSpiderInRandomLocation() {
  var x;
  var y;
  while (true) {
    var x = randomInt(0, canvas.width);
    var y = randomInt(0, canvas.height);
    var index = getIndexFromXY(x, y);
    if (trackGrid[index] == TRACK_ROAD) {
      var newSpider = spawnSpider();
      trackGrid[index] = SPIDER_START;
      newSpider.reset();
      enemies.push(newSpider);
      return;
    }
  }
}

function bombBossSpiderSpawn(source) {
  var numSpiders = 0;
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].alive && enemies[i].picConstant == SPIDER_START) {
      numSpiders++;
    }
  }
  if (numSpiders > 15) {
    return 0;
  }
  for (var i = 0; i < 6; i++) {
    spawnSpiderInRandomLocation();
  }
  source.canAttack = false;
  return 6000;
}

function bossCageAttack(source) {
  if (warrior.caged) {
    return 0;
  }
  warrior.caged = true;
  var x = warrior.x;
  var y = warrior.y;
  var index = getIndexFromXY(x, y);
  var row = getRow(index);
  var col = getCol(index);
  var cageIndexes = [];
  for (var r = row - 1; r <= row + 1; r++) {
    for (var c = col - 1; c <= col + 1; c++) {
      var cageIndex = getIndex(c, r);
      if (cageIndex != index) {
        cageIndexes.push({
                          index: cageIndex, 
                          tile: trackGrid[cageIndex]
                        });
        trackGrid[cageIndex] = CAGE;
      }
    }
  }
  var currLevel = currentLevel;
  setTimeout(function() {
                if (currentLevel == currLevel) {
                  gridToChange = trackGrid;
                } else {
                  gridToChange = currLevel.mapArray;
                }
                for (var i = 0; i < cageIndexes.length; i++) {
                  var curr = cageIndexes[i];
                  gridToChange[curr.index] = curr.tile;
                  warrior.caged = false;
                }
             }, 7000);
  source.canAttack = false;
  return 1000;
}

function bossNormalProjectileAttack(source) {
  var currLevel = currentLevel;

  for (var i = 0; i < randomInt(10, 30); i++) {
    setTimeout(function() {
      if (currentLevel != currLevel) {
        return;
      }
      var projectile;
      var target;
      if (warrior.blocking && warrior.companion.alive && isAdjacent(warrior.companion, source, 20)) {
        target = warrior.companion;
      } else if (isAdjacent(warrior, source, 20)) {
        target = warrior;
      } else if (warrior.companion.alive && isAdjacent(warrior.companion, source, 20)) {
        target = warrior.companion;
      } else {
        return 0;
      }
      projectile = new projectileClass(source);
      projectile.radius = 15;
      projectiles.push(projectile);
      projectile.attack(target);
      source.canAttack = false;
    }, source.attackRate*i)
  }
  return 2000;
}

function drawBossHealth() {
  var currBoss = null;
  for (var i = 0; i < enemies.length; i++) { //could make bossExists property of the level
    if (enemies[i].isBoss) {
      currBoss = enemies[i];
    }
  }
  if (!currBoss || !currBoss.alive) {
    return;
  }
  var maxHealth = currBoss.maxHealth;
  var health = currBoss.health;
  var name = currBoss.name;
  var x = canvas.width/2-GC.BOSS_HEALTH_W/2;
  var healthPortionWidth = (health/maxHealth)*GC.BOSS_HEALTH_W

  ctx.save();
  ctx.translate(camPanX, camPanY);
  ctx.font = "30px Georgia";
  colorText(name, canvas.width/2-7*name.length, GC.BOSS_HEALTH_Y - 10, "white");
  ctx.globalAlpha = 0.7;
  colorRect(x, GC.BOSS_HEALTH_Y, healthPortionWidth, GC.BOSS_HEALTH_H, "#c62828");
  colorRect(x+healthPortionWidth, GC.BOSS_HEALTH_Y, GC.BOSS_HEALTH_W-healthPortionWidth, GC.BOSS_HEALTH_H, "#212121");
  ctx.restore();
}