
function createScoreDiv(stateObj) {
    let scoreLevelDiv = document.createElement("Div")
    scoreLevelDiv.classList.add("score-level-div")
    scoreLevelDiv.classList.add("centered")

    let scoreDiv = document.createElement("Div")
    scoreDiv.classList.add("score-div")
    scoreDiv.textContent = stateObj.score;
    scoreDiv.classList.add("centered")

    let levelDiv = document.createElement("Div")
    levelDiv.classList.add("level-div")
    levelDiv.textContent = "Level " + (stateObj.currentLevel+1);
    levelDiv.classList.add("centered")

    scoreLevelDiv.append(levelDiv, scoreDiv)
    return scoreLevelDiv
}

function createFuelDiv(stateObj) {
    let fuelDiv = document.createElement("Div")
    fuelDiv.setAttribute("id", "fuel-div");

    fuelText1Div = document.createElement("Div")
    fuelText1Div.classList.add("bars-text-div")
    fuelText1Div.setAttribute("id", "fuel-opening-text");
    fuelText1Div.textContent = "Fuel - "

    fuelText2Div = document.createElement("Div")
    fuelText2Div.classList.add("bars-text-div")
    fuelText2Div.setAttribute("id", "max-fuel-text");
    if (stateObj.fuelTankMax > 150) {
        fuelText2Div.classList.add("upgraded-stat")
    }
    fuelText2Div.textContent = Math.floor(stateObj.currentFuel) + "/" + Math.floor(stateObj.fuelTankMax)

    let emptyFuelBarDiv = document.createElement("Div");
    emptyFuelBarDiv.classList.add("empty-fuel-bar");
    emptyFuelBarDiv.setAttribute("id", "empty-fuel-bar");
    let currentFuelBarDiv = document.createElement("Div");
    currentFuelBarDiv.classList.add("current-fuel-bar");
    currentFuelBarDiv.setAttribute("id", "current-fuel-bar");
    if (stateObj.currentFuel >= stateObj.fuelTankMax/3) {
        currentFuelBarDiv.classList.add("full-fuel-bar");
    } else {
        fuelText1Div.classList.add("inventory-full");
        currentFuelBarDiv.classList.add("low-fuel-bar");
        if (stateObj.inStore === true || stateObj.sellingItems === true) {
            fuelText1Div.classList.add("flash")
            currentFuelBarDiv.classList.add("flash")
        }
    }
    let barLength = 10*(stateObj.currentFuel/stateObj.fuelTankMax)
    let barText = "width:" + barLength + "vw"
    currentFuelBarDiv.setAttribute("style", barText);
    emptyFuelBarDiv.append(currentFuelBarDiv);
    fuelDiv.append(fuelText1Div, emptyFuelBarDiv, fuelText2Div)
    
    return fuelDiv
}

function createHullDiv(stateObj) {
    let hullDiv = document.createElement("Div")
    hullDiv.setAttribute("id", "hull-div");
    hullText1Div = document.createElement("Div")
    hullText1Div.classList.add("bars-text-div")
    hullText1Div.textContent = "Hull - "

    hullText2Div = document.createElement("Div")
    hullText2Div.classList.add("bars-text-div")
    hullText2Div.setAttribute("id", "hull-integrity-text");
    if (stateObj.hullArmorMax > 100) {
        hullText2Div.classList.add("upgraded-stat")
    }
    hullText2Div.textContent = Math.floor(stateObj.currentHullArmor) + "/" + Math.floor(stateObj.hullArmorMax)

    let emptyHullBarDiv = document.createElement("Div");
    emptyHullBarDiv.classList.add("empty-hull-bar");
    emptyHullBarDiv.setAttribute("id", "empty-hull-bar");

    let currentHullBarDiv = document.createElement("Div");
    currentHullBarDiv.classList.add("current-hull-bar");
    currentHullBarDiv.setAttribute("id", "current-hull-bar");
    if (stateObj.currentHullArmor > stateObj.hullArmorMax/2) {
        currentHullBarDiv.classList.add("full-hull-bar");
    } else {
        currentHullBarDiv.classList.add("low-hull-bar");
        hullText1Div.classList.add("inventory-full")
        if (stateObj.inStore === true || stateObj.sellingItems === true) {
            hullText1Div.classList.add("flash")
            currentHullBarDiv.classList.add("flash")
        }
    }

    let hullBarLength = 10*(stateObj.currentHullArmor/stateObj.hullArmorMax)
    let hullBarText = "width:" + hullBarLength + "vw"
    currentHullBarDiv.setAttribute("style", hullBarText);
    emptyHullBarDiv.append(currentHullBarDiv);
    hullDiv.append(hullText1Div, emptyHullBarDiv, hullText2Div)
    return hullDiv
}

