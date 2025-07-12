var firstQuestStory = ["Hi, I've lost my toy cars. Can you help me find them?",
						"Thanks! I think I left them somewhere in this room."];

var firstQuestCompletion = "Thank you for finding my toy cars!";

var heartQuestStory = ["Now that I have my cars back,I seem to have lost my heart.",
						"Can you please help me find my heart?"];

var heartQuestCompletion = "Thank you, I was starting to get worried about that one ... Well that's all I needed, thanks again";

var baseballQuestStory = ["Fuck, I promised my friends I would go play baseball with them, but I lost my equipment.",
						  "Can you find it for me?",
						  "I have my glove, but I lost by ball and my bat",
						  "Thanks, my dad's super rich so I'll get him to pay you when you find my things!"];

var baseballQuestCompletion = ["Thanks so much, I thought I'd never find it. Dad, pay him!"];


var selectedQuestOption = null;


var questMouseovers = [false, false, false, false, false, false, false, false]; //not really scalable, but works for now

var selectedQuest = null;

var showingQuestFinish = false;
var showingQuestIncomplete = false;
var showingOutOfQuests = false;
var showingQuestNotReady = false;

function drawQuestItems() {
	for (var i = 0; i < currentLevel.questItemsArray.length; i++) {
		currentLevel.questItemsArray[i].draw();
	}
}

function handleQuestScreenMousemove(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	for (var i = 0; i < warrior.numQuests + warrior.completedQuests.length; i++) {
		var y = GC.MAP_Y+45+i*(40+GC.GAP_Y);
		if (mouseInBounds(mouseX, mouseY, GC.QUEST_BUTTONS_X, y, GC.QUEST_BUTTONS_W, GC.QUEST_BUTTONS_H)) {
			questMouseovers[i] = true;
		} else {
			questMouseovers[i] = false;
		}
	}

}

function handleQuestScreenClicks(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	for (var i = 0; i < warrior.numQuests + warrior.completedQuests.length; i++) {
		var y = GC.MAP_Y+45+i*(40+GC.GAP_Y);
		if (mouseInBounds(mouseX, mouseY, GC.QUEST_BUTTONS_X, y, GC.QUEST_BUTTONS_W, GC.QUEST_BUTTONS_H)) {
			if (i < warrior.numQuests) {
				selectedQuest = warrior.quests[i];
			} else {
				selectedQuest = warrior.completedQuests[i-warrior.numQuests];
			} 
		}
	}

	if (mouseInBounds(mouseX, mouseY, GC.DIALOGUE_BUTTON_X, GC.QUEST_OPTIONS_BUTTONS_Y, GC.QUEST_OPTIONS_BUTTONS_W, GC.QUEST_OPTIONS_BUTTONS_H)) {
		selectedQuestOption = "Dialogue";
	} else if (mouseInBounds(mouseX, mouseY, GC.REQS_BUTTON_X, GC.QUEST_OPTIONS_BUTTONS_Y, GC.QUEST_OPTIONS_BUTTONS_W, GC.QUEST_OPTIONS_BUTTONS_H)) {
		selectedQuestOption = "Requirements";
	} else if (mouseInBounds(mouseX, mouseY, GC.REWARDS_BUTTON_X, GC.QUEST_OPTIONS_BUTTONS_Y, GC.QUEST_OPTIONS_BUTTONS_W, GC.QUEST_OPTIONS_BUTTONS_H)) {
		selectedQuestOption = "Rewards";
	} else if (selectedQuest && mouseInBounds(mouseX, mouseY, GC.QUEST_MAP_OPTION_X, GC.QUEST_MAP_OPTION_Y, GC.QUEST_MAP_OPTION_W, GC.QUEST_MAP_OPTION_H)) {
		selectedQuest.showingOnMap = !selectedQuest.showingOnMap;
	}
}

function checkForQuestItemsAtStart(quest) {
	for (var i = 0; i < quest.conditionList.length; i++) {
		var numInBag = howManyInQuestBag(quest.conditionList[i].name);
		quest.conditionList[i].reduceCounter(numInBag);
	}
}

function arrayToListString(array) {
	var str = "";
	for (var i = 0; i < array.length; i++) {
		str += array[i];
		if (i != array.length-1) {
			str+= ", ";
		}
	}
	return str;
}

