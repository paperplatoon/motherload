
//render the top bar with all the stats
function renderTopBarStats(stateObj) {
    let topBarDiv = document.createElement("Div")
    topBarDiv.classList.add("top-stats-bar")

    let scoreLevelDiv = createScoreDiv(stateObj)
    let barsDiv = createBarsDiv(stateObj)
    let ammoDiv = createAmmoDiv(stateObj)
    let dirtDiv = createDirtDiv(stateObj)

    topBarDiv.append(scoreLevelDiv, barsDiv, ammoDiv, dirtDiv)

    
    topBarDiv = createTopBarRelicDiv(stateObj, topBarDiv)
    return topBarDiv
}

//lostTheGame
function lostTheGame() {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("lost-div")

  let lostTextDiv = document.createElement("H3")
  lostTextDiv.textContent = state.lossString

  let lostTextDiv1 = document.createElement("H3")
  lostTextDiv1.textContent = "Final Score: " + state.score;

  let lostTextDiv2 = document.createElement("H3")
  lostTextDiv2.textContent = "Press OK to try again"

  lostDiv.append(lostTextDiv, lostTextDiv1, lostTextDiv2)

  let lostButtonDiv = document.createElement("Div")
  lostButtonDiv.classList.add("sell-button")
  lostButtonDiv.textContent = "OK"
  lostButtonDiv.onclick = function() {
      location.reload(true)
  }
  lostDiv.append(lostButtonDiv)
  storeDiv.append(lostDiv)

  return storeDiv
}

function wonTheGame() {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("selling-items-div")

  let lostTextDiv = document.createElement("H3")
  lostTextDiv.textContent = "CONGRATULATIONS!!!!"
  let lostTextDiv1 = document.createElement("H3")
  lostTextDiv1.textContent = "You made it to the end of the demo! Great build!"
  let lostTextDiv2 = document.createElement("H3")
  lostTextDiv2.textContent = "Click the button below to try a new run"

  lostDiv.append(lostTextDiv, lostTextDiv1, lostTextDiv2)

  let lostButtonDiv = document.createElement("Div")
  lostButtonDiv.classList.add("sell-button")
  lostButtonDiv.textContent = "New Game"
  lostButtonDiv.onclick = function() {
      location.reload(true)
  }
  lostDiv.append(lostButtonDiv)
  storeDiv.append(lostDiv)

  return storeDiv
}

function chooseRobot(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("choose-robot-div")


  let robot1Div = document.createElement("Div")
  let robot1TextDiv = document.createElement("H3")
  robot1TextDiv.textContent = "Standard Model"
  let robotImageDiv1 = document.createElement("Div")
  robot1Div.classList.add("robot-div")
  let robotImg1 = document.createElement("Img");
  robotImg1.classList.add("robot-img")
  robotImg1.src = "img/map/robot1.png"
  robotImageDiv1.append(robotImg1)

  let robotDescDiv = document.createElement("Div")
  robotDescDiv.textContent = "Medium Fuel Tank"
  let robot1DescDiv = document.createElement("Div")
  robot1DescDiv.textContent = "Medium Hull Armor"
  let robot2DescDiv = document.createElement("Div")
  robot2DescDiv.textContent = "Medium Cargo Bay"

  robot1Div.onclick = function() {
      chooseRobot1(stateObj)
  }
  robot1Div.append(robot1TextDiv, robotImageDiv1, robotDescDiv, robot1DescDiv, robot2DescDiv)

  let robot2Div = document.createElement("Div")
  let robot2TextDiv = document.createElement("H3")
  robot2TextDiv.textContent = "Bronze Mini-Drone"
  let robotImageDiv2 = document.createElement("Div")
  robot2Div.classList.add("robot-div")
  let robotImg2 = document.createElement("Img");
  robotImg2.classList.add("robot-img")
  robotImg2.src = "img/map/robot2.png"
  robotImageDiv2.append(robotImg2)

  let robotDescDiv2 = document.createElement("Div")
  robotDescDiv2.textContent = "Very low Hull Armor"
  let robotDesc1Div2 = document.createElement("Div")
  robotDesc1Div2.textContent = "Hull Armor increases when mining bronze ore"
  robot2Div.onclick = function() {
      chooseRobot2(stateObj)
  }
  robot2Div.append(robot2TextDiv, robotImageDiv2, robotDescDiv2, robotDesc1Div2)

  let robot3Div = document.createElement("Div")
  let robot3TextDiv = document.createElement("H3")
  robot3TextDiv.textContent = "Light Quantum Ship"
  let robotImageDiv3 = document.createElement("Div")
  robot3Div.classList.add("robot-div")
  let robotImg3 = document.createElement("Img");
  robotImg3.classList.add("robot-img")
  robotImg3.src = "img/map/robot3.png"
  robotImageDiv3.append(robotImg3)

  let robotDescDiv3 = document.createElement("Div")
  robotDescDiv3.textContent = "Small fuel tank"
  let robotDesc1Div3 = document.createElement("Div")
  robotDesc1Div3.textContent = "Fuel-powered teleporter"
  robot3Div.onclick = function() {
      chooseRobot3(stateObj)
  }
  robot3Div.append(robot3TextDiv, robotImageDiv3, robotDescDiv3, robotDesc1Div3)

  let robot4Div = document.createElement("Div")
  let robot4TextDiv = document.createElement("H3")
  robot4TextDiv.textContent = "Light Miner"
  let robotImageDiv4 = document.createElement("Div")
  robot4Div.classList.add("robot-div")
  let robotImg4 = document.createElement("Img");
  robotImg4.classList.add("robot-img")
  robotImg4.src = "img/map/robot4.png"
  robotImageDiv4.append(robotImg4)

  let robotDescDiv4 = document.createElement("Div")
  robotDescDiv4.textContent = "Low Hull Armor"
  let robotDesc1Div4 = document.createElement("Div")
  robotDesc1Div4.textContent = "Drop dirt much faster"
  robot4Div.onclick = function() {
      chooseRobot4(stateObj)
  }
  robot4Div.append(robot4TextDiv, robotImageDiv4, robotDescDiv4, robotDesc1Div4)

  let robot5Div = document.createElement("Div")
  let robot5TextDiv = document.createElement("H3")
  robot5TextDiv.textContent = "Scrap Robot"
  let robotImageDiv5 = document.createElement("Div")
  robot5Div.classList.add("robot-div")
  let robotImg5 = document.createElement("Img");
  robotImg5.classList.add("robot-img")
  robotImg5.src = "img/map/robot5.png"
  robotImageDiv5.append(robotImg5)

  let robotDescDiv5 = document.createElement("Div")
  robotDescDiv5.textContent = "Small Cargo Bay"
  let robotDesc1Div5 = document.createElement("Div")
  robotDesc1Div5.textContent = "Gain small amounts of Hull Armor for killing enemies"
  robot5Div.onclick = function() {
      chooseRobot5(stateObj)
  }
  robot5Div.append(robot5TextDiv, robotImageDiv5, robotDescDiv5, robotDesc1Div5)


  lostDiv.append(robot1Div, robot2Div, robot3Div, robot4Div, robot5Div)
  storeDiv.append(lostDiv)

  return storeDiv
}

