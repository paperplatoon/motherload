
let levelChoices = [
    //0
    fewerEnemies = {
        name: "Low Hostile Activity",
        text: "Fewer enemies",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].enemyValue += 0.015
                newState.choosingNextLevel = false
            })
            changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    highValue = {
        name: "High Value Planet",
        text:  "More rare gems, but more enemies too",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].enemyValue -= 0.02
                newState.floorValues[newState.currentLevel].barVals[0] -= 0.0005
                newState.floorValues[newState.currentLevel].barVals[1] -= 0.005
                newState.floorValues[newState.currentLevel].barVals[2] -= 0.01
                newState.floorValues[newState.currentLevel].barVals[3] -= 0.015
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    friendlyMerchant = {
        name: "Friendly Merchant",
        text:  "Shops are slightly cheaper",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.cheaperShops += 0.1
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    oilWell = {
        name: "Oil Well",
        text:  "Fuel is twice as effective for the next level",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.freeFuel = true;
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    splinterCell = {
        name: "Disapproving Merchant",
        text:  "Gems & ore worth 2x as much. Ends when you kill an enemy",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.splinterCellModifier += 1;
                newState.splinterCellOn = true;
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    //5
    goldVein = {
        name: "Gold Veins",
        text:  "Level has slightly more gold",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].barVals[4] -= 0.04
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    silverVein = {
        name: "Silver Veins",
        text:  "Level has slightly more silver",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].barVals[5] -= 0.08
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    rubyVein = {
        name: "Ruby Veins",
        text:  "Level has slightly more rubies",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].barVals[3] -= 0.01
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    coward = {
        name: "Chrono Anomoly",
        text:  "Enemies don't move. Level only has gold, silver and bronze",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].barVals[0] = 1
                newState.floorValues[newState.currentLevel].barVals[1] = 1
                newState.floorValues[newState.currentLevel].barVals[2] = 1
                newState.floorValues[newState.currentLevel].barVals[3] = 1
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    fightingFines = {
        name: "Fines for Fighting",
        text:  "Gain 1 gold for each enemy still alive after the end of the level ",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.isPacifist += 1;
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    //10
    teleporter = {
        name: "Local Teleporter",
        text:  "Level contains a teleporter that returns you to store",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.levelTeleport = true;
                newState.choosingNextLevel = false
            })
             changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    denseSoil = {
        name: "Dense Soil",
        text:  "All empty space in the level is replaced with bronze ore",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.noEmptySquares = true;
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    bounty = {
        name: "Bounty System",
        text:  "Gain 1 gold for each enemy killed",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesForMoney += 1;
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    shorterLevel = {
        name: "Smaller Field",
        text:  "Next level is shorter",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].numberRows -= 10
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    twoRelics = {
        name: "Burial Ground",
        text:  "Next level has two relics, but more enemies",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].relicNumber += 1
                newState.floorValues[newState.currentLevel].enemyValue -= 0.02
                newState.choosingNextLevel = false
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    //15
]

async function longerLevelChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.floorValues[newState.currentLevel].relicNumber += 1
        newState.floorValues[newState.currentLevel].enemyValue *= 2
    })
    await changeState(stateObj);
}

async function dirtEfficiencyChoice(stateObj) {
    if (stateObj.dirtThresholdNeeded > 10) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.dirtThresholdNeeded -= 10;
            newState.choosingNextLevel = false;
        })
    }
    await changeState(stateObj);
}


  let dirtEfficiencyDiv = document.createElement("Div")
  dirtEfficiencyDiv.classList.add("next-level-option")
  dirtEfficiencyDiv.textContent = "MINER - PERMANENT upgrade to dirt processing efficiency, letting you drop dirt blocks more often"
  dirtEfficiencyDiv.classList.add("next-level-clickable")
  dirtEfficiencyDiv.onclick = function () {
      dirtEfficiencyChoice(stateObj)
  }