function showQuestOptions() {
	var lastFont = ctx.font;
	const LINE_SPACE_QUEST_OPTIONS_BOX = 20;
	if (selectedQuestOption == null) {
		return;
	}

	if (selectedQuestOption == "Dialogue") {
		var linesMade = 0;
		for (var i = 0; i < selectedQuest.story.length; i++) {
			var line = selectedQuest.story[i];
			var numLines = Math.ceil(line.length / 60);
			var firstIndex = 0;
			for (var j = 0; j < numLines; j++) {
				var lastIndex;
				if (j == 0) {
					lastIndex = firstIndex + 60;
				} else {
					lastIndex = firstIndex + 55;
				}
				while (lastIndex != line.length-1 && line[lastIndex] != " ") {
					lastIndex--;
				}
				var sub = line.substring(firstIndex, lastIndex+1);
				if (j == 0) {
					colorText(sub, GC.DISPLAY_BOX_X + 20, GC.DISPLAY_BOX_Y+20+(LINE_SPACE_QUEST_OPTIONS_BOX*linesMade), "#E0E0E0");
				} else {
					colorText(sub, GC.DISPLAY_BOX_X + 40, GC.DISPLAY_BOX_Y+20+(LINE_SPACE_QUEST_OPTIONS_BOX*linesMade), "#E0E0E0");
				}
				firstIndex = lastIndex + 1;
				linesMade++;
			}
			// colorText(selectedQuest.story[i], GC.DISPLAY_BOX_X + 20, GC.DISPLAY_BOX_Y+20+(LINE_SPACE_QUEST_OPTIONS_BOX*i), "white");
		}
	} else if (selectedQuestOption == "Requirements") {
		ctx.font = "25px Georgia";
		for (var i = 0; i < selectedQuest.conditionList.length; i++) {
			var currCondition = selectedQuest.conditionList[i];
			drawImageRotatedScaled(currCondition.pic, GC.DISPLAY_BOX_X + 30, GC.DISPLAY_BOX_Y+30+((LINE_SPACE_QUEST_OPTIONS_BOX+15)*i), 0, 1);
			colorText(currCondition.total - currCondition.counter + " / " + currCondition.total, GC.DISPLAY_BOX_X + 75, 
				GC.DISPLAY_BOX_Y+35+((LINE_SPACE_QUEST_OPTIONS_BOX+15)*i), "#E0E0E0");
		}
		ctx.font = "20px Georgia";
		if (selectedQuest.bossesConditionList.length > 0) {
			colorText("Bosses: "+arrayToListString(selectedQuest.bossesConditionList), GC.DISPLAY_BOX_X + 10, 
				GC.DISPLAY_BOX_Y+GC.DISPLAY_BOX_H - 10, "#E0E0E0");
		}
	} else if (selectedQuestOption == "Rewards") {
		ctx.font = "20px Georgia";
		var rowsMade = 0;
		if (selectedQuest.expYield > 0) {
			colorText("Experience: "+selectedQuest.expYield, GC.DISPLAY_BOX_X + 10, GC.DISPLAY_BOX_Y+25*(rowsMade+1), "#E0E0E0");
			rowsMade++;
		}
		if (selectedQuest.coinYield > 0) {
			colorText("Coins: "+selectedQuest.coinYield, GC.DISPLAY_BOX_X + 10, GC.DISPLAY_BOX_Y+25*(rowsMade+1), "#E0E0E0");
			rowsMade++;
		}
		if (selectedQuest.itemYield.length > 0) {
			colorText("Items", GC.DISPLAY_BOX_X + 10, GC.DISPLAY_BOX_Y+25*(rowsMade+1), "#E0E0E0");
			rowsMade++;
		}
		ctx.font = "15px Georgia";
		for (var i = 0; i < selectedQuest.itemYield.length; i++) {
			var item = selectedQuest.itemYield[i];
			drawImageRotatedScaled(item.pic[warrior.class], GC.DISPLAY_BOX_X + 30 + item.bagOffsetX, GC.DISPLAY_BOX_Y+25*(rowsMade+1) + (55*i) + item.bagOffsetY, 0, item.bagScale);
			colorText(item.name, GC.DISPLAY_BOX_X + 75, GC.DISPLAY_BOX_Y+25*(rowsMade+1) + (55*i), "#E0E0E0");
		}
	}
	ctx.font = lastFont;
}

