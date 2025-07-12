// var statsCanvas, statsCtx;

// function statsCanvasSetup() {
// 	statsCanvas = document.getElementById('statsCanvas');
// 	statsCtx = statsCanvas.getContext('2d');
// 	statsCtx.font = "15px Georgia";

// 	statsCanvas.addEventListener('mousedown', clickStats);
// }

// function clickStats(evt) {
// 	if (showingStats) {
// 		showingStats = false;
// 	} else {
// 		showingStats = true;
// 	}
// }

// function showStats() {
// 	colorRect(0, 0, statsCanvas.width, statsCanvas.height, "#E0E0E0", statsCtx);
// 	coloredOutlineRectCorners(0, 0, statsCanvas.width, statsCanvas.height, "black", statsCtx);
// 	colorText("STATS", GC.STATS_INDENT, GC.STATS_LINE_HEIGHT, "black", statsCtx);
// 	colorText("Health: "+transformHealth(warrior.health), GC.STATS_INDENT,
// 			  GC.STATS_LINE_HEIGHT*2, "black", statsCtx);
// 	colorText("Mana: "+transformMana(warrior.mana), GC.STATS_INDENT,
// 			  GC.STATS_LINE_HEIGHT*3, "black", statsCtx);
// 	colorText("Damage: "+transformDamage(warrior.damage), GC.STATS_INDENT,
// 			  GC.STATS_LINE_HEIGHT*4, "black", statsCtx);
// 	colorText("Defense: "+transformDefense(warrior.defense), GC.STATS_INDENT,
// 			  GC.STATS_LINE_HEIGHT*5, "black", statsCtx);
// 	colorText("Attack Rate: "+transformAttackRate(warrior.attackRate), GC.STATS_INDENT,
// 			  GC.STATS_LINE_HEIGHT*6, "black", statsCtx);
// 	colorText("Speed: "+transformSpeed(warrior.speed), GC.STATS_INDENT,
// 			  GC.STATS_LINE_HEIGHT*7, "black", statsCtx);
// 	colorText("Experience: "+warrior.exp+ " (level "+(Math.floor(warrior.exp/warrior.levelExp)+1)+ ")", 
// 				GC.STATS_INDENT, GC.STATS_LINE_HEIGHT*8, "black", statsCtx);
// }

// function dontShowStats() {
// 	colorRect(0, 0, statsCanvas.width, statsCanvas.height, "#565656", statsCtx);
// 	colorRect(0, 0, 90, 40, "#E0E0E0", statsCtx);
// 	coloredOutlineRectCorners(0, 0, 90, 40, "black", statsCtx);
// 	colorText("STATS", GC.STATS_INDENT, GC.STATS_LINE_HEIGHT, "black", statsCtx);
// }

// function statsCanvasHandling() {
// 	if (showingStats) {
// 		showStats();
// 	} else {
// 		dontShowStats();
// 	}
// }