function createCurrentInventoryDiv(stateObj) {
    let inventoryDiv = document.createElement("Div")
    inventoryDiv.classList.add("inventory")

    let inventoryText1Div = document.createElement("Div")
    inventoryText1Div = document.createElement("Div")
    inventoryText1Div.classList.add("bars-text-div")
    inventoryText1Div.textContent = "Cargo "

    let inventoryText2Div = document.createElement("Div")
    inventoryText2Div = document.createElement("Div")
    inventoryText2Div.classList.add("bars-text-div")
    inventoryText2Div.setAttribute("id", "inventory-size-text");
    if (stateObj.inventoryMax > 12) {
        inventoryText2Div.classList.add("upgraded-stat")
    }
    inventoryText2Div.textContent = "[Press 'i']"
    if (stateObj.currentInventory === stateObj.inventoryMax) {
        inventoryText2Div.classList.add("inventory-full-text")
        inventoryText1Div.classList.add("inventory-full-text")
    }

    let emptyInventoryBar = document.createElement("Div");
    emptyInventoryBar.classList.add("empty-inv-bar");
    emptyInventoryBar.setAttribute("id", "empty-inv-bar");

    let currentInventoryBar = document.createElement("Div");
    currentInventoryBar.classList.add("current-inv-bar");
    currentInventoryBar.setAttribute("id", "current-inv-bar");
    currentInventoryBar.classList.add("normal-inv-bar");
    let invBarLength = 10*(stateObj.currentInventory/stateObj.inventoryMax)
    let invBarText = "width:" + invBarLength + "vw"
    currentInventoryBar.setAttribute("style", invBarText);
    emptyInventoryBar.append(currentInventoryBar);

    inventoryDiv.append(inventoryText1Div, emptyInventoryBar, inventoryText2Div)
    return inventoryDiv
}

function createBarsDiv(stateObj) {
    let barsDiv = document.createElement("Div")
    barsDiv.classList.add("bars-div")

    let fuelDiv = createFuelDiv(stateObj)
    let hullDiv = createHullDiv(stateObj) 
    let inventoryDiv = createCurrentInventoryDiv(stateObj)
    barsDiv.append(fuelDiv, hullDiv, inventoryDiv)
    return barsDiv
}

function createCashDiv(stateObj) {
    let cashDiv = document.createElement("Div")
    cashDiv.setAttribute("id", "cash-div");
    cashDiv.classList.add("centered")
    cashDiv.textContent = "$" + stateObj.bankedCash;
    return cashDiv
}

function createAmmoDiv(stateObj) {
    let ammoDiv = document.createElement("Div")
    ammoDiv.classList.add("all-weapons-div")
    ammoTextDiv = document.createElement("Div")
    ammoTextDiv.classList.add("ammo-text-div")
    ammoString = "Ammo: " + stateObj.ammo
    ammoTextDiv.textContent = ammoString
    ammoDiv.append(ammoTextDiv);
    return ammoDiv
}

function createDirtDiv(stateObj) {
    let dirtDiv = document.createElement("Div")
    dirtDiv.classList.add("dirt-div")
    dirtDiv.classList.add("centered")
    dirtDiv.classList.add("top-vertical-div")
    dirtString = "Dirt: " + Math.round((stateObj.dirtReserves/(stateObj.dirtThresholdNeeded))*100) + "%"
    if (stateObj.dirtReserves >= (stateObj.dirtThresholdNeeded)) {
        dirtString = dirtString + " - press P to drop"
    }
    if (stateObj.dirtThresholdNeeded < 50 || stateObj.noDirtThreshold === true) {
        dirtDiv.classList.add("upgraded-stat")
    }
    dirtDiv.textContent = dirtString
    return dirtDiv
}