function handleQuestDialogue() {
	ctx.save();
	ctx.translate(camPanX, camPanY);
	ctx.font = "20px Georgia"
	ctx.globalAlpha = 0.6;
	colorRect(GC.DIALOGUE_BOX_X, GC.DIALOGUE_BOX_Y, GC.DIALOGUE_BOX_W, GC.DIALOGUE_BOX_H, "black");
	ctx.globalAlpha = 1.0;
	coloredOutlineRectCorners(GC.DIALOGUE_BOX_X, GC.DIALOGUE_BOX_Y, GC.DIALOGUE_BOX_X+GC.DIALOGUE_BOX_W, GC.DIALOGUE_BOX_Y+GC.DIALOGUE_BOX_H, "white");

	var dialogueX = GC.DIALOGUE_BOX_X + 20
	var dialogueY = GC.DIALOGUE_BOX_Y + 30;

	colorText("Leave: Esc", GC.DIALOGUE_BOX_X+15, GC.DIALOGUE_BOX_Y+GC.DIALOGUE_BOX_H-15, "#E0E0E0");
	colorText("Continue: E", GC.DIALOGUE_BOX_X+GC.DIALOGUE_BOX_W-120, GC.DIALOGUE_BOX_Y+GC.DIALOGUE_BOX_H-15, "#E0E0E0");

	var quest = warrior.currentNPC.quests[warrior.currentNPC.currentQuestNum];

	if (showingOutOfQuests) {
		colorText("I don't have any more quests for you.", dialogueX, dialogueY, "#E0E0E0");
	} else if (showingQuestFinish) {
		colorText(quest.completionText, dialogueX, dialogueY, "#E0E0E0");
	} else if (showingQuestIncomplete) {
		colorText("Quest requirements not met.", dialogueX, dialogueY, "#E0E0E0");
	} else if (showingQuestNotReady) {
		colorText("Check back later for more quests.", dialogueX, dialogueY, "#E0E0E0");
	} else if (!quest.givenQuest) {
		var line = quest.story[warrior.questDialogueIndex]
		var numLines = Math.ceil(line.length / 70);
		var firstIndex = 0;
		for (var i = 0; i < numLines; i++) {
			var lastIndex = firstIndex + 75;
			while (lastIndex != line.length-1 && line[lastIndex] != " ") {
				lastIndex--;
			}
			var sub = line.substring(firstIndex, lastIndex+1);
			colorText(sub, dialogueX, dialogueY + i*25, "#E0E0E0");
			firstIndex = lastIndex + 1;
		}
	}
	ctx.restore();
}

function showQuestOptionsBox() {
	var dialogueBoxColor;
	var requirementsBoxColor;
	var rewardsBoxColor;
	var dialogueButtonHeight = GC.QUEST_OPTIONS_BUTTONS_H;
	var requirementsButtonHeight = GC.QUEST_OPTIONS_BUTTONS_H;
	var rewardsButtonHeight = GC.QUEST_OPTIONS_BUTTONS_H;
	if (selectedQuestOption == "Dialogue") {
		dialogueBoxColor = "#565656";
		dialogueTextColor = "white";
		dialogueButtonHeight += 6;
	} else {
		dialogueBoxColor = "#E0E0E0";
		dialogueTextColor = "black"
	}

	if (selectedQuestOption == "Requirements") {
		requirementsBoxColor = "#565656";
		requirementsTextColor = "white";
		requirementsButtonHeight += 6;
	} else {
		requirementsBoxColor = "#E0E0E0";
		requirementsTextColor = "black"
	}

	if (selectedQuestOption == "Rewards") {
		rewardsBoxColor = "#565656";
		rewardsTextColor = "white";
		rewardsButtonHeight += 6;
	} else {
		rewardsBoxColor = "#E0E0E0";
		rewardsTextColor = "black"
	}

	colorRect(GC.DIALOGUE_BUTTON_X, GC.QUEST_OPTIONS_BUTTONS_Y, GC.QUEST_OPTIONS_BUTTONS_W, dialogueButtonHeight, dialogueBoxColor);
	colorText("Dialogue", GC.DIALOGUE_BUTTON_X+7, GC.QUEST_OPTIONS_BUTTONS_Y+15, dialogueTextColor);

	colorRect(GC.REQS_BUTTON_X, GC.QUEST_OPTIONS_BUTTONS_Y, GC.QUEST_OPTIONS_BUTTONS_W, requirementsButtonHeight, requirementsBoxColor);
	colorText("Requirements", GC.REQS_BUTTON_X+3, GC.QUEST_OPTIONS_BUTTONS_Y+15, requirementsTextColor);

	colorRect(GC.REWARDS_BUTTON_X, GC.QUEST_OPTIONS_BUTTONS_Y, GC.QUEST_OPTIONS_BUTTONS_W, rewardsButtonHeight, rewardsBoxColor);
	colorText("Rewards", GC.REWARDS_BUTTON_X+9, GC.QUEST_OPTIONS_BUTTONS_Y+15, rewardsTextColor);

	showQuestOptions();
}

