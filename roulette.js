let commonRouletteChoices = [
    cargobayzero = {
        name: "Cargo Bay +",
        rarity: "common",
        text:  (stateObj) => {
            return "Increase Cargo Bay by 1"
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.inventoryMax += value;
                newState.choosingRoulette = false;
            })
            changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

    miniFuelCan = {
        name: "mini fuel can",
        rarity: "common",
        text:  (stateObj) => {
            return "Refill fuel by 30" 
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                let amountToRegain = 30;
                let missingFuel = newState.fuelTankMax - newState.currentFuel
                if ( amountToRegain < missingFuel) {
                    newState.currentFuel += amountToRegain
                } else {
                    newState.currentFuel = newState.fuelTankMax 
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

    weaponFill = {
        name: "Ammo Drop",
        rarity: "common",
        text:  (stateObj) => {
            return "Gain 1 ammo"
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.ammo += 1
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "weapon"
    },

    dirtClod = {
        name: "Concentrated Mud",
        rarity: "common",
        text:  (stateObj) => {
            return "Fill your dirt reserves"
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (!stateObj.noDirtThreshold) {
                    newState.dirtReserves = newState.dirtThresholdNeeded
                } else {
                    newState.dirtReserves += newState.dirtThresholdNeeded;
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "dirt"
    },

]

let uncommonRouletteChoices = [
    tankone = {
        name: "Fuel Tank +",
        rarity: "uncommon",
        text:  (stateObj) => {
            return "bronze Fuel Tank part "
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeFuelRoulette(stateObj, value)
            return stateObj
        },
        type: "tank"
    },

    hullone = {
        name: "Hull Armor +",
        rarity: "uncommon",
        text:  (stateObj) => {
            return "bronze Hull Armor part "
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeHullRoulette(stateObj, value)
            return stateObj
        },
        type: "hull"
    },

    cargobayone = {
        name: "Cargo Bay ++",
        rarity: "uncommon",
        text:  (stateObj) => {
            return "Increase Cargo Bay By 2"
        },
        value: 2,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.inventoryMax += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

    dirtefficiencyone = {
        name: "Dirt Efficiency +",
        rarity: "uncommon",
        text:  (stateObj) => {
            return "Decrease dirt threshold by 10%"
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (stateObj.dirtThresholdNeeded > 0) {
                    newState.dirtThresholdNeeded -= 5
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "dirtEfficiency"
    },

    gemthree = {
        name: "Valuable Ore +",
        rarity: "uncommon",
        text:  (stateObj) => {
            return "Get one gold"
        },
        value: 80,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (stateObj.currentInventory < stateObj.inventoryMax) {
                    newState.currentInventory += 1
                    newState.goldInventory +=1
                }
                newState.choosingRoulette = false;
            })
            changeState(stateObj);
            return stateObj
        },
        type: "gem"
    },

    fuelCan = {
        name: "fuel can",
        rarity: "uncommon",
        text:  (stateObj) => {
            return "Refill fuel by 100" 
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                let amountToRegain = 100;
                let missingFuel = newState.fuelTankMax - newState.currentFuel
                if ( amountToRegain < missingFuel) {
                    newState.currentFuel += amountToRegain
                } else {
                    newState.currentFuel = newState.fuelTankMax 
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },

]

let rareRouletteChoices = [
    tanktwo = {
        name: "Fuel Tank ++",
        rarity: "rare",
        text:  (stateObj) => {
            return "silver Fuel Tank part"
        },
        value: 2,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeFuelRoulette(stateObj, value)
            return stateObj
        },
        type: "tank"
    },

    hulltwo = {
        name: "Hull Armor ++",
        rarity: "rare",
        text:  (stateObj) => {
            return "silver Hull Armor part"        },
        value: 2,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeHullRoulette(stateObj, value)
            return stateObj
        },
        type: "hull"
    },

    weaponFillRare = {
        name: "Ammo Crate",
        rarity: "rare",
        text:  (stateObj) => {
            return "Gain 5 ammo"
        },
        value: 5,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.ammo += 5
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "weapon"
    },

    cargobaytwo = {
        name: "Cargo Bay +++",
        rarity: "rare",
        text:  (stateObj) => {
            return "Increase Cargo Bay by 3"
        },
        value: 3,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.inventoryMax += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
    },
    dirtefficiencyone = {
        name: "Dirt Efficiency ++",
        rarity: "rare",
        text:  (stateObj) => {
            return "Decrease dirt threshold by 30%"
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (stateObj.dirtThresholdNeeded > 20) {
                    newState.dirtThresholdNeeded -= 20
                } else {
                    newState.dirtThresholdNeeded = 0
                }
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "dirtEfficiency"
    },

]

let legendaryRouletteChoices = [
    tankthree = {
        name: "Fuel Tank +++",
        rarity: "legendary",
        text:  (stateObj) => {
            return "gold Fuel Tank part"
        },
        value: 3,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeFuelRoulette(stateObj, value)
            return stateObj
        },
        type: "tank"
    },

    hullthree = {
        name: "Hull Armor +++",
        rarity: "legendary",
        text:  (stateObj) => {
            return "gold Hull Armor part"
        },
        value: 3,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeHullRoulette(stateObj, value)
            return stateObj
        },
        type: "hull"
    },

    gemfour = {
        name: "Valuable Ore ++",
        rarity: "legendary",
        text:  (stateObj) => {
            return "Get 1 ruby"
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (stateObj.currentInventory < stateObj.inventoryMax) {
                    newState.currentInventory += 1
                    newState.rubyInventory +=1
                }
                newState.choosingRoulette = false;
            })
            changeState(stateObj);
            return stateObj
        },
        type: "gem"
    },
]