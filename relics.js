//mined silver doubles?
//upgradedirt relic is too weak - lowering dirt threshold is too weak unless busted with ruby
//change the ruby dirt block combo to be less busted somehow??
//upgrade poisonblocks image
//pause relic should change to "frozen" bc removing from array breaks interactions with killEnemies

//relics that can be turned into things to buy:

//EVERY LEVEL:
//remove enemy shields -> bronze?
//build teleporter -> silver? (square under shop)
//build final relay -> gold? (at end of level)
//relic upgrade -> ruby (in shop?)



//Possible options (ruby??)
//pauseEnemies
//spareTank
//thornsRelic


let potentialRelics = [
    //0
    pauseEnemies = {
        name: "Enemy Disruptor",
        varName: "bronzeMaxFuelRelic",
        text: (stateObj) => {
            let tradeString = "Enemies on this level can't move"
            return tradeString
        },
        storeText: (stateObj) => {
            let tradeString = "Enemies on this level can't move"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyArray = []
                newState.enemyMovementArray = [];
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            return stateObj
        },
        rarity: "common",
        imgPath: "img/relics/stoprelic.png",
        levelRelic: true,
        shopRelic: false,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.enemyMovementArray.length > 0) {
                return true
            } else {
                return false
            }
        }
    },

    remoteBombsRelic = {
        name: "Remote Detonator",
        varName: "remoteBombsRelic",
        text: (stateObj) => {
            return "Trigger bombs remotely, not on impact  (press 'B' again)"
        },
        storeText: (stateObj) => {
            return "Trigger bombs remotely, not on impact (press 'B' again)"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.remoteBombs = true;
                newState.playerRelicArray.push(remoteBombsRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.remoteBombs = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/remotebomb.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.remoteBombs) {
                return false
            } else {
                return true
            }
        }
    },

    thornsRelic = {
        name: "Spikes",
        varName: "thornsRelic",
        text: (stateObj) => {
            return "Kill enemies who damage you"
        },
        storeText: (stateObj) => {
            return "Kill enemies who damage you"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.thorns = true;
                newState.playerRelicArray.push(thornsRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.thorns = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/thorns.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.thorns) {
                return false
            } else {
                return true
            }
        }
    },

    spareTank = {
        name: "Spare Fuel Tank",
        varName: "spareTankRelic",
        text: (stateObj) => {
            let val = stateObj.spareFuelTank
            let tradeString = "If you run out of fuel, fully refill your fuel " + val + " time"
            if (val > 1) { tradeString += "s"}
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.spareFuelTank
            let tradeString = "If you run out of fuel, fully refill your fuel " + (val+1) + " time"
            if (val > 1) { tradeString += "s"}
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.spareFuelTank += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Spare Fuel Tank');
                if (index === -1) {
                    newState.playerRelicArray.push(spareTank)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = await immer.produce(stateObj, (newState) => {
                newState.spareFuelTank = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/fueltank.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 20

    },

    goldMaxInventory = {
        name: "Augmented Cargo Bay",
        varName: "goldMaxInvRelic",
        text: (stateObj) => {
            let val = stateObj.goldMaxInventory
            let tradeString = "Mining gold increases Cargo Bay by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.goldMaxInventory
            let tradeString = "Mining gold increases Cargo Bay by " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.goldMaxInventory += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Augmented Cargo Bay');
                if (index === -1) {
                    newState.playerRelicArray.push(goldMaxInventory)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.goldMaxInventory = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        rarity: "rare",
        imgPath: "img/relics/goldmaxinventory.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 20
    },

    

    dirtMaxFuel = {
        name: "Dirt-Fuel Converter",
        varName: "dirtToMaxFuelRelic",
        text: (stateObj) => {
            let val = stateObj.dirtToMaxFuel
            let tradeString = "Dropping dirt increases Fuel Tank by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.dirtToMaxFuel
            let increase = Math.floor(15 * stateObj.overallFuelModifier)
            let tradeString = "Dropping dirt increases Fuel Tank by " + (val+increase)
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtToMaxFuel += 15;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Dirt-Fuel Converter');
                if (index === -1) {
                    newState.playerRelicArray.push(dirtMaxFuel)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }   
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtToMaxFuel = 0;  
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtmaxfuel.png",
        levelRelic: true,
        shopRelic: false,
        upgrades: 1,
        maxUpgrades: 20
    },

    enemiesDealLess = {
        name: "Armor Plating",
        varName: "halfDamageEnemiesRelic",
        text: (stateObj) => {
            let val = stateObj.enemyDamageModifier
            let tradeString = "Enemies deal " + Math.ceil((1-val)*100) + "% less damage"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.enemyDamageModifier
            let tradeString = "Enemies deal " + Math.ceil((1-val+0.25)*100) + "% less damage"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyDamageModifier -= 0.2;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Armor Plating');
                if (index === -1) {
                    newState.playerRelicArray.push(enemiesDealLess)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.enemyDamageModifier = 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/shield2.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 4
    },

    //5
    halfDamageFuel = {
        name: "Fuel-Powered Shield",
        varName: "halfDamageFullFuelRelic",
        text: (stateObj) => {
            let val = stateObj.halfDamageFullFuel
            let tradeString = "Take " +  Math.ceil((1-val)*100) + "% less damage if Fuel Tank above 50%"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.halfDamageFullFuel * .65
            let tradeString = "Take " +  Math.ceil((1-val)*100) + "% less damage if Fuel Tank above 50%"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.halfDamageFullFuel -= 0.3 ;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Fuel-Powered Shield');
                if (index === -1) {
                    newState.playerRelicArray.push(halfDamageFuel)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.halfDamageFullFuel = 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/gasshield.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 3
    },

    

    bronzeSilverBonusRelic = {
        name: "Basic Ore Refiner",
        varName: "bronzeSilverBonusRelic",
        text: (stateObj) => {
            let val = stateObj.bronzeSilverBonus
            let tradeString = "Bronze and silver ore are worth " + val + " times as much"
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bronzeSilverBonus
            let tradeString = "Bronze and silver ore are worth " + (val+1) + " times as much"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverBonus += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Basic Ore Refiner');
                if (index === -1) {
                    newState.playerRelicArray.push(bronzeSilverBonusRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverBonus = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzesilverbonus.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 20
    },

    craftMoreAmmo = {
        name: "Ammo Efficiency",
        varName: "weaponsPriceRelic",
        text: (stateObj) => {
            let tradeString = "Can craft " + (1+stateObj.ammoBonus) + " ammo from 1 silver ore"
            return tradeString
        },
        storeText: (stateObj) => {
            let tradeString = "Can craft " + (1+stateObj.ammoBonus + 1) + " ammo from 1 silver ore"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.ammoBonus += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Ammo Efficiency');
                if (index === -1) {
                    newState.playerRelicArray.push(craftMoreAmmo)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.ammoBonus += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Ammo Efficiency');
                if (index === -1) {
                    newState.playerRelicArray.push(craftMoreAmmo)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.ammoBonus = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        levelRelic: true,
        shopRelic: false,
        upgrades: 1,
        maxUpgrades: 5,
        imgPath: "img/relics/gun1.png",
    },

    //10
    killEnemiesHullRelic = {
        name: "Scrap to Armor",
        varName: "killEnemiesHullRelic",
        text: (stateObj) => {
            let val = Math.ceil(stateObj.killEnemiesHullModifier * stateObj.overallHullModifier)
            let tradeString = "Killing Enemies increases Hull Armor by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = Math.ceil(stateObj.killEnemiesHullModifier * stateObj.overallHullModifier)
            let tradeString = "Killing Enemies increases Hull Armor by " + (val + Math.ceil(5*stateObj.overallHullModifier))
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesHullModifier += 5;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Scrap to Armor');
                if (index === -1) {
                    newState.playerRelicArray.push(killEnemiesHullRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesHullModifier = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/killhull.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 20
        
    },

    killEnemiesHealRelic = {
        name: "Metal Recycling",
        varName: "killEnemiesHealRelic",
        text: (stateObj) => {
            let val = stateObj.killEnemiesForHealing
            let tradeString = "Killing enemies repairs Hull Armor by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.killEnemiesForHealing
            let tradeString = "Killing enemies repairs Hull Armor by " + (val + 10) 
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesForHealing += 10;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Metal Recycling');
                if (index === -1) {
                    newState.playerRelicArray.push(killEnemiesHealRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.killEnemiesForHealing = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/repairkill.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 20
    },

    silverHealingRelic = {
        name: "Silver Wrench",
        varName: "silverHealingRelic",
        text: (stateObj) => {
            let val = stateObj.silverHealing
            let tradeString = "Mining silver ore repairs Hull Armor by " + val + (" (if damaged")
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.silverHealing
            let tradeString = "Mining silver ore repairs Hull Armor by " + (val+5) + (" (if damaged)")
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverHealing += 5;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Silver Wrench');
                if (index === -1) {
                    newState.playerRelicArray.push(silverHealingRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverHealing = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/silverhealing.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 20
    },

    bronzeMaxHullRelic = {
        name: "Bronze Armor",
        varName: "bronzeMaxHullRelic",
        text: (stateObj) => {
            let val = stateObj.bronzeMaxHull
            let tradeString = "Mining bronze ore increases hull armor by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bronzeMaxHull
            let tradeString = "Mining bronze ore increases hull armor by " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeMaxHull += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Bronze Armor');
                if (index === -1) {
                    newState.playerRelicArray.push(bronzeMaxHullRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeMaxHull = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzemaxhull.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 4
    },

    dirtRubyRelic = {
        name: "Ruby Producer",
        varName: "dirtRubyRelic",
        text: (stateObj) => {
            return "Dropped dirt blocks contain a ruby"
        },
        storeText: (stateObj) => {
            return "Dropped dirt blocks contain a ruby"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRuby = true;
                newState.playerRelicArray.push(dirtRubyRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRuby = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtruby.png",
        levelRelic: true,
        shopRelic: false,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.dirtRuby) {
                return false
            } else {
                return true
            }
        }
    },

    //15
    bombDistanceRelic = {
        name: "Stronger Bombs",
        varName: "bombDistanceRelic",
        text: (stateObj) => {
            let val = stateObj.bombDistance
            let tradeString = "Bomb distance radius increased to " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bombDistance
            let tradeString = "Bomb distance radius increased to " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombDistance += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Stronger Bombs');
                if (index === -1) {
                    newState.playerRelicArray.push(bombDistanceRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombDistance = 2;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bombupgrader.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 3
    },

    laserPiercingRelic = {
        name: "Piercing Laser",
        varName: "laserPiercingRelic",
        text: (stateObj) => {
            return "Laser pierces through entire row"
        },
        storeText: (stateObj) => {
            return "Laser pierces through entire row"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserPiercing = true;
                newState.playerRelicArray.push(laserPiercingRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserPiercing = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/laserpiercing.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.laserPiercing) {
                return false
            } else {
                return true
            }
        }
        
    },

    bombRefillRelic = {
        name: "Bomb Seizer",
        varName: "bombRefillRelic",
        text: (stateObj) => {
            let val = stateObj.bombRefill
            let tradeString = "Killing an enemy with a bomb refills " + val + " ammo"
            if (val>1) { tradeString += "s"}
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.bombRefill
            let tradeString = "Killing an enemy with a bomb refills " + (val+1) + " ammo"
            if (val>0) { tradeString += "s"}
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombRefill += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Bomb Seizer');
                if (index === -1) {
                    newState.playerRelicArray.push(bombRefillRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bombRefill = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bombrefill.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 3
    },

    fuelToBlocksRelic = {
        name: "Dirt Machine",
        varName: "fuelToBlocksRelic",
        text: (stateObj) => {
            let fuelNeeded = Math.floor(((stateObj.dirtThresholdNeeded - stateObj.dirtReserves))/stateObj.fuelToBlocks)
            let tradeString = "Can spend " + fuelNeeded + " fuel to drop dirt"
            return tradeString
        },
        storeText: (stateObj) => {
            let fuelNeeded = Math.floor(stateObj.dirtThresholdNeeded/(stateObj.fuelToBlocks+2))
            let tradeString = "Can spend " + fuelNeeded + " fuel to drop dirt"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelToBlocks += 2;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Dirt Machine');
                if (index === -1) {
                    newState.playerRelicArray.push(fuelToBlocksRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelToBlocks = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/fueltoblocks.png",
        levelRelic: true,
        shopRelic: false,
        upgrades: 1,
        maxUpgrades: 3
    },

    upgradeDirtBlockRelic = {
        name: "Mining Efficiency",
        varName: "upgradeDirtBlockRelic",
        text: (stateObj) => {
            return "Can drop dirt much faster"
        },
        storeText: (stateObj) => {
            return "Can drop dirt much faster"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                if (newState.dirtThresholdNeeded > 15) {
                    newState.dirtThresholdNeeded -= 15;
                } else {
                    newState.dirtThresholdNeeded = 5;
                }
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Mining Efficiency');
                if (index === -1) {
                    newState.playerRelicArray.push(upgradeDirtBlockRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtThresholdNeeded = 50
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/drillupgrade.png",
        levelRelic: true,
        shopRelic: false,
        upgrades: 1,
        maxUpgrades: 3
    },

    //20
    fuelTeleporter = {
        name: "Fuel-powered Teleporter",
        varName: "fuelTeleporter",
        text: (stateObj) => {
            let val = stateObj.fuelTeleportCost
            let tradeString = "Press T to teleport back to the shop (Costs " + val + " fuel)"
            return tradeString
        },
        storeText: (stateObj) => {
            let val=40;
            if (stateObj.fuelTeleportCost >= 25) {
                val = (stateObj.fuelTeleportCost - 15);
            } else if (stateObj.fuelTeleportCost > 0) {
                val = 0;
            }
            let tradeString = "Press T to teleport back to the shop (Costs " + val + " fuel)"
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Fuel-powered Teleporter');
                if (index === -1) {
                    newState.playerRelicArray.push(fuelTeleporter)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
                if (newState.fuelTeleportCost === 0) {
                    newState.fuelTeleportCost = 40;
                } else if (newState.fuelTeleportCost >= 25) {
                    newState.fuelTeleportCost -= 15;
                } else {
                    newState.fuelTeleportCost = 0;
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fuelTeleportCost = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/teleporter.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 3
    },

    dirtCompactor = {
        name: "Dirt Compactor",
        varName: "dirtCompactor",
        text: (stateObj) => {
            return "Can collect infinite dirt"
        },
        storeText: (stateObj) => {
            return "Can collect infinite dirt"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.noDirtThreshold = true;
                newState.playerRelicArray.push(dirtCompactor)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.noDirtThreshold = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/infinitedirt.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.noDirtThreshold) {
                return false
            } else {
                return true
            }
        }
    },

    poisonBlocks = {
        name: "Weaponized Dirt",
        varName: "poisonBlocks",
        text: (stateObj) => {
            return "Enemies die if they collide with a dropped dirt block"
        },
        storeText: (stateObj) => {
            return "Enemies die if they collide with a dropped dirt block"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.poisonBlocks = true;
                newState.playerRelicArray.push(poisonBlocks)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.poisonBlocks =  false
            })
            await changeState(stateObj);
            return stateObj
        },
        
        imgPath: "img/relics/poisondirt.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.poisonBlocks ) {
                return false
            } else {
                return true
            }
        }
    },


    silverMaxFuel = {
        name: "Silver Tank",
        varName: "silverMaxFuelRelic",
        text: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining silver ore increases max fuel by " + val
            return tradeString
        },
        storeText: (stateObj) => {
            let val = stateObj.silverMaxFuel
            let tradeString = "Mining silver ore increases max fuel by " + (val+1)
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverMaxFuel += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Silver Tank');
                if (index === -1) {
                    newState.playerRelicArray.push(silverMaxFuel)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.silverMaxFuel = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/silvermaxfuel.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 3
    },

    bronzeSilverConverter = {
        name: "Bronze Refiner",
        varName: "bronzeSilverRelic",
        text: (stateObj) => {
            return "Mined bronze ore gets converted to silver"
        },
        storeText: (stateObj) => {
            return "Mined bronze ore gets converted to silver"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverConverter += 1;
                newState.playerRelicArray.push(bronzeSilverConverter)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.bronzeSilverConverter = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/bronzesilverconverter.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.bronzeSilverConverter) {
                return false
            } else {
                return true
            }
        }
    },

    //25
    dirtRefiller = {
        name: "Dirt Weapons",
        varName: "dirtRefillsWeapons",
        text: (stateObj) => {
            val = stateObj.dirtRefillsWeapons
            return "Dropping dirt gives you +" + val + " ammo"
        },
        storeText: (stateObj) => {
            val = stateObj.dirtRefillsWeapons
            return "Dropping dirt gives you +" + (val + 3) + " ammo"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRefillsWeapons += 3;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Dirt Weapons');
                if (index === -1) {
                    newState.playerRelicArray.push(dirtRefiller)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
                
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.dirtRefillsWeapons = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/dirtrefillsweapons.png",
        levelRelic: true,
        shopRelic: false,
        upgrades: 1,
        maxUpgrades: 2
    },

    laserRecaptureRelic = {
        name: "Laser Recapture",
        varName: "laserRecapture",
        text: (stateObj) => {
            let val = stateObj.laserGemRefill
            let tradeString = "Mining a gem with a laser refills " + val + " ammo"
            let tradeString2 = (val > 1) ? "s" :  ""
            return tradeString + tradeString2
        },
        storeText: (stateObj) => {
            let val = stateObj.laserGemRefill
            let tradeString = "Mining a gem with a laser refills " + (val+1) + " ammo"
            let tradeString2 = (val > 0) ? "s" :  ""
            return tradeString + tradeString2
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserGemRefill += 1;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Laser Recapture');
                if (index === -1) {
                    newState.playerRelicArray.push(laserRecaptureRelic)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.laserGemRefill = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/laserrecapture.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 3
    },

    efficientConverter = {
        name: "Efficient Gold Converter",
        varName: "goldConverter",
        text: (stateObj) => {
            return "Can create a ruby from 2 gold ores"
        },
        storeText: (stateObj) => {
            return "Can create a ruby from 2 gold ores"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.efficientGoldConverter = true;
                newState.playerRelicArray.push(efficientConverter)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.efficientGoldConverter = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/efficientgold.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.efficientGoldConverter) {
                return false
            } else {
                return true
            }
        }
    },

    rubyLocator = {
        name: "Ruby Locator",
        varName: "rubyLocator",
        text: (stateObj) => {
            return "Rubies are more common on every level"
        },
        storeText: (stateObj) => {
            return "Rubies are more common on every level"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.rubyIncrease += 0.02;
                newState.playerRelicArray.push(rubyLocator)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.rubyIncrease = 0;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/rubyincrease.png",
        levelRelic: true,
        shopRelic: false,
        upgrades: 1,
        maxUpgrades: 2
    },

    //30
    fuelMult = {
        name: "Fuel Multiplier",
        varName: "rubyLocator",
        text: (stateObj) => {
            let val = (stateObj.overallFuelModifier - 1)*100;
            let tradeString = "All fuel upgrades are " + Math.floor(val) + "% more powerful "
            return tradeString
        },
        storeText: (stateObj) => {
            let val = (stateObj.overallFuelModifier - 1 + 0.5)*100;
            let tradeString = "All fuel upgrades are " + Math.floor(val) + "% more powerful "
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallFuelModifier += 0.5;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Fuel Multiplier');
                if (index === -1) {
                    newState.playerRelicArray.push(fuelMult)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallFuelModifier = 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/overallfuelmod.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 4
    },

    hullMult = {
        name: "Hull Multiplier",
        varName: "rubyLocator",
        text: (stateObj) => {
            let val = (stateObj.overallHullModifier-1)*100;
            let tradeString = "All hull upgrades are " + Math.floor(val) + "% more powerful "
            return tradeString
        },
        storeText: (stateObj) => {
            let val = (stateObj.overallHullModifier + 0.5 - 1)*100;
            let tradeString = "All hull upgrades are " + Math.floor(val) + "% more powerful "
            return tradeString
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallHullModifier += 0.5;
                let index = newState.playerRelicArray.map(function(e) { return e.name; }).indexOf('Hull Multiplier');
                if (index === -1) {
                    newState.playerRelicArray.push(hullMult)
                } else {
                    newState.playerRelicArray[index].upgrades +=1
                }
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.overallHullModifier = 1;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/overallhullmod.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: 1,
        maxUpgrades: 4
    },

    fishEyeRelic = {
        name: "Fish Eye Lens",
        varName: "fisheyerelic",
        text: (stateObj) => {
            return "Wider view (can see more blocks onscreen at once)"
        },
        storeText: (stateObj) => {
            return "Wider view (can see more blocks onscreen at once)"
        },
        relicFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fishEyeLens = true;
                newState.playerRelicArray.push(fishEyeRelic)
            })
            await changeState(stateObj);
            return stateObj
        },
        resetFunc: async (stateObj) => {
            stateObj = immer.produce(stateObj, (newState) => {
                newState.fishEyeLens = false;
            })
            await changeState(stateObj);
            return stateObj
        },
        imgPath: "img/relics/fisheye.png",
        levelRelic: true,
        shopRelic: true,
        upgrades: false,
        isAvailable: async (stateObj) => {
            if (stateObj.fishEyeLens) {
                return false
            } else {
                return true
            }
        }
    },
]


function buildRelicArray(stateObj) {
    let tempArray = []
    for (let i=0; i < potentialRelics.length; i++) {
        let relic = potentialRelics[i] 
        if (relic.upgrades) {
            tempArray.push(relic)
        } else {
            if (relic.isAvailable(stateObj)) {
                tempArray.push(relic)
            } else {
                console.log(relic.name + " is not available to be in the level's relic array")
            }
        }
    }
    //tempArray = [ killEnemiesHealRelic, killEnemiesHealRelic, killEnemiesHealRelic, killEnemiesHealRelic, killEnemiesHealRelic, killEnemiesHealRelic, killEnemiesHealRelic]
    return tempArray
}