function showQuests() {
	ctx.save();
	ctx.font = "30px Georgia";
	ctx.translate(camPanX, camPanY);
	colorRect(GC.MAP_X-5, GC.MAP_Y-5, GC.MAP_W+10, GC.MAP_H+10, "#828282");
	colorRect(GC.MAP_X, GC.MAP_Y, GC.MAP_W, GC.MAP_H, "#565656");

	colorRect(GC.QUEST_BOX_X, GC.QUEST_BOX_Y, GC.QUEST_BOX_W, GC.QUEST_BOX_H, "#828282");
	colorText("Quests", GC.QUEST_BUTTONS_X+GC.QUEST_BUTTONS_W/4, GC.MAP_Y+30, "#E0E0E0");
	colorText("Selected Quest", GC.QUEST_BUTTONS_X+GC.QUEST_BUTTONS_W+55, GC.MAP_Y+30, "#E0E0E0");

	ctx.font = "20px Georgia"
	for (var i = 0; i < 8; i++) {
		var y = GC.MAP_Y+45+i*(40+GC.GAP_Y) //if changed here, change in mouse handling functions as well!!
		if (i < warrior.numQuests) { //incomplete
			colorRect(GC.QUEST_BUTTONS_X, y, GC.QUEST_BUTTONS_W, GC.QUEST_BUTTONS_H, "#E0E0E0");
			if (questMouseovers[i]) {
				ctx.globalAlpha = 0.2;
				colorRect(GC.QUEST_BUTTONS_X, y, GC.QUEST_BUTTONS_W, GC.QUEST_BUTTONS_H, "black");
				ctx.globalAlpha = 1.0;
			}
			colorText(warrior.quests[i].name, GC.QUEST_BUTTONS_X+15, y+25, "black");
		} else if (i >= warrior.numQuests && i < warrior.numQuests+warrior.completedQuests.length) { //completed
			colorRect(GC.QUEST_BUTTONS_X, y, GC.QUEST_BUTTONS_W, GC.QUEST_BUTTONS_H, "#828282");
			if (questMouseovers[i]) {
				ctx.globalAlpha = 0.2;
				colorRect(GC.QUEST_BUTTONS_X, y, GC.QUEST_BUTTONS_W, GC.QUEST_BUTTONS_H, "black");
				ctx.globalAlpha = 1.0;
			}
			colorText(warrior.completedQuests[i-warrior.quests.length].name, GC.QUEST_BUTTONS_X+15, y+25, "black");
		} else {
			colorRect(GC.QUEST_BUTTONS_X, y, GC.QUEST_BUTTONS_W, GC.QUEST_BUTTONS_H, "#3A3A3A");
		}
	}


	if (selectedQuest != null) {
		colorText("Quest: "+selectedQuest.name, GC.QUEST_BOX_X+GC.LINE_SPACE, GC.QUEST_BOX_Y+GC.LINE_SPACE, "black");
		colorText("Given By: "+selectedQuest.NPC.name, GC.QUEST_BOX_X+GC.LINE_SPACE, GC.QUEST_BOX_Y+GC.LINE_SPACE*2, "black");
		if (selectedQuest.completed) {
			colorText("COMPLETED", GC.QUEST_BOX_X+GC.LINE_SPACE, GC.QUEST_BOX_Y+GC.QUEST_BOX_H-20, "black");
		} else if (selectedQuest.checkConditionLists()) {
			colorText("READY TO COMPLETE", GC.QUEST_BOX_X+GC.LINE_SPACE, GC.QUEST_BOX_Y+GC.QUEST_BOX_H-20, "black");
		}

		var buttonColor = "#E0E0E0";
		if (selectedQuest.showingOnMap) {
			buttonColor = "coral";
		}

		colorText("Show on map:", GC.QUEST_MAP_OPTION_X-130, GC.QUEST_MAP_OPTION_Y+15, "#E0E0E0");
		colorRect(GC.QUEST_MAP_OPTION_X, GC.QUEST_MAP_OPTION_Y, GC.QUEST_MAP_OPTION_W, GC.QUEST_MAP_OPTION_H, buttonColor);

		ctx.font = "15px Georgia";
		colorRect(GC.DISPLAY_BOX_X, GC.DISPLAY_BOX_Y, GC.DISPLAY_BOX_W, GC.DISPLAY_BOX_H, "#565656");
		showQuestOptionsBox();
	}
	ctx.restore();
}

