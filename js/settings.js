var applesAutomatic = false;
var grapesAutomatic = false;
var showingMinimap = true;

var minGameDifficulty = 0.5;
var maxGameDifficulty = 3;
var gameDifficulty = 1;

function showSettings() {
  ctx.save();
  ctx.font = "40px Georgia";
  colorRect(GC.MAP_X-5, GC.MAP_Y-5, GC.MAP_W+10, GC.MAP_H+10, "#828282");
  colorRect(GC.MAP_X, GC.MAP_Y, GC.MAP_W, GC.MAP_H, "#565656");
  colorText("SETTINGS", GC.MAP_X+GC.MAP_W/2-100, GC.MAP_Y+50, "#E0E0E0");

  ctx.font = "25px Georiga";
  showAudioSliders();
  showAppleSettings();
  showGrapeSettings();
  showGameDifficultySlider();
  showMinimapSettings();
  ctx.restore();
}

function showAppleSettings() {
  var buttonColor = "#E0E0E0";
  if (applesAutomatic) {
    buttonColor = "green";
  }
  colorText("Pick Up Apples Automatically:", GC.APPLES_AUTOMATIC_X-330, GC.APPLES_AUTOMATIC_Y+17, "#E0E0E0");
  colorRect(GC.APPLES_AUTOMATIC_X, GC.APPLES_AUTOMATIC_Y, GC.SETTINGS_BUTTONS_W, GC.SETTINGS_BUTTONS_H, buttonColor);
}

function showGrapeSettings() {
  var buttonColor = "#E0E0E0";
  if (grapesAutomatic) {
    buttonColor = "green";
  }
  colorText("Pick Up Grapes Automatically:", GC.GRAPES_AUTOMATIC_X-330, GC.GRAPES_AUTOMATIC_Y+17, "#E0E0E0");
  colorRect(GC.GRAPES_AUTOMATIC_X, GC.GRAPES_AUTOMATIC_Y, GC.SETTINGS_BUTTONS_W, GC.SETTINGS_BUTTONS_H, buttonColor);
}

function showMinimapSettings() {
  var buttonColor = "#E0E0E0";
  if (showingMinimap) {
    buttonColor = "green";
  }
  colorText("Show Minimap:", GC.MINIMAP_TOGGLE_X-230, GC.MINIMAP_TOGGLE_Y+17, "#E0E0E0");
  colorRect(GC.MINIMAP_TOGGLE_X, GC.MINIMAP_TOGGLE_Y, GC.SETTINGS_BUTTONS_W, GC.SETTINGS_BUTTONS_H, buttonColor);
}

function handleSettingsClicks(mouseX, mouseY) {
  //doesn't include sliders -- audioAdv
  if (mouseInBounds(mouseX, mouseY, GC.APPLES_AUTOMATIC_X, GC.APPLES_AUTOMATIC_Y, GC.SETTINGS_BUTTONS_W, GC.SETTINGS_BUTTONS_H)){
    applesAutomatic = !applesAutomatic;
  } else if (mouseInBounds(mouseX, mouseY, GC.GRAPES_AUTOMATIC_X, GC.GRAPES_AUTOMATIC_Y, GC.SETTINGS_BUTTONS_W, GC.SETTINGS_BUTTONS_H)){
    grapesAutomatic = !grapesAutomatic;
  } else if (mouseInBounds(mouseX, mouseY, GC.MINIMAP_TOGGLE_X, GC.MINIMAP_TOGGLE_Y, GC.SETTINGS_BUTTONS_W, GC.SETTINGS_BUTTONS_H)){
    showingMinimap = !showingMinimap;
  }
}

function showGameDifficultySlider() {
  //music
  colorRect(GC.SLIDER_X, GC.DIFF_SLIDER_Y, GC.SLIDER_LENGTH, GC.SLIDER_HEIGHT, "#E0E0E0");
  colorText("Game Difficulty", (GC.SLIDER_LENGTH/2)+GC.SLIDER_X-75, GC.DIFF_SLIDER_Y+GC.SLIDER_HEIGHT*4, "#E0E0E0");
  colorCircle(GC.SLIDER_X, GC.DIFF_SLIDER_Y+GC.SLIDER_HEIGHT/2, GC.SLIDER_HEIGHT/2, "#E0E0E0");
  colorCircle(GC.SLIDER_X+GC.SLIDER_LENGTH, GC.DIFF_SLIDER_Y+GC.SLIDER_HEIGHT/2, GC.SLIDER_HEIGHT/2, "#E0E0E0");

  var sliderX = (gameDifficulty-minGameDifficulty)/(maxGameDifficulty-minGameDifficulty);
  colorCircle(sliderX*GC.SLIDER_LENGTH + GC.SLIDER_X, GC.DIFF_SLIDER_Y+GC.SLIDER_HEIGHT/2, GC.SLIDER_RADIUS, "green");
}
