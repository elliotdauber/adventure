var selectedTab = null;

var invTabColor;
var statsTabColor;
var mapTabColor;
var questsTabColor;
var shopTabColor;

function handleTabClicks(mouseX, mouseY) {
	if (mouseInBounds(mouseX, mouseY, GC.INV_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H)) {
		selectedTab = "inventory";
	}
	if (mouseInBounds(mouseX, mouseY, GC.STATS_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H)) {
		selectedTab = "stats";
	}
	if (mouseInBounds(mouseX, mouseY, GC.MAP_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H)) {
		selectedTab = "map";
	}
	if (mouseInBounds(mouseX, mouseY, GC.QUESTS_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H)) {
		selectedTab = "quests";
	}
	if (mouseInBounds(mouseX, mouseY, GC.SHOP_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H)) {
		selectedTab = "shop";
	}
}

function setAllTabsToDefaultColor() {
	invTabColor = GC.TAB_UNSELECTED_COLOR;
	statsTabColor = GC.TAB_UNSELECTED_COLOR;
	mapTabColor = GC.TAB_UNSELECTED_COLOR;
	questsTabColor = GC.TAB_UNSELECTED_COLOR;
	shopTabColor = GC.TAB_UNSELECTED_COLOR;
}

function drawScreenTabs() {
	var lastFont = ctx.font;
	ctx.font = "15px Georgia";
	if (selectedTab != null) {
		setAllTabsToDefaultColor()
		if (selectedTab == "inventory") {
			showInventoryScreen();
			invTabColor = GC.TAB_SELECTED_COLOR;
		} else if (selectedTab == "stats") {
			showStatsScreen();
			statsTabColor = GC.TAB_SELECTED_COLOR;
		} else if (selectedTab == "map") { //a little buggy, doesn't always show all levels, especially when tab is clicked...(versus keyPress)
			showMap(allLevelsArray);
			mapTabColor = GC.TAB_SELECTED_COLOR;
		} else if (selectedTab == "quests") {
			showQuests();
			questsTabColor = GC.TAB_SELECTED_COLOR;
		} else if (selectedTab == "shop") {
			showShopScreen();
			shopTabColor = GC.TAB_SELECTED_COLOR;
		}
		ctx.save()
		ctx.translate(camPanX, camPanY);
		var lastFont = ctx.font;
		ctx.font = "15px Georgia";
		colorRect(GC.INV_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H, invTabColor);
		colorText("Inventory (V)", GC.INV_TAB_X + 35, GC.ALL_TABS_Y + 17, "#E0E0E0");

		colorRect(GC.STATS_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H, statsTabColor);
		colorText("Stats (B)", GC.STATS_TAB_X + 50, GC.ALL_TABS_Y + 17, "#E0E0E0");

		colorRect(GC.MAP_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H, mapTabColor);
		colorText("Map (N)", GC.MAP_TAB_X + 50, GC.ALL_TABS_Y + 17, "#E0E0E0");

		colorRect(GC.QUESTS_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H, questsTabColor);
		colorText("Quests (M)", GC.QUESTS_TAB_X + 40, GC.ALL_TABS_Y + 17, "#E0E0E0");

		if (warrior.shopping) {
			colorRect(GC.SHOP_TAB_X, GC.ALL_TABS_Y, GC.ALL_TABS_W, GC.ALL_TABS_H, shopTabColor);
			colorText("Shop (E)", GC.SHOP_TAB_X + 50, GC.ALL_TABS_Y + 17, "#E0E0E0");
		}
		ctx.font = lastFont;
		ctx.restore();
	}
}
