let commonRouletteChoices = [
    tankone = {
        name: "Fuel Tank +",
        rarity: "common",
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
        rarity: "common",
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
            await changeState(stateObj);
            return stateObj
        },
        type: "cargobay"
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
    weaponFill = {
        name: "Ammo Drop",
        rarity: "uncommon",
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

    tanktwo = {
        name: "Fuel Tank ++",
        rarity: "uncommon",
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
        rarity: "uncommon",
        text:  (stateObj) => {
            return "silver Hull Armor part"        },
        value: 2,
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
        rarity: "common",
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

]

let rareRouletteChoices = [
    weaponFillRare = {
        name: "Ammo Crate",
        rarity: "rare",
        text:  (stateObj) => {
            return "Gain 3 ammo"
        },
        value: 1,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.ammo += 3
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "weapon"
    },
    gemthree = {
        name: "Valuable Ore +",
        rarity: "rare",
        text:  (stateObj) => {
            return "Get $80"
        },
        value: 80,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bankedCash += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "gem"
    },

    tankthree = {
        name: "Fuel Tank +++",
        rarity: "rare",
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
        rarity: "rare",
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
    weaponFillLegendary = {
        name: "Ammo Depot",
        rarity: "legendary",
        text:  (stateObj) => {
            return "Gain 5 ammo"
        },
        value: 1,
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
    tankthree = {
        name: "Fuel Tank ++++",
        rarity: "legendary",
        text:  (stateObj) => {
            return "ruby Fuel Tank part "
        },
        value: 4,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeFuelRoulette(stateObj, value)
            return stateObj
        },
        type: "tank"
    },

    hullfour = {
        name: "Hull Armor ++++",
        rarity: "legendary",
        text:  (stateObj) => {
            return "ruby Hull Armor part"
        },
        value: 4,
        rouletteFunc: async (stateObj, value) => {
            stateObj = upgradeHullRoulette(stateObj, value)
            return stateObj
        },
        type: "hull"
    },
    cargobaythree = {
        name: "Cargo Bay ++++",
        rarity: "legendary",
        text:  (stateObj) => {
            return "Increase Cargo Bay by 4"
        },
        value: 4,
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

    gemfour = {
        name: "Valuable Ore ++",
        rarity: "legendary",
        text:  (stateObj) => {
            return "Get $200"
        },
        value: 200,
        rouletteFunc: async (stateObj, value) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bankedCash += value;
                newState.choosingRoulette = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        type: "gem"
    },
]