function renderStart(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let lostDiv = document.createElement("Div")
  lostDiv.classList.add("start-div")

  let textDiv2 = document.createElement("H3")
  textDiv2.classList.add("padding-width")
  textDiv2.textContent = "Sell and trade ore at the shop to upgrade your ship"

  let textDiv4 = document.createElement("H3")
  textDiv4.classList.add("padding-width")
  textDiv4.textContent = "View Cargo Bay Inventory with 'I'. You can convert 3 ores to 1 higher quality ore"

  let textDiv7 = document.createElement("H3")
  textDiv7.classList.add("padding-width")
  textDiv7.textContent = "Gems in stone must be hit with lasers ('L' key) or bombs ('B' key) before they can be mined"

  let textDiv6 = document.createElement("H3")
  textDiv6.classList.add("padding-width")
  textDiv6.textContent = "Press 'H' to view this screen again"

  lostDiv.append(textDiv2, textDiv4, textDiv7, textDiv6)

  let startButton = document.createElement("Div")
  startButton.classList.add("sell-button")
  startButton.textContent = "OK"
  startButton.onclick = function() {
      startTheGame(stateObj)
  }
  lostDiv.append(startButton)
  storeDiv.append(lostDiv)

  return storeDiv
}
//convert Inventory
function renderInventory(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let sellDiv = document.createElement("Div")
  sellDiv.classList.add("viewing-inv-div")
  sellDiv.classList.add("column")

  let allInventoryDiv = document.createElement("Div")
  allInventoryDiv.classList.add("all-inventory-div")

  let sellInventoryDiv = document.createElement("Div")
  sellInventoryDiv.classList.add("selling-div")
  sellInventoryDiv.classList.add("column")

  let maxTextDiv = document.createElement("Div")
  maxTextDiv.textContent = "Current Capacity: " + stateObj.currentInventory + "/" + stateObj.inventoryMax
  maxTextDiv.classList.add("margin-top-10")

  let bronzeInvDiv = createInventoryDiv(stateObj, "Bronze", stateObj.bronzeInventory, 3, "Silver", convertBronze);
  let silverInvDiv = createInventoryDiv(stateObj, "Silver", stateObj.silverInventory, 3, "Gold", convertSilver);
  const conversionRate = stateObj.efficientGoldConverter ? 2 : 3;
  let goldInvDiv = createInventoryDiv(stateObj, "Gold", stateObj.goldInventory, conversionRate, "Ruby", convertGold);
  let rubyInvDiv = createInventoryDiv(stateObj, "Ruby", stateObj.rubyInventory, 3, "Amethyst", convertRuby);
  let amethystInvDiv = createInventoryDiv(stateObj, "Amethyst", stateObj.amethystInventory, 3, "Diamond", convertAmethyst);
  let diamondInvDiv = createInventoryDiv(stateObj, "Diamond", stateObj.diamondInventory, 3, "Black Diamond", convertDiamond);
  let scrapDiv = createScrapDiv(stateObj)
  let blackDiamondInvDiv = false
  if (stateObj.blackDiamondInventory > 0) {
    blackDiamondInvDiv= document.createElement("div");
    blackDiamondInvDiv.classList.add("inv-row", "black-diamond-convert-row");
    blackDiamondInvDiv.textContent = `Black Diamond Ore (${stateObj.blackDiamondInventory})`;
  }
  let invDivArray = [bronzeInvDiv, silverInvDiv, goldInvDiv, rubyInvDiv, amethystInvDiv, diamondInvDiv, blackDiamondInvDiv, scrapDiv]

  invDivArray.forEach((div, index) => {
    if (div) {
      sellInventoryDiv.append(div)
    }
   })
  
  
  
  // Black Diamond is a special case as it doesn't convert to anything



  let buyNothingDiv = createReturnToMapButton(stateObj)

  let shipStatsDiv = document.createElement("Div")
    shipStatsDiv.classList.add("ship-stats")

    let hullArmorRow = document.createElement("Div")
    hullArmorRow.classList.add("inventory-bar-vis-div")
    let hullArmorText = `Hull Armor: `
    let hullArmorDiv = document.createElement("Div")
    hullArmorDiv.textContent = hullArmorText
    let hullBarVis = createFuelTankVisualStoreDiv(stateObj.playerShip.hullArmorPlating)
    hullArmorRow.append(hullArmorDiv, hullBarVis)

    let fuelDivRow = document.createElement("Div")
    fuelDivRow.classList.add("inventory-bar-vis-div")
    let fuelTankText = `Fuel Tank: `
    let fuelTankDiv = document.createElement("Div")
    fuelTankDiv.textContent = fuelTankText

    let fuelBarVis = createFuelTankVisualStoreDiv(stateObj.playerShip.fuelTank)
    fuelDivRow.append(fuelTankDiv, fuelBarVis)

    // let weaponsText = `Laser Level: ${stateObj.playerShip.laserLevel}, Bomb Level: ${stateObj.playerShip.bombLevel}`
    // let weaponsDiv = document.createElement("Div")
    // weaponsDiv.textContent = weaponsText

    shipStatsDiv.append(hullArmorRow, fuelDivRow)
    sellDiv.append(shipStatsDiv, maxTextDiv, sellInventoryDiv, buyNothingDiv)
    storeDiv.append(sellDiv)
  
  return storeDiv
}