function createTopBarRelicDiv(stateObj, topBarDiv) {
    for (let i=0; i < 5; i++) {
        let topBarRelicDiv = document.createElement("Div")
        topBarRelicDiv.classList.add("bar-relic-div")
  
        
        let relic = (stateObj.playerRelicArray[i]) ? stateObj.playerRelicArray[i] : false; 
        if (relic) {
          let weaponImg = document.createElement("Img");
          weaponImg.classList.add("relic-img")
          weaponImg.src = relic.imgPath
          topBarRelicDiv.append(weaponImg)
          let idString = "relic-popup-" +i
  
          topBarRelicDiv.addEventListener('mouseenter', function() {
            const statusText = document.getElementById(idString);
            statusText.style.display = 'block'
          });
          
          topBarRelicDiv.addEventListener('mouseleave', function() {
            const statusText = document.getElementById(idString);
            statusText.style.display = 'none'
          });
  
          let relicTextDiv = document.createElement("Div");
          relicTextDiv.setAttribute("id", idString)
          relicTextDiv.classList.add("none-display")
          let textString = relic.text(stateObj)
          relicTextDiv.textContent = textString
  
          let relicDivUpgradeString =  "bar-relic-upgrades-" + stateObj.playerRelicArray[i].upgrades
          topBarRelicDiv.classList.add(relicDivUpgradeString)
          topBarRelicDiv.appendChild(relicTextDiv);
        } else {
        }
  
        topBarDiv.append(topBarRelicDiv)
      }
    return topBarDiv
}

function createReturnToMapButton(stateObj) {
    let buyNothingDiv = document.createElement("Div")
    buyNothingDiv.setAttribute("id", "sell-return-map-div")
    buyNothingDiv.classList.add("return-to-map")
    buyNothingDiv.textContent = "Return to Map"
    buyNothingDiv.onclick = function () {
        returnToMap(stateObj)
    }
    return buyNothingDiv
}

function createLaserUpgradeDiv(stateObj) {
    let upgradeDiv = document.createElement("Div")
    upgradeDiv.classList.add("store-option")
    
    let upgradeText = document.createElement("Div")
    upgradeText.textContent = `Upgrade Lasers - (Pierce through ${stateObj.playerShip.laserLevel + 1} extra enem${(stateObj.playerShip.laserLevel==0) ? "y" : "ies"})`
    
    let cost = (1+stateObj.playerShip.laserLevel) * 3
    let costText = document.createElement("Div")
    costText.textContent = `Cost: ${cost} amethysts`
    
    upgradeDiv.append(upgradeText, costText)
    
    if (stateObj.amethystInventory >= cost) {
        upgradeDiv.classList.add("store-clickable")
        upgradeDiv.onclick = () => upgradeLaser(stateObj)
    }
    return upgradeDiv
  }

  function createBombUpgradeDiv(stateObj) {
    let upgradeDiv = document.createElement("Div")
    upgradeDiv.classList.add("store-option")
    
    let upgradeText = document.createElement("Div")
    upgradeText.textContent = `Upgrade Bomb - (Increase radius to ${stateObj.bombDistance + 1} squares)`
    
    let cost = (1+stateObj.playerShip.bombLevel) * 3
    let costText = document.createElement("Div")
    costText.textContent = `Cost: ${cost} amethysts`
    
    upgradeDiv.append(upgradeText, costText)
    
    if (stateObj.amethystInventory >= cost) {
        upgradeDiv.classList.add("store-clickable")
        upgradeDiv.onclick = () => upgradeBomb(stateObj)
    }
    return upgradeDiv
  }

function createWeaponUpgradeDivs(stateObj) {
    let weaponOptionsDiv = document.createElement("Div")
    weaponOptionsDiv.classList.add("upgrade-options")

    let laserUpgradeDiv = createLaserUpgradeDiv(stateObj)
    let bombUpgradeDiv = createBombUpgradeDiv(stateObj)

    weaponOptionsDiv.append(laserUpgradeDiv, bombUpgradeDiv)
    return weaponOptionsDiv
}



function createUpgradeRelicsDiv(stateObj) {
    let upgradeableRelics = stateObj.playerRelicArray.filter(obj => obj.upgrades)

  let upgradeDiv = document.createElement("Div")
  if (upgradeableRelics.length > 0) {
    upgradeDiv.classList.add("ruby-relic-div")
    upgradeDiv.classList.add("trade-relic-option")
    upgradeDiv.classList.add("column")
  
      let upgradeTitle = document.createElement("Div")
      upgradeTitle.classList.add("centered")
      upgradeTitle.textContent = "UPGRADE RELICS"
  
      let costDiv = document.createElement("Div")
      costDiv.classList.add("centered")
  
      let costString = "Costs 2 Diamonds" 
      if (stateObj.diamondInventory >= 2) {
        upgradeDiv.classList.add("ruby-relic-hover")
        upgradeDiv.onclick = async function () {
            await viewUpgradeRelic(stateObj)
          }
      }
  
    costDiv.textContent = costString
    upgradeDiv.append(upgradeTitle, costDiv)
  }
  return upgradeDiv
}