function QuestItem(name) {

	this.name = name;
	this.pic;
	this.x;
	this.y;
	this.pickedUp = false;
	this.randomLevelNumber; //only for random levels

	this.draw = function() {
		if (!this.pickedUp) {
			drawImageRotated(this.pic, this.x, this.y, 0);
		}
	}
}

QuestItem.prototype.setPic = function(filename) {
	var image = document.createElement("img");
	image.src = "images/" + filename;
	this.pic = image;
	return this;
};

QuestItem.prototype.setCoordinates = function(xyArray) {
	this.x = xyArray[0];
	this.y = xyArray[1];
	return this;
};

var questCar = new QuestItem("blue car")
					.setPic("questCar1.png")
					.setCoordinates([850, 280]);

var questCar2 = new QuestItem("green car")
					.setPic("questCar2.png")
					.setCoordinates([400, 620]);	

var questHeart = new QuestItem("heart")
					.setPic("heart.png")
					.setCoordinates([500, 200]);

var questBaseball = new QuestItem("baseball")
					.setPic("baseball.png")
					.setCoordinates([1020, 600]);

var questBaseballBat = new QuestItem("baseball bat")
					.setPic("baseballBat.png")
					.setCoordinates([300, 165]);				




function QuestItemConditionCounter(QuestItem, numRequired) {
	this.item = Object.assign({}, QuestItem);
	this.pic = this.item.pic;
	this.name = this.item.name;
	this.counter = numRequired;
	this.total = numRequired;

	this.reduceCounter = function(reduction) {
		this.counter -= reduction;
		if (this.counter < 0) {
			this.counter = 0;
		}
	}
}

function Quest(name) {
	this.name = name;
	this.NPC;
	this.story; //array of strings to click through -> eventually add dialogue tree
	this.completionText;
	this.conditionList = []; //required items
	this.bossesConditionList = []; //required boss kills
	this.expYield = 0;
	this.coinYield = 0;
	this.itemYield = [];
	this.completed = false;
	this.questsArrayIndex;
	this.givenQuest = false;
	this.prerequisites = []; //quests from other NPC's, earlier quests from current NPC are already "prerequisites"
	this.showingOnMap = true; //show quest item locations on map when quest is active

	this.checkConditionList = function() {
		for (var i = 0; i < this.conditionList.length; i++) {
			if (this.conditionList[i].counter != 0) {
				return false;
			}
		}
		return true;
	}

	this.checkBossesConditionList = function() {
		for (var i = 0; i < this.bossesConditionList.length; i++) {
			if (!warrior.bossesKilled.contains(this.bossesConditionList[i])) {
				return false;
			}
		}
		return true;
	}

	this.checkConditionLists = function() {
		var itemsCompleted = this.checkConditionList();
		var bossesCompleted = this.checkBossesConditionList();
		if (itemsCompleted && bossesCompleted) {
			return true;
		}
		return false;
	}

	this.checkPrerequisites = function() {
		for (var i = 0; i < this.prerequisites.length; i++) {
			if (!this.prerequisites[i].completed) {
				return false;
			}
		}
		return true;
	}
}

Quest.prototype.addToConditionList = function(conditionObject) { 
	this.conditionList.push(conditionObject);
	return this;
};

Quest.prototype.setBossesConditionList = function(bossNameArray) { 
	this.bossesConditionList = bossNameArray;
	return this;
};

Quest.prototype.setStory = function(storyArray) {
	this.story = storyArray;
	return this;
};

Quest.prototype.setExpYield = function(expYield) {
	this.expYield = expYield
	return this;
};

Quest.prototype.setCoinYield = function(coinYield) {
	this.coinYield = coinYield
	return this;
};

Quest.prototype.setItemYield = function(itemYieldArray) {
	for (var i = 0; i < itemYieldArray.length; i++) {
		var item = getItem(itemYieldArray[i], allItems.concat(allGems));
		var newItem = createItemCopy(item);
		this.itemYield.push(newItem);
	}
	return this;
};