//show the full map
function renderMap(stateObj) {
  let mapDiv = document.createElement("Div");
  mapDiv.classList.add("map-div");
  //picking the 
  let screenwidthBlocks = stateObj.floorValues[stateObj.currentLevel].screenwidthBlocks
  let currentFloor = Math.floor(stateObj.currentPosition / screenwidthBlocks)
  //starting floor position is 0 if you're not at least 4 floors deep
  let mapSizeVal = (stateObj.fishEyeLens) ? 6 : 4;

  let startingFloor = false;
  if (currentFloor < mapSizeVal) {
    startingFloor = 0
  } else {
    if (currentFloor > (stateObj.floorValues[stateObj.currentLevel].numberRows - mapSizeVal)) {
      startingFloor = stateObj.floorValues[stateObj.currentLevel].numberRows - mapSizeVal - 1
    } else {
      startingFloor = currentFloor - mapSizeVal
    }
  }
  let endingFloor = false
  if (startingFloor === 0) {
    //only show 8 floors at once
    endingFloor = (mapSizeVal*2) + 1
  } else {
    //if you're near the end of the level, the ending floor range is the end of the level
    if (currentFloor > (stateObj.floorValues[stateObj.currentLevel].numberRows-mapSizeVal)) {
      endingFloor = stateObj.floorValues[stateObj.currentLevel].numberRows + mapSizeVal + 2
    } else {
      endingFloor = currentFloor + mapSizeVal
    }
  }
  let currentPosition = stateObj.currentPosition - (currentFloor*(screenwidthBlocks))
  let startingPosition = false
  if (currentPosition < mapSizeVal) {
    startingPosition = 0
  } else {
    if (currentPosition > (screenwidthBlocks-mapSizeVal-1)) {
      startingPosition = screenwidthBlocks - ((mapSizeVal*2) + 1)
    } else {
      startingPosition = currentPosition - mapSizeVal
    }
  }
  let endingPosition = false
  if (startingPosition === 0) {
    endingPosition = ((mapSizeVal*2) + 1)
  } else {
    endingPosition = (currentPosition > (screenwidthBlocks- mapSizeVal - 1))
    ? screenwidthBlocks : currentPosition + mapSizeVal + 1
  }

  stateObj.gameMap.forEach(async function (mapSquare, squareIndex) {
    let currentMapFloor = Math.floor(squareIndex / screenwidthBlocks)
    let inFloorRange = ((currentMapFloor >= startingFloor) && (currentMapFloor < endingFloor))
    let currentMapPosition = squareIndex - (currentMapFloor*(screenwidthBlocks))
    let inPositionRange = ((currentMapPosition >= startingPosition) && (currentMapPosition < endingPosition))

    if (inFloorRange && inPositionRange) {
      let mapSquareDiv = document.createElement("Div");
      if (stateObj.fishEyeLens) {
        mapSquareDiv.classList.add("map-square-fish");
      } else {
        mapSquareDiv.classList.add("map-square");
      }
      

      if (stateObj.currentPosition === squareIndex) {
          mapSquareDiv.classList.add("player-here")
          let mapSquareImg = document.createElement("Img");
          if ((stateObj.currentFuel < stateObj.fuelTankMax/3)) {
              mapSquareImg.classList.add("player-img-low-fuel")
          } else if (stateObj.currentHullArmor <= (stateObj.hullArmorMax/2)) {
              mapSquareImg.classList.add("player-img-damaged")
          } else if (stateObj.currentInventory === stateObj.inventoryMax) {
              mapSquareImg.classList.add("player-img-full")
          } else {
              mapSquareImg.classList.add("player-img")
          }
          if (stateObj.takingDamage > 3) {
            mapSquareImg.classList.add("taking-damage-1")
          } else if (stateObj.takingDamage > 0) {
            mapSquareImg.classList.add("taking-damage-2")
          }
          mapSquareImg.src = stateObj.robotPath
          mapSquareDiv.append(mapSquareImg)
      }
      if (mapSquare === "stone") {
          mapSquareDiv.classList.add("stone")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-img")
          mapSquareImg.src = "img/map/stone.png"
          mapSquareDiv.append(mapSquareImg)
      }


      if (mapSquare === "poison-0" || mapSquare === "poison-4") {
          mapSquareDiv.classList.add("poison-dirt")
      } 
      if (mapSquare === "0" || mapSquare === "poison-0") {
          mapSquareDiv.classList.add("dirt")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("dirt-img")
          mapSquareImg.src = "img/map/dirt.png"
          if (mapSquare === "poison-0") { mapSquareImg.classList.add("poison-dirt")}
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "empty") {
          mapSquareDiv.classList.add("empty")
      } else if (mapSquare === "active-laser") {
          mapSquareDiv.classList.add("laser-effect")
      } else if (mapSquare === "exploding-1") {
          mapSquareDiv.classList.add("bomb-effect")
      } else if (mapSquare === "enemy") {
          mapSquareDiv.classList.add("enemy")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("enemy-img")
          mapSquareImg.src = "img/map/enemy1.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "1") {
          mapSquareDiv.classList.add("bronze")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("bronze-img")
          mapSquareImg.src = "img/map/bronze.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "2") {
          mapSquareDiv.classList.add("silver")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("silver-img")
          mapSquareImg.src = "img/map/silver.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "3") {
          mapSquareDiv.classList.add("gold")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("gold-img")
          mapSquareImg.src = "img/map/gold.png"
          mapSquareDiv.append(mapSquareImg)
      }  else if (mapSquare === "4" || mapSquare==="magnetic-4") {
          mapSquareDiv.classList.add("ruby")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("ruby-img")
          mapSquareImg.src = "img/map/ruby.png"
          if (mapSquare === "poison-4") { mapSquareImg.classList.add("poison-dirt")}
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "5") {
          mapSquareDiv.classList.add("amethyst")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("amethyst-img")
          mapSquareImg.src = "img/map/amethyst.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "stone-5") {
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-amethyst-img")
          mapSquareImg.src = "img/map/stone-amethyst.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "6") {
          mapSquareDiv.classList.add("diamond")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("diamond-img")
          mapSquareImg.src = "img/map/diamond.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "stone-6") {
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-diamond-img")
          mapSquareImg.src = "img/map/stone-diamond.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "7") {
          mapSquareDiv.classList.add("blkdiamond")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("blkdiamond-img")
          mapSquareImg.src = "img/map/blkdiamond.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "stone-7") {
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("stone-blkdiamond-img")
          mapSquareImg.src = "img/map/stone-blkdiamond.png"
          mapSquareDiv.append(mapSquareImg)
      }  else if (mapSquare === "STORE") {
          mapSquareDiv.classList.add("store")
          let mapSquareImg = document.createElement("Img");
          if (stateObj.fishEyeLens) {
            mapSquareImg.classList.add("store-img-fish")
          } else {
            mapSquareImg.classList.add("store-img")
          }
          mapSquareImg.src = "img/map/store.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "EXIT") {
          mapSquareDiv.classList.add("exit")
          let mapSquareImg = document.createElement("Img");
          if (stateObj.fishEyeLens) {
            mapSquareImg.classList.add("exit-img-fish")
          } else {
            mapSquareImg.classList.add("exit-img")
          }
          mapSquareImg.src = "img/map/exit.jpg"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "BOMB") {
          mapSquareDiv.classList.add("bomb")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("bomb-img")
          mapSquareImg.src = "img/map/bomb.png"
          mapSquareDiv.append(mapSquareImg)
      } else if (mapSquare === "relic1") {
          mapSquareDiv.classList.add("relic")
          let mapSquareImg = document.createElement("Img");
          mapSquareImg.classList.add("relic-img")
          mapSquareImg.src = stateObj.mapRelic1.imgPath
          mapSquareDiv.append(mapSquareImg)
      }  else if (mapSquare === "relic2") {
        mapSquareDiv.classList.add("relic")
        let mapSquareImg = document.createElement("Img");
        mapSquareImg.classList.add("relic-img")
        mapSquareImg.src = stateObj.mapRelic2.imgPath
        mapSquareDiv.append(mapSquareImg)
    } else if (mapSquare === "teleporter") {
      let mapSquareImg = document.createElement("Img");
      mapSquareImg.classList.add("relic-img")
      mapSquareImg.src = "img/relics/teleporter.png"
      mapSquareDiv.append(mapSquareImg)
    } else if (mapSquare === "crate") {
      let mapSquareImg = document.createElement("Img");
      mapSquareImg.classList.add("crate-img")
      mapSquareImg.src = "img/map/crate.png"
      mapSquareDiv.append(mapSquareImg)
    } 

    if (squareIndex !== stateObj.currentPosition) {
      //mapSquareDiv.textContent = squareIndex
    }
    mapSquareDiv.classList.add("centered")
    
      mapDiv.append(mapSquareDiv)
  }
  })

  return mapDiv
}

