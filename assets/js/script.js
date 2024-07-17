/* GLOBAL VARIABLES */

let gameStarted = false;
let inLoseState = false;

let characterName = "";
let characterClass = "";
let baseAtk = "";
let pAtk = null;
let tempAtk = null;
let baseDef = "";
let pDef = null;
let tempDef = null;
let baseHealth = "";
let health = baseHealth;
let baseStamina = "";
let stamina = baseStamina;
let level = 1;
let xp = 0;
let xpRequired = 10;

let gold = 500; //change back to 50
let currentWeapon = 0;
let currentArmor = 0;
let bounties = [];
let acceptedBounties = [];
let inventory = {
  weapons: [{ name: "Wooden Club", power: 10, durability: Infinity }],
  armor: [{ name: "Cloth Tunic", defense: 5, durability: Infinity }],
  items: []
};
let playerSkills = [];


let fighting = null;
let playerInBattle = false;
let enemyHealth = 0;


// Enemy List
const enemies = [
  {
    name: "Slime",
    level: 2,
    health: 35,
    attack: 25,
    defense: 5,
    enemyImage: "./assets/sprites/oozeSlimeImg.png",
    enemyIcon: "./assets/icons/slimeIcon.png",
    location: "Catacombs",
  },
  {
    name: "Necrotic Burrower",
    level: 4,
    health: 50,
    attack: 30,
    defense: 10,
    enemyImage: "./assets/sprites/necroticBurrowerImg.png",
    enemyIcon: "./assets/icons/burrowerIcon.png",
    location: "Catacombs",
  },
  {
    name: "Arisen Corpse",
    level: 6,
    health: 60,
    attack: 35,
    defense: 15,
    enemyImage: "./assets/sprites/arisenCorpseImg.png",
    enemyIcon: "./assets/icons/corpseIcon.png",
    location: "Catacombs",
  },
  {
    name: "Feral Ghoul",
    level: 10,
    health: 100,
    attack: 45,
    defense: 25,
    enemyImage: "./assets/sprites/ghoulImg.png",
    enemyIcon: "./assets/icons/ghoulIcon.png",
    location: "Catacombs",
  },
  {
    name: "Grave Crawler",
    level: 12,
    health: 120,
    attack: 40,
    defense: 40,
    enemyImage: "./assets/sprites/graveCrawlerImg.png",
    enemyIcon: "./assets/icons/crawlerIcon.png",
    location: "Catacombs",
  },
  {
    name: "Bone Reaver",
    level: 16,
    health: 180,
    attack: 50,
    defense: 50,
    enemyImage: "./assets/sprites/boneReaverImg.png",
    enemyIcon: "./assets/icons/reaverIcon.png",
    location: "Catacombs",
  },
  {
    name: "Baelrath the Corruptor",
    level: 20,
    health: 300,
    attack: 100,
    defense: 100,
    enemyImage: "./assets/sprites/baelrathTheCorruptorImg.png",
    enemyIcon: "./assets/icons/baelrathIcon.png",
    location: "Cathedral Alter Room",
  },
];
// Weapon List
const weapons = [
  { name: "Wooden Club", power: 5, durability: Infinity },
  { name: "Dagger", power: 15, durability: 30 },
  { name: "Mace", power: 40, durability: 50 },
  { name: "Sword", power: 60, durability: 100 },
];
// Armor List
const armors = [
  { name: "Cloth Tunic", defense: 5, durability: Infinity },
  { name: "Leather Armor", defense: 15, durability: 80 },
  { name: "Chainmail Armor", defense: 20, durability: 100 },
  { name: "Plate Armor", defense: 30, durability: 200 },
];
// Item List
const items = [
  {name: "Healing Potion", healAmount: 20, icon: "./assets/icons/healthPotionIcon.png" },
  {name: "Berserker Draught", atkUp: 20, icon: "./assets/icons/berserkerPotionIcon.png", used: false },
  {name: "Ironskin Draught", defUp: 20, icon: "./assets/icons/ironSkinPotionIcon.png", used: false }, 
];
// Skill List
const skills = [
  {name: "Double Slash", damage: 50, staminaCost: 1, icon: "./assets/icons/doubleSlashIcon.png"},
  {name: "Riposte", damage: 50, staminaCost: 1, icon: "./assets/icons/riposteIcon.png"},
  {name: "Shield Bash", damage: 50, staminaCost: 1, icon: "./assets/icons/shieldBashIcon.png"},
];

// Current Game Location
let currentLocationIndex = 0;