Quest.prototype.setCompletionText = function(completionString) {
	this.completionText = completionString;
	return this;
};

Quest.prototype.setPrerequisites = function(prereqArray) {
	this.prerequisites = prereqArray;
	return this;
};

function howManyInQuestBag(itemName) {
	var counter = 0;
	for (var i = 0; i < warrior.questBag.length; i++) {
		if (warrior.questBag[i].name == itemName) {
			counter++;
		}
	}
	return counter;
}

function isItemInQuestBag(itemName) {
	for (var i = 0; i < warrior.questBag.length; i++) {
		if (warrior.questBag[i].name == itemName) {
			return true;
		}
	}
	return false;
}

var firstQuest = new Quest("Lighting McLost")
					.setStory(firstQuestStory)
					.setCompletionText(firstQuestCompletion)
					.addToConditionList(new QuestItemConditionCounter(questCar, 1))
					.addToConditionList(new QuestItemConditionCounter(questCar2, 1))
					.setExpYield(1000)
					.setCoinYield(1500);

var heartQuest = new Quest("A Loss Of Heart")
					.setStory(heartQuestStory)
					.setCompletionText(heartQuestCompletion)
					.addToConditionList(new QuestItemConditionCounter(questHeart, 1))
					.setExpYield(1000)
					.setItemYield(["stick n' poke"]);
					
var baseballQuest = new Quest("Off Base")
					.setStory(baseballQuestStory)
					.setCompletionText(baseballQuestCompletion)
					.addToConditionList(new QuestItemConditionCounter(questBaseball, 1))
					.addToConditionList(new QuestItemConditionCounter(questBaseballBat, 1))
					.setBossesConditionList(["Bombuardo"])
					.setExpYield(1000)
					.setCoinYield(450)
					.setItemYield(["orb wand", "basic damage gem", "fork of destruction"])
					// .setPrerequisites([firstQuest]);



function drawNPCs() {
	for (var i = 0; i < currentLevel.NPCArray.length; i++) {
		currentLevel.NPCArray[i].draw();
	}
}


function NPC(name) {
	this.name = name;
	this.x;
	this.y;
	this.quests = [];
	this.currentQuestNum = 0;
	this.pic;
	this.randomLevelNumber; //only for randomized levels
	this.exclamation = false;
	this.question = false;

	this.draw = function() {
		drawImageRotated(this.pic, this.x, this.y, 0);
		if (this.quests.length > 0) {
			for (var i = 0; i < this.quests.length; i++) {
				var quest = this.quests[i];
				if (quest.givenQuest && !quest.checkConditionLists() && !quest.completed) {
					this.exclamation = false;
					this.question = false;
					return;
				}
			}
			for (var i = 0; i < this.quests.length; i++) {
				var quest = this.quests[i];
				if (quest.givenQuest && quest.checkConditionLists() && !quest.completed) {
					drawImageRotatedScaled(questExclamationPic, this.x, this.y-40, 0, 0.75);
					this.exclamation = true;
					return;
				}
			}
			for (var i = 0; i < this.quests.length; i++) {
				var quest = this.quests[i];
				if (!quest.givenQuest && quest.checkPrerequisites()) {
					drawImageRotatedScaled(questQuestionPic, this.x, this.y-40, 0, 0.75);
					this.question = true;
					return;
				}
			}
		}
	}
}

NPC.prototype.setQuests = function(questArray) {
	for (var i = 0; i < questArray.length; i++) {
		var newQuest = questArray[i];
		newQuest.NPC = this;
		this.quests.push(newQuest);
	}
	return this;
};

NPC.prototype.setPic = function(filename) {
	var image = document.createElement("img");
	image.src = "images/" + filename;
	this.pic = image;
	return this;
};

NPC.prototype.setCoordinates = function(xyArray) {
	this.x = xyArray[0];
	this.y = xyArray[1];
	return this;
};


var iceCreamNPC = new NPC("Ice Cream Steve")
				.setQuests([firstQuest, heartQuest])
				.setPic("iceCream.png")
				.setCoordinates([75, 800]);

var kyleNPC = new NPC("Kyle")
				.setQuests([baseballQuest])
				.setPic("kyleNPC.png")
				.setCoordinates([400, 500]);

var allNPCs = [iceCreamNPC, kyleNPC];
var allQuestItems = [questCar, questCar2, questHeart, questBaseball, questBaseballBat];