function renderNextLevelChoice(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let chosenLevels = []
  for (i = 0; i < 3; i++) {
      let chosenLevel = Math.floor(Math.random() * levelChoices.length);
      chosenLevels.push(levelChoices[chosenLevel])
      levelChoices.splice(chosenLevel, 1)
  }

  let level1 = createLevelChoiceDiv(stateObj, chosenLevels[0])
  console.log('level1' + JSON.stringify(level1))

  let level2 = createLevelChoiceDiv(stateObj, chosenLevels[1])
  console.log('level2' + JSON.stringify(level2))

  let level3= createLevelChoiceDiv(stateObj, chosenLevels[2])
  console.log('level3' + JSON.stringify(level3))

  storeDiv.append(level1, level2, level3)
  return storeDiv
}


  // let buyRelic1Div = document.createElement("Div")
  // if (stateObj.storeRelic3 !== false) {
  //   buyRelic1Div.setAttribute("id", "store-relic-3-div")
  //   buyRelic1Div.classList.add("store-option")
  //   buyRelic1Div.classList.add("relic-option")
  //     let relicText1 = document.createElement("Div")
  //     relicText1.classList.add("store-option-text")
  //     let relicText2 = document.createElement("Div")
  //     relicText2.classList.add("store-option-text")
  //     relicText1.textContent = stateObj.storeRelic3.storeText(stateObj)
  //     let relicPrice = Math.ceil(stateObj.floorValues[stateObj.currentLevel].storeRelicPrice * (1-stateObj.cheaperShops))
  //     relicText2.textContent = "$" + relicPrice
  //     let relicImg = document.createElement("Img");
  //     relicImg.classList.add("store-relic-img")
  //     relicImg.src = stateObj.storeRelic3.imgPath
  //     buyRelic1Div.append(relicText1, relicImg, relicText2)
  //     if (stateObj.bankedCash >= relicPrice) {
  //         buyRelic1Div.classList.add("store-clickable")
  //         buyRelic1Div.onclick = function () {
  //             buyRelic3Func(stateObj, relicPrice)
  //         }
  //     }
  // }

