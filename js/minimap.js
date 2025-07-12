function drawMinimap() {
  ctx.save();
  ctx.translate(camPanX, camPanY);
  var currIndex = getIndexFromXY(warrior.x, warrior.y);
  var minimapCols = Math.ceil((GC.MINIMAP_X+GC.MINIMAP_W)/TRACK_W);
  var minimapRows = Math.ceil((GC.MINIMAP_Y+GC.MINIMAP_H)/TRACK_H);
  var tScalar = 1;
  if (mouseOverMinimap || getCol(currIndex) < minimapCols && getRow(currIndex) < minimapRows) {
    tScalar = 0.5; //translucency scalar
  }

  if (warrior.x)
  ctx.globalAlpha = 0.3*tScalar;
  colorRect(GC.MINIMAP_X, GC.MINIMAP_Y, GC.MINIMAP_W, GC.MINIMAP_H, "black");
  ctx.globalAlpha = 0.7*tScalar;
  colorRect(GC.MINIMAP_MAIN_X, GC.MINIMAP_MAIN_Y, GC.MINIMAP_MAIN_W, GC.MINIMAP_MAIN_H, "#E0E0E0");

  var curr = currentLevel;
  if (curr.north) {
      var connectX = GC.MINIMAP_MAIN_X + (getCol(curr.mapArray.indexOf(NORTH)))*GC.MINIMAP_WALL_DIM - 3*GC.MINIMAP_CONNECT_W/8;
      colorRect(connectX, GC.MINIMAP_MAIN_Y, GC.MINIMAP_CONNECT_W, -(GC.MINIMAP_MAIN_Y-GC.MINIMAP_Y), "coral");
  } 
  if (curr.south) {
      var connectX = GC.MINIMAP_MAIN_X + (getCol(curr.mapArray.indexOf(SOUTH)))*GC.MINIMAP_WALL_DIM - 3*GC.MINIMAP_CONNECT_W/8;
      colorRect(connectX, GC.MINIMAP_MAIN_Y+GC.MINIMAP_MAIN_H, GC.MINIMAP_CONNECT_W, GC.MINIMAP_MAIN_Y-GC.MINIMAP_Y, "coral");
  }
  if (curr.east) {
      var connectY = GC.MINIMAP_MAIN_Y + (getRow(curr.mapArray.indexOf(EAST)))*GC.MINIMAP_WALL_DIM - 3*GC.MINIMAP_CONNECT_W/8;
      colorRect(GC.MINIMAP_MAIN_X+GC.MINIMAP_MAIN_W, connectY, GC.MINIMAP_MAIN_X-GC.MINIMAP_X, GC.MINIMAP_CONNECT_W, "coral");
  }
  if (curr.west) {
      var connectY = GC.MINIMAP_MAIN_Y + (getRow(curr.mapArray.indexOf(WEST)))*GC.MINIMAP_WALL_DIM - 3*GC.MINIMAP_CONNECT_W/8;
      colorRect(GC.MINIMAP_MAIN_X, connectY, -(GC.MINIMAP_MAIN_X-GC.MINIMAP_X), GC.MINIMAP_CONNECT_W, "coral");
  }

  var referenceArray = curr.mapArray.slice();
  for (var i = 0; i < referenceArray.length; i++) {
    var tile = referenceArray[i];
    if (tile == 1) {
      var wallCol = i%TRACK_COLS;
      var wallRow = Math.floor(i/TRACK_COLS);
      colorRect(GC.MINIMAP_MAIN_X + wallCol*GC.MINIMAP_WALL_DIM, GC.MINIMAP_MAIN_Y + wallRow*GC.MINIMAP_WALL_DIM, GC.MINIMAP_WALL_DIM, GC.MINIMAP_WALL_DIM, "#777777");
    }
  }

  var scaleX = GC.MINIMAP_MAIN_W/(TRACK_COLS*TRACK_W);
  var scaleY = GC.MINIMAP_MAIN_H/(TRACK_ROWS*TRACK_H);

  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) {
      var size = 2;
      if (enemies[i].isBoss) {
        size = 4;
      }
      colorCircle(GC.MINIMAP_MAIN_X+enemies[i].x*scaleX, GC.MINIMAP_MAIN_Y+enemies[i].y*scaleY, size, "red");
    }
  }

  if (warrior.companion.alive) {
     colorCircle(GC.MINIMAP_MAIN_X+warrior.companion.x*scaleX, GC.MINIMAP_MAIN_Y+warrior.companion.y*scaleY, 3, "lightblue");
  }

  //NPC markers
  for (var i = 0; i < curr.NPCArray.length; i++) {
    var currNPC = curr.NPCArray[i];
    if (currNPC.exclamation) {
      drawImageRotatedScaled(questExclamationPic, GC.MINIMAP_MAIN_X+currNPC.x*scaleX, GC.MINIMAP_MAIN_Y+currNPC.y*scaleY, 0, 0.4);
    } else if (currNPC.question) {
      drawImageRotatedScaled(questQuestionPic, GC.MINIMAP_MAIN_X+currNPC.x*scaleX, GC.MINIMAP_MAIN_Y+currNPC.y*scaleY, 0, 0.4);
    } else {
      colorCircle(GC.MINIMAP_MAIN_X+currNPC.x*scaleX, GC.MINIMAP_MAIN_Y+currNPC.y*scaleY, 3, "green");
    }
  }

  //warrior
  colorCircle(GC.MINIMAP_MAIN_X+warrior.x*scaleX, GC.MINIMAP_MAIN_Y+warrior.y*scaleY, 5, "blue");

  coloredOutlineRectCorners(GC.MINIMAP_X, GC.MINIMAP_Y, GC.MINIMAP_X+GC.MINIMAP_W, GC.MINIMAP_Y+GC.MINIMAP_H, "white");

  ctx.restore();
}