function createLevelChoiceDiv(stateObj, levelObject) {
    console.log('stateObj ' + stateObj.currentFuel)
    console.log('levelObj ' + JSON.stringify(levelObject))
    let levelChoiceDiv = document.createElement("Div")
    levelChoiceDiv.classList.add("next-level-option")
    levelChoiceDiv.textContent = levelObject.name +  " - " + levelObject.text
    levelChoiceDiv.classList.add("next-level-clickable")
    levelChoiceDiv.onclick = function () {
        levelObject.levelFunc(stateObj)
    }
    return levelChoiceDiv
}

//add both a "exchange one bronze " and a 'fill up' feature
//ADD INTO INVENTORY SCREEN LIKE SILVER

function createCraftAmmoButton(stateObj) {
    let craftAmmoButton = document.createElement("div");
      craftAmmoButton.classList.add("craft-button-row");
      craftAmmoButton.textContent = "Craft Ammo";
      craftAmmoButton.onclick = async function () {
        await craftAmmo(stateObj);
      };
      return craftAmmoButton
}


function createUpgradeInvDiv(stateObj) {
    let craftAmmoButton = document.createElement("div");
      craftAmmoButton.classList.add("scrap-inv-row");
      craftAmmoButton.textContent = "Expand Inventory";
      craftAmmoButton.onclick = async function () {
        await expandInventory(stateObj);
      };
      return craftAmmoButton
}

function createRefillFuelButton(stateObj) {
    let craftAmmoButton = document.createElement("div");
      craftAmmoButton.classList.add("bronze-fuel-row");
      craftAmmoButton.textContent = "Make Fuel";
      craftAmmoButton.onclick = async function () {
        await makeFuel(stateObj);
      };
      return craftAmmoButton
}

function createRepairHullButton(stateObj) {
    let craftAmmoButton = document.createElement("div");
      craftAmmoButton.classList.add("gold-repair-row");
      craftAmmoButton.textContent = "Repair Hull";
      craftAmmoButton.onclick = async function () {
        await repairHull(stateObj);
      };
      return craftAmmoButton
}

function createInventoryDiv(stateObj, type, inventory, conversionRate, nextType, conversionFunction) {
  if (inventory > 0) {
    let inventoryDiv = document.createElement("div");
    inventoryDiv.classList.add("inv-row", `${type.toLowerCase()}-convert-row`);
    
    let textString = `${type} Ore (${inventory})`;
    
    if (inventory >= conversionRate) {
      inventoryDiv.classList.add("can-convert");
      textString += ` [click to convert ${conversionRate} to 1 ${nextType}]`;
      inventoryDiv.addEventListener('click', async function(event) {
        // Only trigger conversion if the click is directly on the inventoryDiv
        if (event.target === inventoryDiv) {
            await conversionFunction(stateObj);
          }
      });
    }
    inventoryDiv.textContent = textString;

    if (type === "Bronze") {
        if (stateObj.currentFuel < stateObj.fuelTankMax) {
            let refillFuelButton = createRefillFuelButton(stateObj)
            inventoryDiv.append(refillFuelButton);
        }
    } else if (type === "Silver") {
      let craftAmmoButton = createCraftAmmoButton(stateObj)
      inventoryDiv.append(craftAmmoButton);
    } else if (type === "Gold") {
        if (stateObj.currentHullArmor < stateObj.hullArmorMax) {
            let repairHullButton = createRepairHullButton(stateObj)
            inventoryDiv.append(repairHullButton);
        }
        
      }
    return inventoryDiv
  } else {
        return false
  }
}

function createScrapDiv(stateObj) {
    if (stateObj.scrapInventory > 0) {
      let inventoryDiv = document.createElement("div");
      inventoryDiv.classList.add("inv-row");
      
      let textString = `Scrap Metal (${stateObj.scrapInventory})`;
      inventoryDiv.textContent = textString;

      if (stateObj.scrapInventory > 2) {
        let upgradeInvDiv = createUpgradeInvDiv(stateObj)
        inventoryDiv.append(upgradeInvDiv);
      }
  
      return inventoryDiv
    } else {
        return false
    }
  }

function createFuelTankVisualStoreDiv(fuelArray) {
    const fuelTankDiv = document.createElement('div');
    fuelTankDiv.classList.add('fuel-tank');
  
    fuelArray.forEach((fuel, index) => {
      const tankSection = document.createElement('div');
      tankSection.classList.add('tank-section');
  
      const tankFill = document.createElement('div');
      tankFill.classList.add('tank-fill');
  
      if (fuel > 0) {
        tankFill.classList.add(`fuel-${fuel}`);
      }
  
      tankSection.appendChild(tankFill);
      fuelTankDiv.appendChild(tankSection);
    });
  
    return fuelTankDiv;
}



// function createInvOreDivs(stateObj) {

// }