function renderStore(stateObj) {

  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div", "flex-column-centered")

  let optionsDiv = document.createElement("Div")
  optionsDiv.classList.add("store-options-container", "flex-row-centered")

  // Fuel Tank Upgrade
  let fuelUpgradeDiv = createUpgradeOption(stateObj, "Fuel Tank", stateObj.playerShip.fuelTank, upgradeFuelTank)
  let fuelTank = createFuelTankVisualStoreDiv(stateObj.playerShip.fuelTank)
  fuelUpgradeDiv.append(fuelTank)

  // Hull Armor Upgrade
  let hullArray = createFuelTankVisualStoreDiv(stateObj.playerShip.hullArmorPlating)
  let hullUpgradeDiv = createUpgradeOption(stateObj, "Hull Armor", stateObj.playerShip.hullArmorPlating, upgradeHullArmor)
  hullUpgradeDiv.append(hullArray)

  
  let relicUpgradeDiv = createUpgradeRelicsDiv(stateObj)

  // ... other store options ...

  optionsDiv.append(fuelUpgradeDiv, hullUpgradeDiv, relicUpgradeDiv)

  if (stateObj.currentLevel > 0) {
    let weapons = createWeaponUpgradeDivs(stateObj)
    optionsDiv.append(weapons)
  }

  let leaveStoreButton = createReturnToMapButton(stateObj)
  leaveStoreButton.classList.add("margin-top-10")
  storeDiv.append(optionsDiv, leaveStoreButton)
  
  return storeDiv
}

