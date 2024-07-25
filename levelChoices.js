
let levelChoices = [
    //0
    fewerEnemies = {
        name: "Low Hostile Activity",
        text: "Fewer enemies",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].enemyValue += 0.015
            })
            await changeState(stateObj);
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
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    highValue = {
        name: "Friendly Merchant",
        text:  "Shops are slightly cheaper",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.cheaperShops += 0.1
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    oilWell = {
        name: "Oil Well",
        text:  "Fuel is free on the next level",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.freeFuel = true;
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
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    goldVein = {
        name: "Gold Veins",
        text:  "Level has slightly more gold",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].barVals[4] -= 0.04
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    silverVein = {
        name: "Gold Veins",
        text:  "Level has slightly more silver",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.floorValues[newState.currentLevel].barVals[5] -= 0.08
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
                newState.floorValues[newState.currentLevel].barVals[3] -= 0.02
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
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    fightingFines = {
        name: "Fines for Fighting",
        text:  "Gain 50 gold for each enemy still alive after the end of the level ",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.isPacifist += 50;
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },

    teleporter = {
        name: "Local Teleporter",
        text:  "Level contains a teleporter that returns you to store",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.levelTeleport = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    teleporter = {
        name: "Dense Soil",
        text:  "All empty space in the level is replaced with bronze ore",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.noEmptySquares = true;
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "uncommon",
    },

    bounty = {
        name: "Bounty System",
        text:  "Gain 100 gold for each enemy killed",
        levelFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesForMoney += 100;
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
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "common",
    },


]

async function longerLevelChoice(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.choosingNextLevel = false;
        newState.floorValues[newState.currentLevel].relicNumber += 1
        newState.floorValues[newState.currentLevel].numberRows *= 2
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

let fewerEnemiesDiv = document.createElement("Div")
  fewerEnemiesDiv.classList.add("next-level-option")
  fewerEnemiesDiv.textContent = "SAFE PASSAGE - The next level has fewer enemies"
  fewerEnemiesDiv.classList.add("next-level-clickable")
  fewerEnemiesDiv.onclick = function () {
      fewerEnemiesChoice(stateObj)
  }

  let moreGoldDiv = document.createElement("Div")
  moreGoldDiv.classList.add("next-level-option")
  moreGoldDiv.textContent = "PROSPECTOR - The next level has more gold ore"
  moreGoldDiv.classList.add("next-level-clickable")
  moreGoldDiv.onclick = function () {
      moreGold(stateObj)
  }

  let cowardDiv = document.createElement("Div")
  cowardDiv.classList.add("next-level-option")
  cowardDiv.textContent = "COWARD - The enemies in the next level do not move, but the level only contains bronze, silver, and gold ore"
  cowardDiv.classList.add("next-level-clickable")
  cowardDiv.onclick = function () {
      cowardChoice(stateObj)
  }

  let dirtEfficiencyDiv = document.createElement("Div")
  dirtEfficiencyDiv.classList.add("next-level-option")
  dirtEfficiencyDiv.textContent = "MINER - PERMANENT upgrade to dirt processing efficiency, letting you drop dirt blocks more often"
  dirtEfficiencyDiv.classList.add("next-level-clickable")
  dirtEfficiencyDiv.onclick = function () {
      dirtEfficiencyChoice(stateObj)
  }

  let pacifistDiv = document.createElement("Div")
  pacifistDiv.classList.add("next-level-option")
  pacifistDiv.textContent = "PACIFIST - After completing this next level, gain $50 for every enemy that is still alive"
  pacifistDiv.classList.add("next-level-clickable")
  pacifistDiv.onclick = function () {
      pacifistChoice(stateObj)
  }

  let killEnemiesForMoneyDiv = document.createElement("Div")
  killEnemiesForMoneyDiv.classList.add("next-level-option")
  killEnemiesForMoneyDiv.textContent = "SCRAP METAL - Gain $100 for each enemy killed (next level only)"
  killEnemiesForMoneyDiv.classList.add("next-level-clickable")
  killEnemiesForMoneyDiv.onclick = function () {
      killEnemiesForMoneyChoice(stateObj)
  }

  let shorterDiv = document.createElement("Div")
  shorterDiv.classList.add("next-level-option")
  shorterDiv.textContent = "SPEEDY - The next level is smaller, and has fewer enemies"
  shorterDiv.classList.add("next-level-clickable")
  shorterDiv.onclick = function () {
      shorterLevelChoice(stateObj)
  }

  let longerDiv = document.createElement("Div")
  longerDiv.classList.add("next-level-option")
  longerDiv.textContent = "ODYSSEY - The next level is twice as long, but has two relics"
  longerDiv.classList.add("next-level-clickable")
  longerDiv.onclick = function () {
      longerLevelChoice(stateObj)
  }

  let moreEnemiesDiv = document.createElement("Div")
  moreEnemiesDiv.classList.add("next-level-option")
  moreEnemiesDiv.textContent = "HOSTILE - The next level has more enemies, but a higher chance of rare gems"
  moreEnemiesDiv.classList.add("next-level-clickable")
  moreEnemiesDiv.onclick = function () {
      moreEnemies(stateObj)
  }

  let cheaperShopsDiv = document.createElement("Div")
  cheaperShopsDiv.classList.add("next-level-option")
  cheaperShopsDiv.textContent = "BARGAINER - The next level's shop prices are slightly cheaper"
  cheaperShopsDiv.classList.add("next-level-clickable")
  cheaperShopsDiv.onclick = function () {
      cheaperShopsChoice(stateObj)
  }

  let freeFuelDiv = document.createElement("Div")
  freeFuelDiv.classList.add("next-level-option")
  freeFuelDiv.textContent = "OIL WELL - Fuel is free for the next level. The level is also shorter"
  freeFuelDiv.classList.add("next-level-clickable")
  freeFuelDiv.onclick = function () {
      freeFuelChoice(stateObj)
  }

  let splinterCellDiv = document.createElement("Div")
  splinterCellDiv.classList.add("next-level-option")
  splinterCellDiv.textContent = "COVERT OPS - Gems are worth double for the next level. Prices revert back to normal after killing an enemy"
  splinterCellDiv.classList.add("next-level-clickable")
  splinterCellDiv.onclick = function () {
      splinterCellChoice(stateObj)
  }

  let teleporterChoiceDiv = document.createElement("Div")
  teleporterChoiceDiv.classList.add("next-level-option")
  teleporterChoiceDiv.textContent = "TELEPORTER - Next level contains a teleporter that returns you to the store"
  teleporterChoiceDiv.classList.add("next-level-clickable")
  teleporterChoiceDiv.onclick = function () {
    teleporterChoice(stateObj)
  }

  let noEmptySquaresDiv = document.createElement("Div")
  noEmptySquaresDiv.classList.add("next-level-option")
  noEmptySquaresDiv.textContent = "EXTRA BRONZE - Next level has bronze ore instead of any empty squares"
  noEmptySquaresDiv.classList.add("next-level-clickable")
  noEmptySquaresDiv.onclick = function () {
    noEmptySquaresChoice(stateObj)
  }