// Game Locations
const locations = [
  {
    name: "Blackvale",
    "button text": ["Broken Lantern", "Market Street", "The Sprawl"],
    "btn functions top": [notesShortcut, openGameMenu],
    "button functions": [goTavern, goMarketStreet, goSprawl, {}, {}, {}],
    text: 'You are in the town square. A few things catch your eye. You see a large tavern, an entrance to what looks like a market, and a path that leads to the sprawling outskirts of the town.',
    locationImg: "./assets/gamedisplay/0townSquareImg.png",
    headerIcon: ["./assets/icons/blackvaleIcon.png", "./assets/icons/menuIcon.png"],
    controlIcon1: ["./assets/icons/tavernIcon.png", "./assets/icons/marketIcon.png", "./assets/icons/theSprawlIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "The Broken Lantern",
    "button text": ["Rest\n (10 gold)", "Find\n bounties", "Find work\n bartending"],
    "btn functions top": [notesShortcut, goTown],
    "button functions": [rest, goBountyBoard, work, {}, {}, {}],
    text: "You enter the dimly lit tavern. Perhaps you can rest or find bounties or work here.",
    locationImg: "./assets/gamedisplay/1tavernImg.png",
    headerIcon: ["./assets/icons/tavernIcon.png", "./assets/icons/doorIcon.png"],
    controlIcon1: ["./assets/icons/restIcon.png", "./assets/icons/bountiesIcon.png", "./assets/icons/waiterIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Market Street",
    "button text": ["Item Store", "The Forge", "Training Yard"],
    "btn functions top": [goMarketStreet, goTown],
    "button functions": [goStore, goBlacksmith, goTrainingYard, {}, {}, {}],
    text: "You arrive at despite the grim surroundings, money still exchanges hands. A item shop and the local blacksmith catches your eye.",
    locationImg: "./assets/gamedisplay/2marketStreetImg.png",
    headerIcon: ["./assets/icons/marketIcon.png", "./assets/icons/walkBackIcon.png"],
    controlIcon1: ["./assets/icons/itemShopIcon.png", "./assets/icons/theForgeIcon.png", "./assets/icons/trainingYardIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "General Store",
    "button text": ["Buy Healing Potion\n (10 gold)", "Buy Berserker Draught\n (10 gold)", "Buy Ironskin Draught \n (10 gold)"],
    "btn functions top": [notesShortcut, goMarketStreet],
    "button functions": [buyHealthPotion, buyBerserkerPotion, buyIronskinPotion, {}, {}, {}],
    text: "You enter the store. They have a selection of potions that can increase your health or grow your strength.",
    locationImg: "./assets/gamedisplay/3storeImg.png",
    headerIcon: ["./assets/icons/itemShopIcon.png", "./assets/icons/doorIcon.png"],
    controlIcon1: ["./assets/icons/healthPotionIcon.png", "./assets/icons/berserkerPotionIcon.png", "./assets/icons/ironSkinPotionIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "The Forge",
    "button text": ["Buy weapon\n (30 gold)", "Buy armor\n (50 gold)", "Repair \n (10 Gold per)"],
    "btn functions top": [notesShortcut, goMarketStreet],
    "button functions": [buyWeapon, buyArmor, repairEquipment, {}, {}, {}],
    text: "You walk into the town blacksmith, various weapons and armor are on display.",
    locationImg: "./assets/gamedisplay/4blacksmithImg.png",
    headerIcon: ["./assets/icons/theForgeIcon.png", "./assets/icons/doorIcon.png"],
    controlIcon1: ["./assets/icons/buyWeaponIcon.png", "./assets/icons/buyArmorIcon.png", "./assets/icons/repairIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "The Sprawl",
    "button text": ["Catacombs", "Scavenge Ruins", "Fight Baelrath"],
    "btn functions top": [notesShortcut, goTown],
    "button functions": [goCatacombs, scavengeSprawl, fightBaelrath, {}, {}, {}],
    text: "You've entered the sprawl, the demonic corruption seeps into the city. You can explore to find sources of the corruption.",
    locationImg: "./assets/gamedisplay/5outskirtsImg.png",
    headerIcon: ["./assets/icons/theSprawlIcon.png", "./assets/icons/walkBackIcon.png"],
    controlIcon1: ["./assets/icons/catacombsIcon.png", "./assets/icons/searchIcon.png", "./assets/icons/baelrathIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Catacombs",
    "button text": ["Slime", "Necrotic Burrower", "Arisen Corpse", "Feral Ghoul", "Grave Crawler", "Skeleton Reaver"],
    "btn functions top": [notesShortcut, goSprawl],
    "button functions": [fightSlime, fightBurrower, fightCorpse, fightGhoul, fightCrawler, fightReaver],
    text: "You enter the catacombs underneath the city. You see some monsters.",
    locationImg: "./assets/gamedisplay/6catacombsImg.png",
    headerIcon: ["./assets/icons/catacombsIcon.png", "./assets/icons/doorIcon.png"],
    controlIcon1: ["./assets/icons/slimeIcon.png", "./assets/icons/burrowerIcon.png", "./assets/icons/corpseIcon.png"],
    controlIcon2: ["./assets/icons/ghoulIcon.png", "./assets/icons/crawlerIcon.png", "./assets/icons/reaverIcon.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Catacombs - Battle",
    "button text": ["Attack", "Skills", "Items"],
    "btn functions top": [bestiaryShortcut, runFromBattle],
    "button functions": [playerAttack, () => battleControls("skills"), () => battleControls("items"), {}, {}, {}],
    text: "You are fighting a monster.",
    locationImg: "./assets/gamedisplay/7catacombsFightImg.png",
    headerIcon: ["./assets/icons/theBestiaryIcon.png", "./assets/icons/runIcon.png"],
    controlIcon1: ["./assets/icons/attackIcon.png", "./assets/icons/skillsIcon.png", "./assets/icons/healthPotionIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Cathedral Alter Room - Battle",
    "button text": ["Attack", "Skills", "Items"],
    "btn functions top": [bestiaryShortcut, runFromBattle],
    "button functions": [playerAttack, () => battleControls("skills"), () => battleControls("items"), {}, {}, {}],
    text: "You are fighting Baelrath the Corruptor.",
    locationImg: "./assets/gamedisplay/8cathedralFightImg.png",
    headerIcon: ["./assets/icons/theBestiaryIcon.png", "./assets/icons/runIcon.png"],
    controlIcon1: ["./assets/icons/attackIcon.png", "./assets/icons/skillsIcon.png", "./assets/icons/healthPotionIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Enemy Defeated",
    "button text": ["Fight Another", "Return to entrance", "Search around"],
    "btn functions top": [openBestiary, goSprawl],
    "button functions": [goCatacombs, goCatacombs, easterEgg, {}, {}, {}],
    text: "You've Won!",
    locationImg: "./assets/gamedisplay/9fightVictoryImg.png",
    headerIcon: ["./assets/icons/theBestiaryIcon.png", "./assets/icons/doorIcon.png"],
    controlIcon1: ["./assets/icons/attackIcon.png", "./assets/icons/catacombsIcon.png", "./assets/icons/searchIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Hope is Lost",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "btn functions top": [{}, openGameMenu],
    "button functions": [restart, restart, restart, {}, {}, {}],
    text: 'You die. <span class="dice">&#x2620;</span>',
    locationImg: "./assets/gamedisplay/10gameOverImg.png",
    headerIcon: ["./assets/icons/theBestiaryIcon.png", "./assets/icons/menuIcon.png"],
    controlIcon1: ["./assets/icons/restartIcon.png", "./assets/icons/restartIcon.png", "./assets/icons/restartIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  }, 
  {
    name: "Baelrath Slain",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "btn functions top": [{}, openGameMenu],
    "button functions": [restart, restart, restart, {}, {}, {}],
    text: 'Baelrath has been slain! YOU WIN THE GAME! <span class="dice">&#x1F389;</span>',
    locationImg: "./assets/gamedisplay/11baelrathDefeatedImg.png",
    headerIcon: ["./assets/icons/theBestiaryIcon.png", "./assets/icons/menuIcon.png"],
    controlIcon1: ["./assets/icons/restartIcon.png", "./assets/icons/restartIcon.png", "./assets/icons/restartIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Gambling Den",
    "button text": ["Bet small", "Bet big", "Leave"],
    "btn functions top": [openBestiary, goCatacombs],
    "button functions": [pickSmall, pickBig, goCatacombs, {}, {}, {}],
    text: "You encounter a warlock who wants to play a game. Wager on the outcome of three dice: 'Small' (4-10) or 'Big' (11-17). If you win, you'll get 20 gold. If you lose, the warlock will drain some of your life essence.",
    locationImg: "./assets/gamedisplay/12gamblingStrangerImg.png",
    headerIcon: ["./assets/icons/theBestiaryIcon.png", "./assets/icons/doorIcon.png"],
    controlIcon1: ["./assets/icons/downArrowIcon.png", "./assets/icons/upArrowIcon.png", "./assets/icons/doorIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Bounty Board",
    "button text": ["Accept Bounty 1", "Accept Bounty 2", "Accept Bounty 3"],
    "btn functions top": [goTavern, goTavern],
    "button functions": [() => acceptBounty(0), () => acceptBounty(1), () => acceptBounty(2), {}, {}, {}],
    text: "On the wall are a list of bounties that are currently available.",
    locationImg: "./assets/gamedisplay/13bountyBoardImg.png",
    headerIcon: ["./assets/icons/tavernIcon.png", "./assets/icons/walkBackIcon.png"],
    controlIcon1: ["./assets/icons/bountiesIcon.png", "./assets/icons/bountiesIcon.png", "./assets/icons/bountiesIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
  {
    name: "Training Yard",
    "button text": ["Learn new skills", "Forget Skills", "Improve Skills"],
    "btn functions top": [goTrainingYard, goMarketStreet],
    "button functions": [learnSkills, forgetSkills, updateSkills, {}, {}, {}],
    text: "A training yard to hone your skills and reflect.",
    locationImg: "./assets/gamedisplay/14trainingSquareImg.png",
    headerIcon: ["./assets/icons/trainingYardIcon.png", "./assets/icons/walkBackIcon.png"],
    controlIcon1: ["./assets/icons/learnSkillIcon.png", "./assets/icons/forgetSkillIcon.png", "./assets/icons/upgradeSkillIcon.png"],
    controlIcon2: ["./assets/icons/testRed.png", "./assets/icons/testRed.png", "./assets/icons/testRed.png"],
    controlIcon3: ["./assets/icons/characterIcon.png", "./assets/icons/journalIcon.png", "./assets/icons/testRed.png"],
  },
];

// Work events for Tavern job
const workEventsTavern = [
  {
    description: "A patron tips you generously. Gain 20 gold.",
    effect: function() {
      gold += 20;
    }
  },
  {
    description: "You work a normal shift and earn 10 gold.",
    effect: function() {
      gold += 10;
    }
  },
  {
    description: "You accidentally break some dishes. Lose 5 gold.",
    effect: function() {
      gold -= 5;
    }
  },
  {
    description: "You overhear a secret. Gain 2 Xp.",
    effect: function() {
      gainXp(2);
    }
  },
  {
    description: "A fight breaks out, you fail to duck. Lose 10 health.",
    effect: function() {
      health -= 10;
    }
  }
];
// Temporary Scavenge Events 
const scavengeSprawlEvents = [
  {
    description: "You were caught off-guard by a group of bandits lurking in the shadows. After a brief struggle, you manage to escape, but not without sustaining some injuries. Your health has decreased.",
    effect: function() {
      health -= 10;
    }
  },
  {
    description: "You stumble upon an old alchemist's lab, untouched by time. Among the dusty bottles, you find a potent potion. You have acquired a new potion.",
    effect: function() {
      addRandomPotionToInventory();
    }
  },
  {
    description: "While exploring an abandoned building, you discover a hidden compartment filled with gold coins and valuable trinkets. Your gold has increased.",
    effect: function() {
      gold += 10;
    }
  },
  {
    description: "A hooded figure approaches you and offers some cryptic advice about the creatures lurking in the Sprawl. You feel wiser and more prepared. Your experience has increased.",
    effect: function() {
      gainXp(4);
    }
  },
  {
    description: "While navigating through an underground passage, a section of the tunnel collapses. You narrowly escape but sustain some injuries. Your health has decreased.",
    effect: function() {
      health -= 10;
    }
  },
  {
    description: "You come across a patch of glowing fungi that illuminates the area with an eerie light. Although fascinating, it has no immediate effect on you.",
    effect: function() {
      console.log("Neutral Event");
    }
  },
  {
    description: "Hidden in a decrepit building, you find a stash of goods left behind by an old merchant. Among the items, you find some gold. Your gold has increased.",
    effect: function() {
      gold += 10;
    }
  },
  {
    description: "You encounter a wounded traveler who shares tales of his journey and the dangers he faced. You gain valuable insights from his experiences. Your experience has increased.",
    effect: function() {
      gainXp(4);
    }
  },
  {
    description: "You find an ancient relic that radiates dark energy. As you inspect it, you feel a wave of pain coursing through your body. Your health has decreased.",
    effect: function() {
      health -= 20;
    }
  },
  {
    description: "In an old apothecary shop, you find several bottles still intact. One of them contains a useful potion. You have acquired a new potion.",
    effect: function() {
      addRandomPotionToInventory();
    }
  },
  {
    description: "You hear faint whispers and see fleeting shadows of the past. Though unsettling, the experience does not affect you physically or mentally.",
    effect: function() {
      console.log("Neutral Event");
    }
  },
  {
    description: "You find an old armory filled with rusted weapons and broken armor. Among the debris, you discover a weapon that can still be used. You have acquired a new weapon.",
    effect: function() {
      console.log("Weapon Event");
    }
  },
  {
    description: "You come across a battlefield littered with the remains of past skirmishes. Among the wreckage, you find a piece of armor that can be used. You have acquired new armor.",
    effect: function() {
      console.log("Armor Event");
    }
  },
  {
    description: "You discover a shrine dedicated to a forgotten deity. Spending a moment in quiet reflection, you feel a surge of knowledge and power. Your experience has increased.",
    effect: function() {
      gainXp(4);
    }
  },
  {
    description: "While exploring a narrow corridor, you trigger a hidden trap. You manage to escape, but not without injury. Your health has decreased.",
    effect: function() {
      health -= 10;
    }
  },
  {
    description: "You find a caravan that has been looted and abandoned. Among the remnants, you discover a weapon that can still be used. You have acquired a new weapon.",
    effect: function() {
      console.log("Weapon Event");
    }
  },
  {
    description: "In a dusty alcove, you find a bottle containing a strange, glowing liquid. After careful consideration, you decide to keep it. You have acquired a new potion.",
    effect: function() {
      addRandomPotionToInventory();
    }
  },
  {
    description: "As you explore a section of crumbling ruins, you find nothing of particular interest. The area seems devoid of anything useful or harmful.",
    effect: function() {
      console.log("Neutral Event");
    }
  },
  {
    description: "You come across the remains of an adventurer who perished in the Sprawl. Among his belongings, you find a journal detailing his experiences and insights. Your experience has increased.",
    effect: function() {
      gainXp(4);
    }
  },
  {
    description: "You step into a hidden mire, sinking into the muck and struggling to free yourself. The effort leaves you exhausted and injured. Your health has decreased.",
    effect: function() {
      health -= 10;
    }
  }
];

// Initialize character gen form submission
document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("characterGenForm").addEventListener("submit", startGame);
});

// Define Game Elements
const mainScreen = document.getElementById("screen");
const mainDisplay = document.getElementById("gameImage");
const statBar = document.getElementById("stats");
const controlBarOne = document.getElementById("controls");
const controlBarTwo = document.getElementById("controlsRowTwo");

const csContainer = document.getElementById("characterStatsContainer");
const inventoryHeader = document.getElementById("inventoryHeader");
const inventoryContainer = document.getElementById("playerInventoryContainer");
const journalContainer = document.getElementById("journalContainer");
const bountiesTab = document.querySelector("#bountiesTab");
const notesTab = document.querySelector("#notesTab");
const bestiaryTab = document.querySelector("#bestiaryTab");
const npcContainer = document.querySelector("#npcContainer");
const dialogueContainer = document.querySelector("#dialogueContainer");
const enemyContainer = document.querySelector("#enemyContainer");
const enemyStats = document.querySelector("#enemyStats");
const bountyBoardContainer = document.querySelector("#bountyBoardContainer");
// Text and Stats
const text = document.querySelector("#text");
const dialogue = document.querySelector("#dialogue");
const npcName = document.querySelector("#npcName");
const lvlText = document.querySelectorAll(".lvlText");
const xpText = document.querySelectorAll(".xpText");
const reqXpText = document.querySelectorAll(".reqXpText");
const healthText = document.querySelectorAll(".healthText");
const baseHealthText = document.querySelectorAll(".baseHealthText");
const staminaText = document.querySelectorAll(".focusText"); //stamina in code, focus in display
const baseStaminaText = document.querySelectorAll(".baseFocusText");
const atkText = document.querySelectorAll(".atkText");
const defText = document.querySelectorAll(".defText");
const goldText = document.querySelectorAll(".goldText");
const classText = document.querySelectorAll(".classText");
const nameText = document.querySelectorAll(".nameText");
const enemyName = document.querySelector("#enemyName");
const enemyHealthText = document.querySelector("#enemyHealth");
const locationName = document.querySelector("#locationName");
const invWeaponList = document.querySelector("#weaponList");
const invArmorList = document.querySelector("#armorList");
const invItemList = document.querySelector("#itemList");

// Animation Definitions
const animationElement = document.getElementById("animationContainer");
const frameWidth = 500;
const frameHeight = 375;
const totalFrames = 6;
let currentFrame = 0;

function updateAnimation() {
  const x = -(currentFrame * frameWidth);
  const y = 0;

  animationElement.style.backgroundPosition = `${x}px ${y}px`;
  currentFrame = (currentFrame + 1) % totalFrames;
}

function playAnimation(animationName) {
  if (animationName === "playerAttack") {
    animationElement.classList.remove("enemyAttack");
    animationElement.classList.add("playerAttack");
  } else if (animationName === "enemyAttack") {
    animationElement.classList.remove("playerAttack");
    animationElement.classList.add("enemyAttack");
  }
  animationElement.style.display = "block";

  let frameCount = 0;
  const attackInterval = setInterval(() => {
    updateAnimation();
    frameCount++;
    if (frameCount >= totalFrames) {
      clearInterval(attackInterval);
      setTimeout(() => {
        animationElement.style.display = "none";
        // Reset to original position
        animationElement.style.backgroundPosition = '0 0';
      }, 100); // Speed of reset transition (matches interval duration)
    }
  }, 100); //Speed of Transition
}

// Button Defintions
const buttons = [];
const buttonIcons = [];
const buttonTexts = [];

//Loop for button array population
for (let i = 1; i <=11; i++) {
    const button = document.querySelector(`#button${i}`);
    buttons.push(button);

    const icon = document.querySelector(`#btnIcon${i}`);
    buttonIcons.push(icon);

    const text = button.querySelector(".btnText");
    buttonTexts.push(text);
}

const menuBtn1 = document.querySelector("#continue-button");
const menuBtn2 = document.querySelector("#restart-game-button");
const menuBtn3 = document.querySelector("#save-game-button");
const menuBtn4 = document.querySelector("#load-game-button");

// initialize buttons
buttons[0].onclick = goTavern;
buttons[1].onclick = goMarketStreet;
buttons[2].onclick = goSprawl;
buttons[3].onclick = goCatacombs;
buttons[4].onclick = goCatacombs;
buttons[5].onclick = goCatacombs;
buttons[6].onclick = openCharacterMenu;
buttons[7].onclick = openJournalMenu;
buttons[8].onclick = {};
buttons[9].onclick = goTown;
buttons[10].onclick = openGameMenu;
menuBtn1.onclick = closeGameMenu;
menuBtn2.onclick = restart;
menuBtn3.onclick = saveGame;
menuBtn4.onclick = loadGame;

function toggleButtons(state) {
  const isDisabled = state === 'off';
  const allButtons = [...buttons, menuBtn1, menuBtn2];

  allButtons.forEach(button => {
    button.disabled = isDisabled;
  });
}

// Load BGM and SFX
audioManager.loadBGM('main', './assets/audio/ShadowsDescent.mp3');
audioManager.loadBGM('battle', './assets/audio/BattleofShadows.mp3');
audioManager.loadBGM('bossBattle', './assets/audio/EncounterWithTyrant.mp3');
audioManager.loadSFX('click', './assets/audio/click1.wav');
audioManager.loadSFX('attack', './assets/audio/swordswing.wav');
audioManager.loadSFX('steps', './assets/audio/stepdirt_2.wav');
audioManager.loadSFX('door', './assets/audio/doorv1.wav');
audioManager.loadSFX('slime', './assets/audio/slime8.wav');
audioManager.loadSFX('biteSmall', './assets/audio/bite-small2.wav');
audioManager.loadSFX('zombie', './assets/audio/mnstr2.wav');
audioManager.loadSFX('ghoul', './assets/audio/mnstr3.wav');
audioManager.loadSFX('swingHvy', './assets/audio/swing3.wav');
audioManager.loadSFX('shadeRar', './assets/audio/shade14.wav');
audioManager.loadSFX('whack', './assets/audio/hit01.wav');
audioManager.loadSFX('bottle', './assets/audio/bottle.wav');
audioManager.loadSFX('coin', './assets/audio/coin.wav');
audioManager.loadSFX('battleTransition', './assets/audio/BattleIntro.wav');
audioManager.loadSFX('metalSmClang', './assets/audio/metal-small2.wav');

// BGM and SFX Menu Setting Event Listeners
document.getElementById('mute-bgm-button').addEventListener('click', () => {
  audioManager.muteBGM();
});
document.getElementById('unmute-bgm-button').addEventListener('click', () => {
  audioManager.unmuteBGM();
});
document.getElementById('bgm-volume-slider').addEventListener('input', (event) => {
  const volume = event.target.value;
  audioManager.setBGMVolume(volume);
});
document.getElementById('sfx-volume-slider').addEventListener('input', (event) => {
  const volume = event.target.value;
  audioManager.setSFXVolume(volume);
});

// SFX Play Function
function playSoundEffect(effectName) {
  if (gameStarted) {
    audioManager.playSFX(effectName);
  }
}

function playSoundEffectMultipleTimes(name, times, delay) {
  let count = 0;

  function playSound() {
    if (count < times) {
      audioManager.playSFX(name);
      count++;
      setTimeout(playSound, delay);
    }
  }

  playSound();
}

function playClickSound() {
  audioManager.playSFX('click');
}

function attachClickSoundToButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', playClickSound);
    console.log('Added click event to button');
  });
  const startButton = document.querySelector('#startButton');
  startButton.addEventListener('click', playClickSound);
}

// On Page load attach sound effects to buttons
document.addEventListener("DOMContentLoaded", function() {
  attachClickSoundToButtons();
});

function saveGame() {
  const playerData = {
    characterName,
    characterClass,
    baseAtk,
    baseDef,
    baseHealth,
    health,
    baseStamina,
    stamina,
    level,
    xp,
    xpRequired,
    gold,
    currentWeapon,
    currentArmor,
    bounties,
    acceptedBounties,
    inventory,
    playerSkills
  };

  localStorage.setItem('playerData', JSON.stringify(playerData));
  alert('Game saved successfully!');
}

function loadGame() {
  const savedData = localStorage.getItem('playerData');

  if (savedData) {
    const playerData = JSON.parse(savedData);
    
    characterName = playerData.characterName;
    characterClass = playerData.characterClass;
    baseAtk = playerData.baseAtk;
    baseDef = playerData.baseDef;
    baseHealth = playerData.baseHealth;
    health = playerData.health;
    baseStamina = playerData.baseStamina;
    stamina = playerData.stamina;
    level = playerData.level;
    xp = playerData.xp;
    xpRequired = playerData.xpRequired;
    gold = playerData.gold;
    currentWeapon = playerData.currentWeapon;
    currentArmor = playerData.currentArmor;
    bounties = playerData.bounties;
    acceptedBounties = playerData.acceptedBounties;
    inventory = playerData.inventory;
    playerSkills = playerData.playerSkills;

    // Update the game state to reflect the loaded data
    updateGameState();

    alert('Game loaded successfully!');
  } else {
    alert('No saved game found.');
  }
}

function updateGameState() {
  // This function should update the game state to reflect the loaded data.
  // Update all relevant elements and variables here.
  updateHealthGoldXp();
  // Add any other necessary updates here.
}



// Function to start the game
function startGame(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Get the character name and class
  characterName = document.getElementById("cgNameInput").value;
  characterClass = document.getElementById("cgClassSelect").value;

  console.log("Player Class is:", characterClass);

  // Generate character stats based on class
  if (characterClass === "Voidstalker") {
    baseHealth = 120;
    baseStamina = 3;
    baseAtk = 10;
    baseDef = 10;
  } else if (characterClass === "Shadowblade") {
    baseHealth = 80;
    baseStamina = 3;
    baseAtk = 15;
    baseDef = 5;
  } else if (characterClass === "Iron Warden") {
    baseHealth = 100;
    baseStamina = 3;
    baseAtk = 5;
    baseDef = 15;
  } else {
    baseHealth = 100;
    baseStamina = 3;
    baseAtk = 5;
    baseDef = 5;
  }

  health = baseHealth;
  stamina = baseStamina;

  // Hide character creation and show the game
  document.getElementById("characterGenContainer").style.display = 'none';
  document.getElementById("game").style.display = 'block';

  // Update initial stats
  updateHealthGoldXp();
  nameText.forEach(element => {
    element.textContent = characterName;
  });
  classText.forEach(element => {
    element.textContent = characterClass;
  });
  baseHealthText.forEach(element => {
    element.textContent = baseHealth;
  });

  audioManager.playBGM('main');
  goTown();
  setTimeout(() => {
    gameStarted = true;
  }, 500);
}

// Equipment Stats Hover
document.addEventListener("DOMContentLoaded", () => {
  const characterStatCol2 = document.getElementById("characterStatCol2");
  const equipmentStatCol2 = document.getElementById("equipmentStatCol2");
  const statContainer = equipmentStatCol2.querySelector(".statContainer");

  // Add hover event listener to items
  document.querySelectorAll(".tooltip-target").forEach(item => {
      item.addEventListener("mouseover", function() {
          const itemId = this.getAttribute("data-item-id");
          const category = this.getAttribute("data-category");
          const item = inventory[category].find(i => i.name === itemId);

          if (!item) return;

          // Inject item information into the equipmentStatCol2
          statContainer.innerHTML = getTooltipContent(item, category);

          // Show and hide relevant columns
          characterStatCol2.style.display = "none";
          equipmentStatCol2.style.display = "block";
      });

      item.addEventListener("mouseout", () => {
          equipmentStatCol2.style.display = "none";
          characterStatCol2.style.display = "block";
      });
  });
});
// Equipment Column Format
function getTooltipContent(item, category) {
  // Generate item information HTML
  if (category === "weapons") {
    return `
      <table>
          <tr>
              <td>Name:</td>
              <td>${item.name}</td>
          </tr>
          <tr>
              <td>Power:</td>
              <td>${item.power}</td>
          </tr>
          <tr>
              <td>Durability:</td>
              <td>${item.durability}</td>
          </tr>
      </table>
    `;
  } else if (category === "armor") {
      return `
        <table>
            <tr>
                <td>Name:</td>
                <td>${item.name}</td>
            </tr>
            <tr>
                <td>Defense:</td>
                <td>${item.defense}</td>
            </tr>
            <tr>
                <td>Durability:</td>
                <td>${item.durability}</td>
            </tr>
        </table>
      `;
  } else {
    return `
        <table>
            <tr>
                <td>Name:</td>
                <td>${item.name}</td>
            </tr>
            <tr>
                <td>Durability:</td>
                <td>${item.durability}</td>
            </tr>
        </table>
    `;
  }
  
}
// Update the data-item-id for the equipped weapon and armor
function updateEquippedItemDataAttributes() {
  const weapon = inventory.weapons[currentWeapon];
  const armor = inventory.armor[currentArmor];

  document.querySelector("#weaponContainer").setAttribute("data-item-id", weapon.name);
  document.querySelector("#weaponContainer").setAttribute("data-category", "weapons");
  document.querySelector("#armorContainer").setAttribute("data-item-id", armor.name);
  document.querySelector("#armorContainer").setAttribute("data-category", "armor");
}

// Function to scroll to the bottom of the text container
function scrollToBottom() {
  text.scrollTop = text.scrollHeight;
}

// Helper function to handling item stacking
function formatInventoryList(items) {
  const itemMap = new Map();
  
  items.forEach(item => {
    if (itemMap.has(item.name)) {
      itemMap.set(item.name, itemMap.get(item.name) + 1);
    } else {
      itemMap.set(item.name, 1);
    }
  });

  const formattedItems = [];
  itemMap.forEach((quantity, name) => {
    if (quantity > 1) {
      formattedItems.push(`${quantity} ${name}`);
    } else {
      formattedItems.push(name);
    }
  });

  return formattedItems.join(", ");
}
// Transition Overlay Fades
function fadeInOverlay(duration) {
  const overlay = document.getElementById('fadeOverlay');
  overlay.style.setProperty('--fade-duration', `${duration}ms`);
  overlay.style.opacity = 1;
}

function fadeOutOverlay(duration) {
  const overlay = document.getElementById('fadeOverlay');
  overlay.style.setProperty('--fade-duration', `${duration}ms`);
  overlay.style.opacity = 0;
}

/* GAME UPDATES */

// Updates the Game based on location
function update(location) {
  // Turn off Npcs and enemy bar whenever location swaps
  if (!playerInBattle) {
    enemyContainer.style.display = "none";
    enemyStats.style.display = "none";
  }

  // Update button text and functions
  buttonTexts[0].innerText = location["button text"][0];
  buttonTexts[1].innerText = location["button text"][1];
  buttonTexts[2].innerText = location["button text"][2];
  buttonTexts[3].innerText = location["button text"][3];
  buttonTexts[4].innerText = location["button text"][4];
  buttonTexts[5].innerText = location["button text"][5];
  buttons[0].onclick = location["button functions"][0];
  buttons[1].onclick = location["button functions"][1];
  buttons[2].onclick = location["button functions"][2];
  buttons[3].onclick = location["button functions"][3];
  buttons[4].onclick = location["button functions"][4];
  buttons[5].onclick = location["button functions"][5];
  buttons[9].onclick = location["btn functions top"][0];
  buttons[10].onclick = location["btn functions top"][1];
  // Update icon classes
  buttonIcons[0].src = location.controlIcon1[0];
  buttonIcons[1].src = location.controlIcon1[1];
  buttonIcons[2].src = location.controlIcon1[2];
  buttonIcons[3].src = location.controlIcon2[0];
  buttonIcons[4].src = location.controlIcon2[1];
  buttonIcons[5].src = location.controlIcon2[2];
  buttonIcons[9].src = location.headerIcon[0];
  buttonIcons[10].src = location.headerIcon[1];

  // Update other elements
  text.innerHTML = location.text;
  mainDisplay.src = location.locationImg;
  locationName.innerText = location.name;
}

// Updates the game text to reflect new values in Players Gold, Health, and XP
function updateHealthGoldXp() {
  // Ensure gold, health, xp are not negative
  gold = Math.max(0, gold);
  health = Math.max(0, health);
  xp = Math.max(0, xp);
  stamina = Math.max(0, stamina);

  pAtk = baseAtk + inventory.weapons[currentWeapon].power + tempAtk;
  pDef = baseDef + inventory.armor[currentArmor].defense + tempDef;

  // Update gold, health, xp text values
  goldText.forEach(element => {
    element.textContent = gold;
  });
  healthText.forEach(element => {
    element.textContent = health;
  });
  baseHealthText.forEach(element => {
    element.textContent = baseHealth;
  });
  staminaText.forEach(element => {
    element.textContent = stamina;
  });
  baseStaminaText.forEach(element => {
    element.textContent = baseStamina;
  });
  lvlText.forEach(element => {
    element.textContent = level;
  });
  xpText.forEach(element => {
    element.textContent = xp;
  });
  reqXpText.forEach(element => {
    element.textContent = xpRequired;
  });
  atkText.forEach(element => {
    element.textContent = pAtk;
  });
  defText.forEach(element => {
    element.textContent = pDef;
  });

  // Check if health reaches zero and trigger lose function
  if (health <= 0 && !inLoseState) {
    lose();
  }
}

function gainXp(amount) {
  xp += amount;
  console.log(`Gained ${amount} XP. Current XP: ${xp}/${xpRequired}`);

  while (xp >= xpRequired) {
    levelUp();
  }
}

function levelUp() {
  xp -= xpRequired;
  level++;
  xpRequired = level * 10; // Xp Scaling Uniformly

  // Player Stat Increases
  baseHealth += 20;
  baseAtk += 2;
  baseDef += 2;
  health = baseHealth;

  updateHealthGoldXp();
  text.innerText += `You've leveled up to: ${level}. \n Health is now: ${baseHealth}. \n Attack is now: ${baseAtk}. \n Defense is now: ${baseDef}.`;
  console.log(`New stats - Health: ${baseHealth}, Attack: ${baseAtk}, Defense: ${baseDef}`);
}

// GO TO OTHER LOCATION FUNCTIONS
function goTown() {
  fadeInOverlay(300);

  setTimeout(() => {
    hideNpcDialogue();
    hideControlPanel2();
    //Audio cue logic
    if (currentLocationIndex === 1) {
      playSoundEffect('door');
    } else {
      playSoundEffect('steps');
    }
    currentLocationIndex = 0;
    update(locations[0]);
    fadeOutOverlay(300);
  }, 300);
}
function goTavern() {
  fadeInOverlay(300);

  setTimeout(() => {
    controlBarOne.style.display = "flex";
    bountyBoardContainer.style.display = "none";
    //Audio cue logic
    if (currentLocationIndex === 0) {
      playSoundEffect('door');
    } else {
      playSoundEffect('steps');
    }
    currentLocationIndex = 1;
    update(locations[1]);
    showNpcDialogue("bartender");
    fadeOutOverlay(300);
  }, 300);
}
function goMarketStreet() {
  fadeInOverlay(300);

  setTimeout(() => {
    hideNpcDialogue();
    //Audio cue logic
    if (currentLocationIndex === 0 || currentLocationIndex === 14 ) {
      playSoundEffect('steps');
    } else {
      playSoundEffect('door');
    }
    currentLocationIndex = 2;
    update(locations[2]);
    fadeOutOverlay(300);
  }, 300);
}
function goStore() {
  fadeInOverlay(300);

  setTimeout(() => {
    //Audio cue logic
    if (currentLocationIndex === 2 ) {
      playSoundEffect('door');
    } else {
      playSoundEffect('steps');
    }
    currentLocationIndex = 3;
    update(locations[3]);
    showNpcDialogue("shopkeeper");
    fadeOutOverlay(300);
  }, 300);
}
function goBlacksmith() {
  fadeInOverlay(300);

  setTimeout(() => {
    //Audio cue logic
    if (currentLocationIndex === 2 ) {
      playSoundEffect('door');
    } else {
      playSoundEffect('steps');
    }
    currentLocationIndex = 4;
    update(locations[4]);
    showNpcDialogue("blacksmith");
    fadeOutOverlay(300);
  }, 300);
}
function goSprawl() {
  fadeInOverlay(300);

  setTimeout(() => {
    playerInBattle = false;
    hideNpcDialogue();
    //Audio cue logic
    if (currentLocationIndex === 6 ) {
      playSoundEffect('door');
    } else {
      playSoundEffect('steps');
    }
    currentLocationIndex = 5;
    update(locations[5]);
    hideControlPanel2();
    fadeOutOverlay(300);
  }, 300);
}
function goCatacombs() {
  fadeInOverlay(300);

  setTimeout(() => {
    playerInBattle = false;
    hideNpcDialogue();
    //Audio cue logic
    if (currentLocationIndex === 5 || currentLocationIndex === 9 ) {
      playSoundEffect('steps');
    }
    currentLocationIndex = 6;
    update(locations[6]);
    showControlPanel2();
    fadeOutOverlay(300);
  }, 300);
}
function goBountyBoard() {
  fadeInOverlay(300);

  setTimeout(() => {
    hideNpcDialogue();
    controlBarOne.style.display = "none";
    generateRandomBounties();
    updateBountyBoardUI();
    bountyBoardContainer.style.display = "flex";
    //Audio cue logic
    if (currentLocationIndex === 1 ) {
      playSoundEffect('steps');
    }
    currentLocationIndex = 13;
    update(locations[13]);
    fadeOutOverlay(300);
  }, 300);
}
function goTrainingYard() {
  fadeInOverlay(300);

  setTimeout(() => {
    playSoundEffect('steps');
    currentLocationIndex = 14;
    update(locations[14]);
    showNpcDialogue("trainer");
    fadeOutOverlay(300);
  }, 300);
}


//Control Panel 2 Toggle
function showControlPanel2() {
  for (let i = 3; i < 6; i++) {
    buttons[i].style.display = "flex"; // Hide buttons by default
  }
  controlBarTwo.style.display = "flex";
}
function hideControlPanel2() {
  controlBarTwo.style.display = "none";
}

function showNpcDialogue(npc) {
  if (npc === "bartender") {
    npcContainer.src = "./assets/sprites/bartenderImg.png";
    npcName.innerText = "Harwin the Barkeep";
    dialogue.innerText = "Are you buying or just another drifter looking for work?";
  } else if (npc === "blacksmith") {
    npcContainer.src = "./assets/sprites/blacksmithImg.png";
    npcName.innerText = "Garin the Blacksmith";
    dialogue.innerText = "Huh? Speak up if you want something...";
  } else if (npc === "shopkeeper") {
    npcContainer.src = "./assets/sprites/shopkeeperImg.png";
    npcName.innerText = "Marla the Trader";
    dialogue.innerText = "Greetings! Potions for sale for your travels.";
  } else if (npc === "trainer") {
    npcContainer.src = "./assets/sprites/trainerImg.png";
    npcName.innerText = "Seraphina the Trainer";
    dialogue.innerText = "Best to be prepared before venturing out into the sprawl.";
  }
  npcContainer.style.display = "block";
  dialogueContainer.style.display = "block";
}
function hideNpcDialogue() {
  npcContainer.style.display = "none";
  dialogueContainer.style.display = "none";
}

/* GAME MENUS AND JOURNAL */

//Collapsible Toggle for journal content
$(document).ready(function() {
  $(".collapsible").click(function() {
    $(this).toggleClass("active");
    $(this).next(".content").slideToggle();
  });
});

function openGameMenu() {
  const gameMenu = document.querySelector("#gameMenuContainer");
  gameMenu.style.display = "flex";
}

function closeGameMenu() {
  const gameMenu = document.querySelector("#gameMenuContainer");
  gameMenu.style.display = "none";
}

function hideGameElements(menu) {
  // Hide all common elements first
  mainScreen.style.display = "none";
  statBar.style.display = "none";
  text.style.display = "none";
  bountyBoardContainer.style.display = "none";
  enemyContainer.style.display = "none";
  enemyStats.style.display = "none";
  hideNpcDialogue();

  // Handle specific elements based on the menu
  if (menu === 'character') {
    controlBarOne.style.display = "none";
    journalContainer.style.display = "none";
  } else if (menu === 'journal') {
    csContainer.style.display = "none";
    inventoryHeader.style.display = "none";
    inventoryContainer.style.display = "none";
  }
}

function updateGameMenuText(menu) {
  if (menu === 'character') {
    locationName.innerText = characterName;
    buttonIcons[9].src = "./assets/icons/characterIcon.png";
    buttonIcons[10].src = "./assets/icons/closeIcon.png";

    const weaponsText = inventory.weapons.length ? formatInventoryList(inventory.weapons) + "." : "";
    const armorText = inventory.armor.length ? formatInventoryList(inventory.armor) + "." : "";
    const itemsText = inventory.items.length ? formatInventoryList(inventory.items) + "." : "";
    invWeaponList.innerText = weaponsText;
    invArmorList.innerText = armorText;
    invItemList.innerText = itemsText;
  } else if (menu === 'journal'){
    locationName.innerText = "Journal";
    buttonIcons[9].src = "./assets/icons/journalIcon.png";
    buttonIcons[10].src = "./assets/icons/closeIcon.png";
  }
}

function showGameMenuElements(menu) {
  if (menu === 'character') {
  csContainer.style.display = "flex";
  inventoryHeader.style.display = "block";
  inventoryContainer.style.display = "flex";
  } else if (menu === 'journal'){
  journalContainer.style.display = "block";
  controlBarOne.style.display = "flex";
  }
}

function setUpNavigationButtons(previousLocationIndex, menu) {
  if (menu === 'character') {
  buttons[6].onclick = () => exitCharacterMenu(previousLocationIndex);
  buttons[7].onclick = () => openJournalMenu();
  buttons[9].onclick = () => {}; /* Empty value until exit */
  buttons[10].onclick = () => exitCharacterMenu(previousLocationIndex);
  } else if (menu === 'journal'){
    buttons[0].onclick = () => openBounties();
    buttons[1].onclick = () => openNotes();
    buttons[2].onclick = () => openBestiary();
    buttons[6].onclick = () => openCharacterMenu();
    buttons[7].onclick = () => exitJournalMenu(previousLocationIndex);
    buttons[9].onclick = () => {}; /* Empty value until exit */
    buttons[10].onclick = () => exitJournalMenu(previousLocationIndex);
    //button icons
    buttonIcons[0].src = "./assets/icons/bountiesIcon.png";
    buttonIcons[1].src = "./assets/icons/notesIcon.png";
    buttonIcons[2].src = "./assets/icons/theBestiaryIcon.png";
    //button text
    buttonTexts[0].innerText = "Bounties";
    buttonTexts[1].innerText = "Notes";
    buttonTexts[2].innerText = "Bestiary";
  }
}

function openCharacterMenu() {
  const previousLocationIndex = currentLocationIndex;
  const menu = 'character';
 
  hideGameElements(menu);
  showGameMenuElements(menu);
  updateGameMenuText(menu);
  setUpNavigationButtons(previousLocationIndex, menu);
  hideControlPanel2();

  console.log("Open Character Menu");
}

function exitCharacterMenu(previousLocationIndex) {
  // Hide character menu elements
  csContainer.style.display = "none";
  inventoryHeader.style.display = "none";
  inventoryContainer.style.display = "none";
  // Show game elements again
  mainScreen.style.display = "block";
  statBar.style.display = "block";
  controlBarOne.style.display = "flex";
  text.style.display = "block";
  //update buttons
  button7.onclick = openCharacterMenu;
  button8.onclick = openJournalMenu;

  console.log("The previouslocationIndex is:", previousLocationIndex);
  if (previousLocationIndex === 1) {
    showNpcDialogue("bartender");
  } else if (previousLocationIndex === 3) {
    showNpcDialogue("shopkeeper");
  } else if (previousLocationIndex === 4) {
    showNpcDialogue("blacksmith");
  } else if (previousLocationIndex === 6) {
    showControlPanel2();
  } else if (previousLocationIndex === 7) {
    enemyContainer.style.display = "block";
    enemyStats.style.display = "block";
  } else if (previousLocationIndex === 13) {
    controlBarOne.style.display = "none";
    bountyBoardContainer.style.display = "flex";
  }

  update(locations[previousLocationIndex]);
  console.log("Returning to:", locations[previousLocationIndex].name);
}

function openJournalMenu(tab = 'bounties') {
  const previousLocationIndex = currentLocationIndex;
  const menu = 'journal';

  hideGameElements(menu);
  showGameMenuElements(menu);
  updateGameMenuText(menu);
  setUpNavigationButtons(previousLocationIndex, menu);
  hideControlPanel2();
  // Open the specified tab
  if (tab === 'bounties') {
    openBounties();
  } else if (tab === 'notes') {
    openNotes();
  } else if (tab === 'bestiary') {
    openBestiary();
  }

  console.log("Open Journal Menu with tab:", tab);
}

function exitJournalMenu(previousLocationIndex) {
  // Hide journal menu elements
  journalContainer.style.display = "none";
  $("#bountiesTab").removeClass("hidden").addClass("block");
  $("#notesTab").removeClass("block").addClass("hidden");
  $("#bestiaryTab").removeClass("block").addClass("hidden");
  // Show game elements again
  mainScreen.style.display = "block";
  statBar.style.display = "block";
  text.style.display = "block";
  //update buttons
  button7.onclick = openCharacterMenu;
  button8.onclick = openJournalMenu;

  if (previousLocationIndex === 1) {
    showNpcDialogue("bartender");
  } else if (previousLocationIndex === 3) {
    showNpcDialogue("shopkeeper");
  } else if (previousLocationIndex === 4) {
    showNpcDialogue("blacksmith");
  } else if (previousLocationIndex === 6) {
    showControlPanel2();
  } else if (previousLocationIndex === 7 || 8) {
    enemyContainer.style.display = "block";
    enemyStats.style.display = "block";
  } else if (previousLocationIndex === 13) {
    controlBarOne.style.display = "none";
    bountyBoardContainer.style.display = "flex";
  }

  update(locations[previousLocationIndex]);
  console.log("Returning to:", locations[previousLocationIndex].name);
}

function openBounties() {
  // Show Bounties div, hide other tabs
  $("#bountiesTab").removeClass("hidden").addClass("block");
  $("#notesTab").removeClass("block").addClass("hidden");
  $("#bestiaryTab").removeClass("block").addClass("hidden");

  console.log("Open Bounties Menu");
}

function openNotes() {
  // Show Notes div, hide other tabs
  $("#bountiesTab").removeClass("block").addClass("hidden");
  $("#notesTab").removeClass("hidden").addClass("block");
  $("#bestiaryTab").removeClass("block").addClass("hidden");

  console.log("Open Notes Menu");
}

function openBestiary() {
  // Show Bestiary div, hide other tabs
  $("#bountiesTab").removeClass("block").addClass("hidden");
  $("#notesTab").removeClass("block").addClass("hidden");
  $("#bestiaryTab").removeClass("hidden").addClass("block");

  console.log("Open Bestiary Menu");
}

function bestiaryShortcut() {
  openJournalMenu();
  openBestiary();
}

function notesShortcut() {
  openJournalMenu();
  openNotes();
}

/* TOWN FUNCTIONS */

// Store Function - Buy Health Recovery potion using gold
function buyHealthPotion() {
  if (gold >= 10) {
    playSoundEffect('coin');
    gold -= 10;
    inventory.items.push(items[0]);
    updateHealthGoldXp();
    text.innerText = "You bought a Healing Potion.";
  } else {
    text.innerText = "You do not have enough gold to buy a health potion.";
  }
}
// Store Function - Buy Attack Up potion using gold
function buyBerserkerPotion() {
  if (gold >= 10) {
    playSoundEffect('coin');
    gold -= 10;
    inventory.items.push(items[1]);
    updateHealthGoldXp();
    text.innerText = "You bought a berserker draught.";
  } else {
    text.innerText = "You do not have enough gold to buy a berserker draught.";
  }
}
// Store Function - Buy Defense Up potion using gold
function buyIronskinPotion() {
  if (gold >= 10) {
    playSoundEffect('coin');
    gold -= 10;
    inventory.items.push(items[2]);
    updateHealthGoldXp();
    text.innerText = "You bought a ironskin draught.";
  } else {
    text.innerText = "You do not have enough gold to buy a berserker draught.";
  }
}

// Event Function - Randomly Adds a potion to inventory
function addRandomPotionToInventory() {
  const randomIndex = Math.floor(Math.random() * items.length);
  inventory.items.push(items[randomIndex]);
  console.log(`Added ${items[randomIndex].name} to inventory.`);
}

// Forge Function - Buys a new weapon in a sequence that gets equipped, each weapon is subsequently stronger
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      playSoundEffect('coin');
      gold -= 30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon];
      inventory.weapons.push({ name: newWeapon.name, power: newWeapon.power, durability: newWeapon.durability }); // Set initial durability for bought weapons
      updateHealthGoldXp();
      text.innerText = `You've purchased a ${newWeapon.name}.\n In your inventory you now have:\n ${inventory.weapons.map(w => w.name).join(", ")}.`;
      updateEquippedItemDataAttributes();
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button1.innerText = "Sell old weapon for 15 gold";
    button1.onclick = sellWeapon;
  }
}
// Forge Function - A sell weapon function that appears when the player has max weapons ie. Wooden Club, Dagger, Mace, Sword
function sellWeapon() {
  if (inventory.weapons.length > 1) {
    playSoundEffect('coin');
    gold += 15;
    let soldWeapon = inventory.weapons.slice(1);
    updateHealthGoldXp();
    text.innerText = `You've sold a ${soldWeapon.name}.\n In your inventory you have:\n ${inventory.weapons.map(w => w.name).join(", ")}.`;
    updateEquippedItemDataAttributes();
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
// Forge Function - Buys a new armor piece in a sequence that gets equipped, each armor is subsequently stronger
function buyArmor() {
  if (currentArmor < armors.length - 1) {
    if (gold >= 50) {
      playSoundEffect('coin');
      gold -= 50;
      currentArmor++;
      let newArmor = armors[currentArmor]
      inventory.armor.push({ name: newArmor.name, defense: newArmor.defense, durability: newArmor.durability });
      updateHealthGoldXp();
      text.innerText = `You've purchased ${newArmor.name}.\n In your inventory you have:\n ${inventory.armor.map(a => a.name).join(", ")}.`;
      updateEquippedItemDataAttributes();
    } else {
      text.innerText = "You do not have enough gold to buy armor.";
    }
  } else {
    text.innerText = "You already have the best armor!";
  }
}
// Forge Function - Repairs players weapons and armor
function repairEquipment() {
  let repairCost = 10;
  let repairsMade = false;

  // Repair weapon
  let playerWeapon = inventory.weapons[currentWeapon];
  let defaultWeapon = weapons.find(weapon => weapon.name === playerWeapon.name);

  if (defaultWeapon.durability === Infinity) {
    text.innerText += `\n${playerWeapon.name} is unbreakable and does not need repairs.`;
    scrollToBottom();
  } else if (playerWeapon.durability < defaultWeapon.durability) {
    if (gold >= repairCost) {
      playSoundEffect('coin');
      setTimeout(() => { 
        playSoundEffectMultipleTimes('metalSmClang', 3, 400);
      }, 300);
      gold -= repairCost;
      playerWeapon.durability = defaultWeapon.durability;
      text.innerText += `\n${playerWeapon.name} has been repaired to maximum durability.`;
      scrollToBottom();
      repairsMade = true;
    } else {
      text.innerText += "\nYou don't have enough gold to repair your weapon.";
      scrollToBottom();
    }
  } else {
    text.innerText += `\n${playerWeapon.name} is already at maximum durability.`;
    scrollToBottom();
  }

  // Repair armor
  let playerArmor = inventory.armor[currentArmor];
  let defaultArmor = armors.find(armor => armor.name === playerArmor.name);

  if (defaultArmor.durability === Infinity) {
    text.innerText += `\n${playerArmor.name} is unbreakable and does not need repairs.`;
    scrollToBottom();
  } else if (playerArmor.durability < defaultArmor.durability) {
    if (gold >= repairCost) {
      gold -= repairCost;
      playerArmor.durability = defaultArmor.durability;
      text.innerText += `\n${playerArmor.name} has been repaired to maximum durability.`;
      scrollToBottom();
      repairsMade = true;
    } else {
      text.innerText += "\nYou don't have enough gold to repair your armor.";
      scrollToBottom();
    }
  } else {
    text.innerText += `\n${playerArmor.name} is already at maximum durability.`;
  }

  if (!repairsMade) {
    text.innerText += "\nNo repairs were necessary or possible due to lack of gold.";
    scrollToBottom();
  }

  updateHealthGoldXp();
}

// Tavern Function - Rest which recovers Health and Focus/Stamina using gold
function rest() {
  if (gold >= 10 && health < baseHealth || stamina < baseStamina ) {
    playSoundEffect('coin');
    fadeInOverlay(1000);

    setTimeout(() => {
      gold -= 10;
      health = baseHealth;
      stamina = baseStamina;
      updateHealthGoldXp();
      text.innerText = "You rest and recover all your health and focus.";
      fadeOutOverlay(1000);
    }, 1000);
  } else if (health >= baseHealth && stamina >= baseStamina) {
    text.innerText = "You already feel full of vigor and don't need to rest.";
  } else {
    text.innerText = "You do not have enough gold to rest.";
  }
}
// Tavern Function - To work for the tavern, random events that have rewards and penalties
function work() {
  //Randomly select event
  const event = workEventsTavern[Math.floor(Math.random() * workEventsTavern.length)];
  event.effect();
  text.innerText = event.description;
  updateHealthGoldXp();
}
// Bounty Board - generates the random bounties for the player
function generateRandomBounties() {
  bounties.length = 0;

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * (enemies.length - 1));
    const selectedEnemy = enemies[randomIndex];
    const targetNum = Math.floor(Math.random() * 3) + 3; /* Random between 3 and 5 */

    const rewardGold = Math.floor(selectedEnemy.level * 3.7) * targetNum;
    const rewardXp = selectedEnemy.level * targetNum;
    

    const bounty = {
      category: `Bounty - ${selectedEnemy.location}`,
      objective: `Defeat ${selectedEnemy.name}s`,
      currentNum: 0,
      targetNum: targetNum,
      rewardGold: rewardGold,
      rewardXp: rewardXp,
      enemyName: selectedEnemy.name,
      enemyIcon: selectedEnemy.enemyIcon,
      status: "Available"
    };
    bounties.push(bounty);
  }
  updateBountyBoardUI();
}
// Bounty Board - Updates the Bounty Boards UI
function updateBountyBoardUI() {
  for (let i = 0; i < 3; i++) {
    const bounty = bounties[i];
    const container = document.getElementById(`bountyRequest${i + 1}`);
    if (bounty && bounty.status === "Available") {
      container.style.display = "flex";
      container.innerHTML = `
        <div class="enemyInfoContainer">
          <img class="bountyEnemyIcon" src="${bounty.enemyIcon}" alt="${bounty.enemyName}">
          <div class="bountyInfo">
            <span class="bountyCategory">${bounty.category}</span>
            <span>
              <span class="bountyObjective">${bounty.objective}</span>
              <span class="objectiveNumber">
                <span class="currentNumDefeatBounty">${bounty.currentNum}</span> / 
                <span class="currentNumTargetBounty">${bounty.targetNum}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="enemyRewardContainer">
          <span>Gold: <span class="bountyRewardGoldNumber">${bounty.rewardGold}</span></span>              
          <span>Xp: <span class="bountyRewardXpNumber">${bounty.rewardXp}</span></span>
        </div>
        <div class="infoButtonContainer">
          <button class="acceptBountyButton" onclick="acceptBounty(${i})">Accept</button>
        </div>
      `;
    } else {
      container.style.display = "none"; // Clear the container if no bounty
    }
  }
}
// Bounty Board - Player Accepts the a Bounty which updates UI
function acceptBounty(index) {
  if (acceptedBounties.length < 3) {
    acceptedBounties.push(bounties[index]);
    bounties[index].status = "Accepted";
    document.getElementById(`bountyRequest${index + 1}`).style.display = "none";
    updateBountyBoardUI();
    updateJournalUI();
  } else {
    alert("You can only accept up to 3 bounties at a time.");
  }
}
// Bounty Board - Updates the UI in the Players Journal
function updateJournalUI() {
  //remove completed bounties
  acceptedBounties = acceptedBounties.filter(bounty => bounty.status !== "Completed");
  
  for (let i = 0; i < 3; i++) {
    const bounty = acceptedBounties[i];
    const container = document.getElementById(`journalBounty${i + 1}`);
    if (bounty) {
      container.style.display = "flex";
      container.innerHTML = `
        <div class="enemyInfoContainer">
          <img class="bountyEnemyIcon" src="${bounty.enemyIcon}" alt="${bounty.enemyName}">
          <div class="bountyInfo">
            <span class="bountyCategory">${bounty.category}</span>
            <span>
              <span class="bountyObjective">${bounty.objective}</span>
              <span class="objectiveNumber">
                <span class="currentNumDefeatBounty">${bounty.currentNum}</span> / 
                <span class="currentNumTargetBounty">${bounty.targetNum}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="enemyRewardContainer">
          <span>Gold: <span class="bountyRewardGoldNumber">${bounty.rewardGold}</span></span>              
          <span>Xp: <span class="bountyRewardXpNumber">${bounty.rewardXp}</span></span>
        </div>
        <div class="infoButtonContainer">
          <button class="removeBountyButton" onclick="removeBounty(${i})">Remove</button>
        </div>
      `;
    } else {
      container.style.display = "none";
    }
  }
}
// Bounty Board - Updates the UI in Players Journal - removing bounty 
function removeBounty(index) {
  acceptedBounties.splice(index, 1);
  updateJournalUI();
}

// Training Square Functions - Learn all player skills
function learnSkills() {
  playerSkills = [...skills]; // Assign the entire skills array to playerSkills
  text.innerText = "You've learned all the skills.";
  console.log(playerSkills);
}

function forgetSkills() {
  playerSkills = []; // Remove All Skills
  text.innerText = "You've forgotten all known skills.";
  console.log(playerSkills);
}

function updateSkills() {
  text.innerText = "Skills have been upgraded.";
  text.innerText += " This feature is not working yet.";
}
// Random Events located in sprawl
function scavengeSprawl() {
  //Randomly select event
  const event = scavengeSprawlEvents[Math.floor(Math.random() * scavengeSprawlEvents.length)];
  event.effect();
  text.innerText = event.description;
  updateHealthGoldXp();
}


/* GO TO BATTLE */
// Catacomb enemies
function fightSlime() {
  fighting = 0;
  goBattle();
}
function fightBurrower() {
  fighting = 1;
  goBattle();
}
function fightCorpse() {
  fighting = 2;
  goBattle();
}
function fightGhoul() {
  fighting = 3;
  goBattle();
}
function fightCrawler() {
  fighting = 4;
  goBattle();
}
function fightReaver() {
  fighting = 5;
  goBattle();
}
// Main Boss Battle
function fightBaelrath() {
  fighting = 6;
  goBattle();
}

// Updates game to enter Battle mode after selecting a enemy to fight
function goBattle() {
  playerInBattle = true;
  toggleButtons('off');
  playSoundEffect('battleTransition');
  fadeInOverlay(500);
  setTimeout(() => {
    if (fighting === 6) {
      audioManager.transitionBGM('bossBattle');
    } else {
      audioManager.transitionBGM('battle');
    }
    const fightLocation = enemies[fighting].location;
    if (fightLocation === "Catacombs") {
      currentLocationIndex = 7;
      update(locations[7]);
    } else {
      currentLocationIndex = 8;
      update(locations[8]);
    }
    enemyHealth = enemies[fighting].health;
    enemyContainer.src = enemies[fighting].enemyImage;
    enemyContainer.style.display = "block";
    enemyStats.style.display = "block";
    enemyName.innerText = enemies[fighting].name;
    enemyHealthText.innerText = enemyHealth;
    hideControlPanel2();
    fadeOutOverlay(500);
    text.innerText = "You encounter a " + enemies[fighting].name + ".";
    toggleButtons('on');
  }, 500);
}

function runFromBattle() {
  const fightLocation = enemies[fighting].location;
  resetTempEffects();
  fadeInOverlay(500);
  playSoundEffectMultipleTimes('steps', 2, 300);
  audioManager.transitionBGM('main');
  setTimeout(() => {
    if (playerInBattle) {
      if (fightLocation === "Catacombs") {
        currentLocationIndex = 6;
        playerInBattle = false;
        update(locations[6]);
        showControlPanel2();
      } else {
        currentLocationIndex = 5;
        playerInBattle = false;
        update(locations[5]);
        hideControlPanel2();
      }
    }
    fadeOutOverlay(500);
  }, 500);
}

/* BATTLE */

let controlBarTwoVisible = false;

function playerTurn(actionFunction) {
  console.log("Initial Health:", health); // Log initial health

  // Disable buttons while Player turn happens
  toggleButtons('off');

  // Execute the player's action
  actionFunction();

  // Check if enemy is still alive before executing the enemy's turn
  if (enemyHealth > 0) {
    setTimeout(enemyTurn, 1000); // 1-second delay before enemy's turn
  } else {
    // Re-enable Button inputs
    toggleButtons('on');
  }
}

// Function for player's attack
function playerAttack() {
  controlBarTwo.style.display = "none";
  playerTurn(() => {
    text.innerText += "\nYou attack the " + enemies[fighting].name + " with your " + weapons[currentWeapon].name + ".";
    scrollToBottom();

    //playerAttackAnimation();
    playAnimation("playerAttack");
    playSoundEffect('attack');

    if (isEnemyHit()) {
      const { finalDamage, isCritical } = playerAttackValue();
      const playersAttack =  Math.floor(Math.max(finalDamage - enemies[fighting].defense, 1));
      enemyHealth -= playersAttack;

      enemyContainer.classList.add("animation-shake");
      enemyContainer.classList.add("enemy-hit");
      setTimeout(() => {
        enemyContainer.classList.remove("animation-shake");
        enemyContainer.classList.remove("enemy-hit");
      }, 200);

      text.innerText += "\nYou hit the " + enemies[fighting].name + " for " + playersAttack + " damage.";
      if (isCritical) {
        text.innerText += "\nIt's a critical hit!";
      }
      scrollToBottom();
      updateWeaponDurability(2);
      enemyHealthText.innerText = Math.max(0, enemyHealth);

      if (enemyHealth <= 0) {
        setTimeout(() => {
          if (fighting === 6) {
            winGame();
          } else {
            defeatEnemy();
          }
        }, 1200); // 1.2-second delay to let the animation complete
      }
    } else {
      text.innerText += "\nYou miss.";
      scrollToBottom();
    }
  });
}

// Function for using a skill
function useSkill(skillName) {
  controlBarTwo.style.display = "none";
  controlBarTwoVisible = false;
  if (stamina > 0) {
    stamina--;
    updateHealthGoldXp();
    playerTurn(() => {
      const skill = playerSkills.find(skill => skill.name === skillName);

      if (skillName === "Double Slash") {
        playAnimation("playerAttack");
        text.innerText += `\n You use ${skill.name} on the ${enemies[fighting].name}.`;
        scrollToBottom();
        const skillDamage = skill.damage;
        updateWeaponDurability(5);
        enemyHealth -= skillDamage;
        text.innerText += `\n You dealt ${skillDamage} skill damage.`;
        scrollToBottom();
        enemyHealthText.innerText = Math.max(0, enemyHealth);
      } else if (skillName === "Riposte") {
        playAnimation("playerAttack");
        text.innerText += `\n You use ${skill.name} on the ${enemies[fighting].name}.`;
        scrollToBottom();
        const skillDamage = skill.damage;
        updateWeaponDurability(5);
        enemyHealth -= skillDamage;
        text.innerText += `\n You dealt ${skillDamage} skill damage.`;
        scrollToBottom();
        enemyHealthText.innerText = Math.max(0, enemyHealth);
      } else if (skillName === "Shield Bash") {
        playAnimation("playerAttack");
        playSoundEffect('whack');
        text.innerText += `\n You use ${skill.name} on the ${enemies[fighting].name}.`;
        scrollToBottom();
        const skillDamage = skill.damage;
        updateWeaponDurability(5);
        enemyHealth -= skillDamage;
        text.innerText += `\n You dealt ${skillDamage} skill damage.`;
        scrollToBottom();
        enemyHealthText.innerText = Math.max(0, enemyHealth);
      }
    
      if (enemyHealth <= 0) {
        setTimeout(() => {
          if (fighting === 6) {
            winGame();
          } else {
            defeatEnemy();
          }
        }, 1200); // 1-second delay to let the animation complete
      }
    });
  } else {
    // If player doesnt have enough stamina
    text.innerText += `\nYou do not have enough stamina to use your skill.`;
    scrollToBottom();
  }
  
}

// Function for using an item
function useItem(itemName) {
  controlBarTwo.style.display = "none";
  controlBarTwoVisible = false;
  // Find the item in the player's inventory
  const itemIndex = inventory.items.findIndex(item => item.name === itemName);

  if (itemIndex !== -1) {
      // If the item is found, apply its effect
      const item = inventory.items[itemIndex];
    
      if (item.name === "Healing Potion") {
        playerTurn(() => {
          playSoundEffect('bottle');
          health += item.healAmount;
          health = Math.min(health, baseHealth); // Ensure health doesn't exceed baseHealth
          inventory.items.splice(itemIndex, 1); // Remove the used item from the inventory
          updateHealthGoldXp();
          text.innerText += `\nYou used a ${item.name} and healed ${item.healAmount} health.`;
          scrollToBottom();
        });// Proceed to enemy turn after a delay
      } else if (item.name === "Berserker Draught" && !item.used) {
        playerTurn(() => {
          playSoundEffect('bottle');
          tempAtk = item.atkUp;
          updateHealthGoldXp();
          item.used = true;
          inventory.items.splice(itemIndex, 1); // Remove the used Item from Inventory
          text.innerText += `\nYou used a ${item.name} and increased your attack by ${item.atkUp}.`;
          scrollToBottom();
        });// Proceed to enemy turn after a delay
      } else if (item.name === "Berserker Draught" && item.used) {
        controlBarTwo.style.display = "flex";
        text.innerText += `\nYou've already used a ${item.name} recently and it would have no effect.`;
        scrollToBottom();
      } else if (item.name === "Ironskin Draught" && !item.used) {
        playerTurn(() => {
          playSoundEffect('bottle');
          tempDef = item.defUp;
          updateHealthGoldXp();
          item.used = true;
          inventory.items.splice(itemIndex, 1); // Remove the used Item from Inventory
          text.innerText += `\nYou used a ${item.name} and increased your defense by ${item.defUp}.`;
          scrollToBottom();
        });// Proceed to enemy turn after a delay
      }else if (item.name === "Ironskin Draught" && item.used) {
        controlBarTwo.style.display = "flex";
        text.innerText += `\nYou've already used a ${item.name} recently and it would have no effect.`;
        scrollToBottom();
      }
      // Check if any items of this type are left
      const remainingItems = inventory.items.filter(item => item.name === itemName);
      if (remainingItems.length === 0) {
        battleControls("items"); // Update the control bar if no items of this type are left
      }
    
  } else {
    // If the item is not found in the inventory
    text.innerText += `\nYou do not have a ${itemName}.`;
    scrollToBottom();
  }
}

// Function to handle the enemy's turn
function enemyTurn() {
  toggleButtons('off');
  text.innerText += "\n The " + enemies[fighting].name + " attacks.";
  scrollToBottom();

  playAnimation("enemyAttack");
  //audio SFX logic for enemy type
  if (fighting === 0) {
    playSoundEffect('slime');
  } else if (fighting === 1 || fighting === 4) {
    playSoundEffect('biteSmall');
  } else if (fighting === 2) {
    playSoundEffect('zombie');
  } else if (fighting === 3) {
    playSoundEffect('ghoul');
  } else if (fighting === 5) {
    playSoundEffect('swingHvy');
  } else if (fighting === 6) {
    playSoundEffect('shadeRar');
  } else {
    playSoundEffect('attack');
  }
  
  const { finalDamage, isCritical } = enemyAttackValue();
  const enemyAttack = finalDamage;
  health -= enemyAttack;
  health = Math.max(0, health);

  setTimeout(() => {
    text.innerText += "\nThe " + enemies[fighting].name + " hits you for " + enemyAttack + " damage.";
    if (isCritical) {
      text.innerText += "\nIt's a critical hit!";
    }
    scrollToBottom();

    if (health <= 0) {
      text.innerText += "\nThe attack was fatal and you've died.";
      scrollToBottom();
    }

    updateHealthGoldXp(); // The lose check in here is not happening
    console.log("Health after update:", health);

    // Re-enable Button inputs
    toggleButtons('on');
  }, 1200); // 1-second delay before updating player's health and text
}

// Calculates Enemies Attack based on enemies level
function enemyAttackValue() {
  const fluctuation = 0.2; // 20% fluctuation
  const minDamage = enemies[fighting].attack * (1 - fluctuation);
  const maxDamage = enemies[fighting].attack * (1 + fluctuation);
  let baseDamage = Math.random() * (maxDamage - minDamage) + minDamage;

  const criticalChance = 0.05;
  let isCritical = false;
  if (Math.random() < criticalChance) {
    isCritical = true;
    baseDamage *= 2;
    console.log("Monster Critical Hit!", baseDamage);
  }
  
  const finalDamage = Math.floor(Math.max(baseDamage - pDef, 1));

  //Update the durability of armor after taking final hit
  updateArmorDurability(finalDamage);
  return { finalDamage: finalDamage, isCritical: isCritical};
}

function playerAttackValue() {
  const fluctuation = 0.2; // 20% fluctuation
  const minDamage = pAtk * (1 - fluctuation);
  const maxDamage = pAtk * (1 + fluctuation);
  let finalDamage = Math.random() * (maxDamage - minDamage) + minDamage;
  
  // 5% chance for critical hit
  const criticalChance = 0.05;
  let isCritical = false;
  if (Math.random() < criticalChance) {
    isCritical = true;
    finalDamage *= 2;
    console.log("Player Critical Hit!", finalDamage);
  }

  return { finalDamage: finalDamage, isCritical: isCritical };
  }

//Weapon Durability handling
function updateWeaponDurability(damage) {
  
  inventory.weapons[currentWeapon].durability -= damage;
  
  if (inventory.weapons[currentWeapon].durability <= 0) {
    text.innerText += ` Your ${inventory.weapons[currentWeapon].name} breaks.`;
    inventory.weapons.splice(currentWeapon, 1);  // Remove broken weapon from inventory
    currentWeapon = Math.max(0, currentWeapon - 1);  // Fallback to next weapon, or default if none
    updateEquippedItemDataAttributes();
  }
  console.log("New Weapon Durability: ", inventory.weapons[currentWeapon].durability );
}

//Armor Durability handling
function updateArmorDurability(damage) {
  
  console.log("Current Armor Durability: ", inventory.armor[currentArmor].durability);
  //Check if player has armor equipped other than Cloth Tunic.
  if (currentArmor > 0) { 
    //currentArmorItem.durability -= damage;
    inventory.armor[currentArmor].durability -= damage;

    if (inventory.armor[currentArmor].durability <= 0) {
      text.innerText += ` Your ${inventory.armor[currentArmor].name} breaks.`;
      inventory.armor.splice(currentArmor, 1);  // Remove broken armor from inventory
      currentArmor = Math.max(0, currentArmor - 1);  // Fallback to "Cloth Tunic"
      updateEquippedItemDataAttributes();
      updateHealthGoldXp();
    }
  }
  console.log("New Armor Durability: ", inventory.armor[currentArmor].durability );
}

// Gives a chance to miss
function isEnemyHit() {
  return Math.random() > 0.1 || health < 20;
}

// Dodges a enemies attack or basically just skips turn
function dodge() {
  text.innerText = `You dodge the attack from the ${enemies[fighting].name}.`;
}

// Grouping items in inventory function 
function groupItemsByType(items) {
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});
  
  return grouped;
}

// Manages the functionality of the 2nd Controls Bar
function battleControls(buttonCategory) {
  // Toggle the visibility of controlBarTwo
  controlBarTwoVisible = !controlBarTwoVisible;
  controlBarTwo.style.display = controlBarTwoVisible ? "flex" : "none";

  // If controlBarTwo is not visible, exit the function early
  if (!controlBarTwoVisible) return;

  // Clear previous button assignments
  for (let i = 3; i < 6; i++) {
    buttonTexts[i].innerText = "";
    buttons[i].onclick = null;
    buttonIcons[i].src = "";
    buttons[i].style.display = "none"; // Hide buttons by default
  }

  if (buttonCategory === "items") {
    const groupedItems = groupItemsByType(inventory.items);
    const itemTypes = Object.keys(groupedItems);

    if (itemTypes.length === 0) {
      text.innerText += "\nYou do not have any items.";
      scrollToBottom();
      controlBarTwo.style.display = "none";
      controlBarTwoVisible = false;
    } else {
      itemTypes.slice(0,3).forEach((itemType, index) => {
        const itemCount = groupedItems[itemType].length;
        buttonTexts[3 + index].innerText = `${itemType} (${itemCount})`;
        buttons[3 + index].onclick = () => useItem(itemType);
        buttonIcons[3 + index].src = groupedItems[itemType][0].icon;
        buttons[3 + index].style.display = "flex"; // Show the button
      });
      controlBarTwo.style.display = "flex";
      controlBarTwoVisible = true;
    }
  } else if (buttonCategory === "skills") {
    if (playerSkills.length === 0) {
      text.innerText += "\nYou do not have any skills.";
      scrollToBottom();
      controlBarTwo.style.display = "none";
      controlBarTwoVisible = false;
    } else {
      skills.slice(0, 3).forEach((skill, index) => {
        buttonTexts[3 + index].innerText = skill.name;
        buttons[3 + index].onclick = () => useSkill(skill.name);
        buttonIcons[3 + index].src = skill.icon;
        buttons[3 + index].style.display = "flex"; // Show the button
      });
      controlBarTwo.style.display = "flex";
      controlBarTwoVisible = true;
    }
  }
}

//Reset all Temporary Battle Effects
function resetTempEffects() {
  // Reset All Temp Stats from Battle
  tempAtk = 0;
  tempDef = 0;
 
  // Reset once per battle items used state back to false
  inventory.items.forEach(item => {
    if (item.name === "Berserker Draught" || item.name === "Ironskin Draught") {
      item.used = false;
    }
  });
}

/* BATTLE RESOLUTION */

// Handles winning the fight rewards and updating location
function defeatEnemy(enemyIndex) {
  fadeInOverlay(500);
  setTimeout(() => {
    playerInBattle = false;
    audioManager.transitionBGM('main');
    hideControlPanel2();
    resetTempEffects();
    const goldIncrease = Math.floor(enemies[fighting].level * 6.7);
    const xpIncrease = enemies[fighting].level;
    gold += goldIncrease;
    gainXp(xpIncrease);
    updateHealthGoldXp();

    

    const locationIndex = 9;
    const location = locations[locationIndex];

    // Update location's name to include the defeated enemy's name
    location.name = `${enemies[fighting].name} Defeated`;
    // Map the current enemy to the correct fight function
    const fightFunctions = [
      fightSlime,
      fightBurrower,
      fightCorpse,
      fightGhoul,
      fightCrawler,
      fightReaver
    ];

    // Update the first button function to the correct fight function
    location["button functions"][0] = fightFunctions[fighting];

    currentLocationIndex = locationIndex;
    update(location);
    text.innerText += `\nThe ${enemies[fighting].name} screams "Arg!" as it dies. \nYou gain ${xpIncrease} xp and find ${goldIncrease} gold.`;

    const defeatedEnemy = enemies[enemyIndex];
    acceptedBounties.forEach(bounty => {
      if (bounty.enemyName === defeatedEnemy.name && bounty.status === "Accepted") {
        bounty.currentNum += 1;
        if (bounty.currentNum >= bounty.targetNum) {
          bounty.status = "Completed";
          gold += bounty.rewardGold;
          gainXp(bounty.rewardXp);
          updateHealthGoldXp();
          text.innerText += `\nYou have completed the bounty: ${bounty.objective}! You've earned ${bounty.rewardGold} gold and ${bounty.rewardXp} XP.`;
        }
      }
    });
    updateJournalUI();
    fadeOutOverlay(500);
  }, 500);
}
// Lost the Game
function lose() {
  if (inLoseState) return;
  fadeInOverlay(500);
  setTimeout(() => {
    inLoseState = true;
    playerInBattle = false;
    audioManager.transitionBGM('main');
    hideControlPanel2();
    resetTempEffects();
    currentLocationIndex = 10;
    update(locations[10]);
    inLoseState = false;
    fadeOutOverlay(500);
  }, 500);
}

function winGame() {
  fadeInOverlay(500);
  setTimeout(() => {
    playerInBattle = false;
    audioManager.transitionBGM('main');
    hideControlPanel2();
    resetTempEffects();
    currentLocationIndex = 11;
    update(locations[11]);
    fadeOutOverlay(500);
  }, 500);
}

// Resets game back to default state
function restart() {
  fadeInOverlay(500);
  gameStarted = false;
  level = 1;
  xp = 0;
  xpRequired = 10;
  if (characterClass === "Voidstalker") {
    baseHealth = 120;
    baseStamina = 3;
    baseAtk = 10;
    baseDef = 10;
  } else if (characterClass === "Shadowblade") {
    baseHealth = 80;
    baseStamina = 3;
    baseAtk = 15;
    baseDef = 5;
  } else if (characterClass === "Iron Warden") {
    baseHealth = 100;
    baseStamina = 3;
    baseAtk = 5;
    baseDef = 15;
  } else {
    baseHealth = 100;
    baseStamina = 3;
    baseAtk = 5;
    baseDef = 5;
  }
  health = baseHealth;
  stamina = baseStamina;
  gold = 50;
  currentWeapon = 0;
  currentArmor = 0;
  acceptedBounties = [];
  inventory = {
    weapons: [{ name: "Wooden Club", power: 10, durability: Infinity }],
    armor: [{ name: "Cloth Tunic", defense: 5, durability: Infinity }],
    items: []
  };
  playerSkills = [];
  updateHealthGoldXp();
  baseHealthText.forEach(element => {
    element.textContent = baseHealth;
  });
  closeGameMenu();
  fadeOutOverlay(500);
  setTimeout(() => {
    goTown();
  }, 500);
  setTimeout(() => {
    gameStarted = true;
  }, 1000);
}

/* GAMBLING EVENT */

// Hidden feature that starts gambling game
function easterEgg() {
  fadeInOverlay(300);
  setTimeout(() => {
    currentLocationIndex = 12;
    update(locations[12]);
    fadeOutOverlay(300);
  }, 300);
}
// Player chooses Small
function pickSmall() {
  pick("small");
}
// Player chooses Big
function pickBig() {
  pick("big");
}
// Generates numbers and if the player's choice was in the numbers you win
function pick(bet) {
  // Generate 3 dice rolls (1-6)
  const dice = [];
  for (let i = 0; i < 3; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }

  // Calculate sum of the rolls
  const sum = dice.reduce((a, b) => a + b, 0);

  // Determine the result (Either small or big)
  const result = sum >= 4 && sum <= 10 ? "small" : "big";

  // Dice emotes
  const diceEmotes = dice
    .map((num) => {
      switch (num) {
        case 1:
          return '<span class="dice">⚀</span>';
        case 2:
          return '<span class="dice">⚁</span>';
        case 3:
          return '<span class="dice">⚂</span>';
        case 4:
          return '<span class="dice">⚃</span>';
        case 5:
          return '<span class="dice">⚄</span>';
        case 6:
          return '<span class="dice">⚅</span>';
      }
    })
    .join(" ");

  // Display the dice rolls and result
  text.innerHTML = `You bet on ${bet.toUpperCase()}. The dice rolls are:<br>${diceEmotes}<br>Total: ${sum} (${result.toUpperCase()})`;

  // Check if the player's bet was correct
  if (bet === result) {
    text.innerHTML += "<br>Right! You win 20 gold!";
    gold += 20;
  } else {
    text.innerHTML += "<br>Wrong! You lose 10 health!";
    health -= 10;
  }
  updateHealthGoldXp();
}