function renderRouletteChoices(stateObj) {
  
  let commonArray = [...commonRouletteChoices]
  let uncommonArray = [...uncommonRouletteChoices]
  let rareArray = [...rareRouletteChoices]
  let legendaryArray = [...legendaryRouletteChoices]

  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let roulette1Rarity = Math.random()
  let roulette2Rarity = Math.random()
  let roulette3Rarity = Math.random()
  let roulette1Array = false
  let roulette2Array = false
  let roulette3Array = false
  let legendThreshold = 0.95
  let rareThreshold = 0.9
  let uncommonThreshold = 0.75

  let titleDiv = document.createElement("Div")
  titleDiv.classList.add("roulette-choice-pick")
  titleDiv.textContent = "Choose one"
  storeDiv.append(titleDiv)
  
  for (let i = 0; i < 3; i++) {
    let roulette1Rarity = Math.random()
    if (roulette1Rarity > legendThreshold) {roulette1Array = legendaryArray} 
    else if (roulette1Rarity > rareThreshold) {roulette1Array = rareArray} 
    else if (roulette1Rarity > uncommonThreshold) {roulette1Array = uncommonArray} else {roulette1Array = commonArray}

    let rouletteNum1 = Math.floor(Math.random() * roulette1Array.length)
    let rouletteChoice1 = roulette1Array[rouletteNum1]
    roulette1Array.splice(rouletteNum1, 1)

    let choice1Div = document.createElement("Div")
    choice1Div.classList.add("roulette-option")

    let choice1Title = document.createElement("Div")
    choice1Title.classList.add("roulette-title")
    choice1Title.classList.add("centered")
    choice1Title.textContent = rouletteChoice1.name
    let classString = "roulette-title-" + rouletteChoice1.rarity
    choice1Title.classList.add(classString)

    let choice1Text = document.createElement("Div")
    choice1Text.classList.add("roulette-text")
    choice1Text.classList.add("centered")
    choice1Text.textContent = rouletteChoice1.text(stateObj)

    let choice1Rarity = document.createElement("Div")
    choice1Rarity.classList.add("roulette-rarity")
    choice1Rarity.classList.add("centered")
    choice1Rarity.textContent = rouletteChoice1.rarity
    let rarityString = "roulette-rarity-" + rouletteChoice1.rarity
    choice1Rarity.classList.add(rarityString)

    choice1Div.append(choice1Title, choice1Text, choice1Rarity)

    choice1Div.classList.add("roulette-clickable")
    choice1Div.onclick = function () {
        rouletteChoice1.rouletteFunc(stateObj, rouletteChoice1.value)
    }
    storeDiv.append(choice1Div)
  }
  return storeDiv
}

function renderChoosingRelicToReplace(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let relicRowDiv = document.createElement("Div")
  relicRowDiv.classList.add("relic-row-div")
  relicRowDiv.classList.add("row")

  for (let i=0; i < stateObj.playerRelicArray.length; i++) {
    if (i < 5) {
      let relic = stateObj.playerRelicArray[i]
      let swapRelicDiv = document.createElement("Div")
      swapRelicDiv.classList.add("swap-relic-div")
      swapRelicDiv.classList.add("column")
  
      if (stateObj.playerRelicArray[i].upgrades) {
        let relicDivUpgradeString =  "bar-relic-upgrades-" + stateObj.playerRelicArray[i].upgrades
        swapRelicDiv.classList.add(relicDivUpgradeString)
      }
      
      let swapRelicTitleDiv = document.createElement("Div")
      swapRelicTitleDiv.textContent = relic.name
      swapRelicTitleDiv.classList.add("centered")
  
      let swapImg = document.createElement('Img')
      swapImg.classList.add("store-relic-img")
      swapImg.src = relic.imgPath
  
      let swapRelicTextDiv = document.createElement("Div")
      swapRelicTextDiv.textContent = relic.text(stateObj)
      swapRelicTextDiv.classList.add("centered")
  
      swapRelicDiv.onclick = async function () {
        await swapRelic(stateObj, i)
      }
      swapRelicDiv.append(swapRelicTitleDiv, swapImg, swapRelicTextDiv)
      relicRowDiv.append(swapRelicDiv)
    }
  }
  
  let relicToSwapDiv = document.createElement("Div")
  relicToSwapDiv.classList.add("relic-row-div")
  relicToSwapDiv.classList.add("row")
  let relic = stateObj.relicToChoose
  let swapRelicDiv = document.createElement("Div")
  swapRelicDiv.classList.add("swap-relic-div")
  swapRelicDiv.classList.add("to-swap-relic-div")
  swapRelicDiv.classList.add("column")

  let swapRelicTitleDiv = document.createElement("Div")
  swapRelicTitleDiv.textContent = relic.name
  swapRelicTitleDiv.classList.add("centered")

  let swapImg = document.createElement('Img')
  swapImg.classList.add("store-relic-img")
  swapImg.src = relic.imgPath

  let swapRelicTextDiv = document.createElement("Div")
  swapRelicTextDiv.textContent = relic.storeText(stateObj)
  swapRelicTextDiv.classList.add("centered")

  swapRelicDiv.append(swapRelicTitleDiv, swapImg, swapRelicTextDiv)
  relicToSwapDiv.append(swapRelicDiv)

  let scrapRelicButton = document.createElement("Div")
  let val = Math.floor(stateObj.floorValues[stateObj.currentLevel].storeRelicPrice/2)
  let tradeString = "Scrap this relic in exchange for $" + val
  scrapRelicButton.textContent = tradeString
  scrapRelicButton.classList.add("centered")
  scrapRelicButton.classList.add("scrap-button-relic")
  scrapRelicButton.onclick = async function () {
      await scrapRelicForCash(stateObj, val)
    }
  
  relicToSwapDiv.append(scrapRelicButton)

  storeDiv.append(relicRowDiv, relicToSwapDiv)
  storeDiv.classList.add("column")
  return storeDiv
}

function renderChooseUpgradeRelic(stateObj) {
  let storeDiv = document.createElement("Div")
  storeDiv.classList.add("store-div")

  let relicRowDiv = document.createElement("Div")
  relicRowDiv.classList.add("relic-row-div")
  relicRowDiv.classList.add("row")


  for (let i=0; i < stateObj.playerRelicArray.length; i++) {
    if (stateObj.playerRelicArray[i].upgrades) {
      let relic = stateObj.playerRelicArray[i]
      let swapRelicDiv = document.createElement("Div")
      swapRelicDiv.classList.add("swap-relic-div")
      swapRelicDiv.classList.add("column")

      if (stateObj.playerRelicArray[i].upgrades) {
        let relicDivUpgradeString =  "bar-relic-upgrades-" + (stateObj.playerRelicArray[i].upgrades+1)
        swapRelicDiv.classList.add(relicDivUpgradeString)
      }
      
      let swapRelicTitleDiv = document.createElement("Div")
      swapRelicTitleDiv.textContent = relic.name
      swapRelicTitleDiv.classList.add("centered")

      let swapImg = document.createElement('Img')
      swapImg.classList.add("store-relic-img")
      swapImg.src = relic.imgPath

      let swapRelicTextDiv = document.createElement("Div")
      let textString = "UPGRADE: " + relic.storeText(stateObj)
      swapRelicTextDiv.textContent = textString
      swapRelicTextDiv.classList.add("centered")

      swapRelicDiv.onclick = async function () {
        await upgradeRelic(stateObj, i)
      }
      swapRelicDiv.append(swapRelicTitleDiv, swapImg, swapRelicTextDiv)
      relicRowDiv.append(swapRelicDiv)
      } 
  }
  
  let relicToSwapDiv = document.createElement("Div")
  relicToSwapDiv.classList.add("relic-row-div")
  relicToSwapDiv.classList.add("row")

  let scrapRelicButton = document.createElement("Div")
  let val = Math.floor(stateObj.floorValues[stateObj.currentLevel].storeRelicPrice/2)
  let tradeString = "Don't upgrade any of these"
  scrapRelicButton.textContent = tradeString
  scrapRelicButton.classList.add("centered")
  scrapRelicButton.classList.add("scrap-button-relic")
  scrapRelicButton.onclick = async function () {
      await viewStore(stateObj)
    }
  
  relicToSwapDiv.append(scrapRelicButton)

  storeDiv.append(relicRowDiv, relicToSwapDiv)
  storeDiv.classList.add("column")
  return storeDiv
}



function createUpgradeOption(stateObj, upgradeName, upgradeArray, upgradeFunc) {
  let upgradeDiv = document.createElement("Div")
  upgradeDiv.classList.add("upgrade-options")

  const gemTypes = ["Bronze", "Silver", "Gold", "Ruby"]
  const inventoryTypes = ["bronzeInventory", "silverInventory", "goldInventory", "rubyInventory"]

  gemTypes.forEach((gemType, index) => {
      // Only show option if the entire array isn't already at this level or higher
      if (upgradeArray.some(value => value <= index)) {
          let optionDiv = document.createElement("Div")
          optionDiv.classList.add("store-option")

          let upgradeText = document.createElement("Div")
          upgradeText.textContent = `Upgrade ${upgradeName} (${gemType})`

          let costText = document.createElement("Div")
          costText.textContent = `Cost: 5 ${gemType}`

          optionDiv.append(upgradeText, costText)

          if (stateObj[inventoryTypes[index]] >= 5) {
              optionDiv.classList.add("store-clickable")
              optionDiv.onclick = () => upgradeFunc(stateObj, index + 1)
          }

          upgradeDiv.append(optionDiv)
      }
  })

  return upgradeDiv
}

async function upgradeFuelTank(stateObj, upgradeLevel) {
  let gemType = getGemTypeForUpgrade(upgradeLevel).toLowerCase()
  let cost = 5  // Fixed cost of 5 gems
  
  stateObj = immer.produce(stateObj, draft => {
      if (draft[`${gemType}Inventory`] >= cost) {
          const lowestIndex = draft.playerShip.fuelTank.findIndex(value => value === Math.min(...draft.playerShip.fuelTank))
          if (lowestIndex !== -1) {
              draft.playerShip.fuelTank[lowestIndex] = upgradeLevel
              draft[`${gemType}Inventory`] -= cost
              draft.currentInventory -= cost
              draft.fuelTankMax = calculateMaxFuel(draft, draft.playerShip.fuelTank)
          }
      }
  })
  stateObj = changeState(stateObj)
  return stateObj
}

async function upgradeFuelRoulette(stateObj, upgradeLevel) {
  stateObj = immer.produce(stateObj, draft => {
          const lowestIndex = draft.playerShip.fuelTank.findIndex(value => value === Math.min(...draft.playerShip.fuelTank))
          if (lowestIndex !== -1) {
              draft.playerShip.fuelTank[lowestIndex] = upgradeLevel
              draft.fuelTankMax = calculateMaxFuel(draft, draft.playerShip.fuelTank)
              draft.choosingRoulette = false
      }
  })
  stateObj = await changeState(stateObj)
  return stateObj
}

async function upgradeHullArmor(stateObj, upgradeLevel) {
  let gemType = getGemTypeForUpgrade(upgradeLevel).toLowerCase()
  let cost = 5  // Fixed cost of 5 gems
  
  stateObj = immer.produce(stateObj, draft => {
      if (draft[`${gemType}Inventory`] >= cost) {
        const lowestIndex = draft.playerShip.hullArmorPlating.findIndex(value => value === Math.min(...draft.playerShip.hullArmorPlating))
          if (lowestIndex !== -1) {
              draft.playerShip.hullArmorPlating[lowestIndex] = upgradeLevel
              draft[`${gemType}Inventory`] -= cost
              draft.currentInventory -= cost
              draft.hullArmorMax = calculateMaxHullArmor(draft, draft.playerShip.hullArmorPlating)
              draft.currentHullArmor = Math.min(draft.currentHullArmor + 20, draft.hullArmorMax)  // Increase armor, but don't exceed max
          }
      }
  })
  stateObj = changeState(stateObj)
  return stateObj
}

async function upgradeHullRoulette(stateObj, upgradeLevel) {
  stateObj = immer.produce(stateObj, draft => {
        const lowestIndex = draft.playerShip.hullArmorPlating.findIndex(value => value === Math.min(...draft.playerShip.hullArmorPlating))
          if (lowestIndex !== -1) {
              draft.playerShip.hullArmorPlating[lowestIndex] = upgradeLevel
              draft.hullArmorMax = calculateMaxHullArmor(draft, draft.playerShip.hullArmorPlating)
              draft.choosingRoulette = false
      }
  })
  stateObj = changeState(stateObj)
  return stateObj
}

function getGemTypeForUpgrade(upgradeLevel) {
  switch(upgradeLevel) {
      case 1: return "Bronze"
      case 2: return "Silver"
      case 3: return "Gold"
      case 4: return "Ruby"
      default: return "Bronze"
  }
}

function calculateMaxFuel(stateObj, fuelTankArray) {
  return stateObj.fuelTankMax + fuelTankArray.reduce((total, level) => {
    switch(level) {
      case 1:
        return total + (5 * stateObj.overallFuelModifier);
      case 2:
        return total + (10 * stateObj.overallFuelModifier);
      case 3:
        return total + (20 * stateObj.overallFuelModifier);
      case 4:
        return total + (30 * stateObj.overallFuelModifier);
      default:
        return total;
    }
  }, 0);
}

function calculateMaxHullArmor(stateObj, fuelTankArray) {
  return stateObj.hullArmorMax + fuelTankArray.reduce((total, level) => {
    switch(level) {
      case 1:
        return total + (5 * stateObj.overallHullModifier);
      case 2:
        return total + (10 * stateObj.overallHullModifier);
      case 3:
        return total + (20 * stateObj.overallHullModifier);
      case 4:
        return total + (30 * stateObj.overallHullModifier);
      default:
        return total;
    }
  }, 0);
}

async function upgradeBomb(stateObj) {
  let upgradeLevel = stateObj.playerShip.bombLevel + 1
  let gemType = getGemTypeForWeaponUpgrade(upgradeLevel).toLowerCase()
  let cost = getWeaponUpgradeCost(upgradeLevel)
  
  return immer.produce(stateObj, draft => {
      if (draft[`${gemType}Inventory`] >= cost) {
          draft.playerShip.bombLevel++
          draft[`${gemType}Inventory`] -= cost
          draft.currentInventory -= cost
          draft.bombCurrentTotal++
          draft.bombCapacity++
      }
  })
}

function createWeaponUpgradeOption(stateObj, weaponName, currentLevel, upgradeFunc) {
  let upgradeDiv = document.createElement("Div")
  upgradeDiv.classList.add("store-option")
  
  let gemType = getGemTypeForWeaponUpgrade(currentLevel + 1)
  let gemCount = getWeaponUpgradeCost(currentLevel + 1)
  
  let upgradeText = document.createElement("Div")
  upgradeText.textContent = `Upgrade ${weaponName} (Level ${currentLevel + 1})`
  
  let costText = document.createElement("Div")
  costText.textContent = `Cost: ${gemCount} ${gemType}`
  
  upgradeDiv.append(upgradeText, costText)
  
  if (stateObj[`${gemType.toLowerCase()}Inventory`] >= gemCount) {
      upgradeDiv.classList.add("store-clickable")
      upgradeDiv.onclick = () => upgradeFunc(stateObj)
  }
  
  return upgradeDiv
}

function getUpgradeCost(upgradeLevel) {
  return 5  // This can be adjusted based on game balance
}

function getGemTypeForWeaponUpgrade(upgradeLevel) {
  if (upgradeLevel <= 2) return "Silver"
  if (upgradeLevel <= 4) return "Gold"
  return "Ruby"
}

function getWeaponUpgradeCost(upgradeLevel) {
  return 10  // This can be adjusted based on game balance
}
  
