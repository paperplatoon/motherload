let gameStartState = {
    gameMap: [],

    currentFuel: 100,
    fuelCapacity: 120,
    fuelUpgrades: 0,
    fuelUpgradeCost: 500,
    

    currentInventory: 0,
    inventoryMax: 12,
    inventoryUpgrades: 0,
    inventoryUpgradeCost: 500,
    

    bankedCash: 100,
    inventoryCash: 0, 
    
    numberLasers: 0,
    laserCapacity: 1,
    laserCost: 200,
    laserUpgradeCost: 1000,

    drillTime: 450,

    //states
    currentPosition: false,
    inStore: false,
    inTransition: false,  
    
    currentHullIntegrity: 100,
    maxHullIntegrity: 100,
    hullUpgradeCost: 1000,


}

fuelCapacityUpgrades = [50, 60, 70, 80, 90, 100, 110, 120, 150, 200]
inventoryMaxUpgrades = [5, 8, 12, 17, 23, 30, 38, 47, 57]


let state = {...gameStartState}

let screenwidthBlocks = 24; 

let introBlockSquare = 8
let middleBlockSquare = 30
let totalSquareNumber = introBlockSquare + middleBlockSquare + middleBlockSquare + middleBlockSquare

//TO-DO
//change the state when the player "clears" a square; decrease  the fuel
//check so the player can't move if out of fuel
//if the player moves into a gem, change inventory AND clear the square
//edit scroll logic so it only triggers once player is at LEAST three squares up or down


//takes a state object, changes the "state" to be that, and renders the screen
async function changeState(newStateObj) {
    state = {...newStateObj};
    await renderScreen(state);


}

async function renderTopBarStats(stateObj) {
    let topBarDiv = document.createElement("Div")
    topBarDiv.classList.add("top-stats-bar")

    let fuelDiv = document.createElement("Div")
    fuelDiv.textContent = "Max Fuel: " + stateObj.fuelCapacity;

    let emptyFuelBarDiv = document.createElement("Div");
    emptyFuelBarDiv.classList.add("empty-fuel-bar");
    let currentFuelBarDiv = document.createElement("Div");
    currentFuelBarDiv.classList.add("current-fuel-bar");
    
    
    let barLength = 10*(stateObj.currentFuel/stateObj.fuelCapacity)
    let barText = "width:" + barLength + "vw"

    currentFuelBarDiv.setAttribute("style", barText);
    emptyFuelBarDiv.append(currentFuelBarDiv);
    fuelDiv.appendChild(emptyFuelBarDiv)
    topBarDiv.appendChild(fuelDiv)

    let hullDiv = document.createElement("Div")
    hullDiv.textContent = "Hull Integrity: " + stateObj.currentHullIntegrity + "/" + stateObj.maxHullIntegrity
    

    let cashDiv = document.createElement("Div")
    cashDiv.textContent = "Available Funds: " + stateObj.bankedCash
    
    let inventoryDiv = document.createElement("Div")
    inventoryDiv.classList.add("inventory")
    if (stateObj.currentInventory === stateObj.inventoryMax) {
        inventoryDiv.textContent = "Inventory Full"
        inventoryDiv.classList.add("inventory-full")
    } else {
        inventoryDiv.textContent = "Inventory: " + Math.round((stateObj.currentInventory / stateObj.inventoryMax)*100) + "% full    (Max: " + stateObj.inventoryMax + ")"
    }

    let lasersDiv = document.createElement("Div")
    lasersDiv.textContent = "Lasers: " + stateObj.numberLasers + "/" + stateObj.laserCapacity

    topBarDiv.append(fuelDiv, cashDiv, hullDiv, lasersDiv, inventoryDiv)

    return topBarDiv
}

function createArrayBlocks(numberRows, hasEnemies=true, discount=0) {
            
}

//takes a stateObj, and if the gameMap is not created, creates it
async function fillMapWithArray(stateObj) {
    console.log("filling the Map")
    if (stateObj.gameMap.length === 0) {
        tempArray = ["STORE"];
        for (let i=0; i<screenwidthBlocks-1; i++ ) {
            tempArray.push("empty")
        };
        //first 12 * 36 squares
        for (let i=0; i < screenwidthBlocks*introBlockSquare; i++) {
            let randomNumber = Math.random()
        
            if (randomNumber > 0.98) {
                tempArray.push("3")
            } else if (randomNumber > 0.93) {
                tempArray.push("2")
            } else if (randomNumber > 0.75) {
                tempArray.push("1")
            } else if (randomNumber > 0.60) {
                tempArray.push("empty")
            } else {
                tempArray.push("0")
            }
        }

        for (let j=0; j < screenwidthBlocks*middleBlockSquare; j++) {
            let randomNumber = Math.random()
            
            const isEnemy = Math.random()
            if (isEnemy > 0.99) {
                randomNumber = 0.221
            }
            if (randomNumber > 0.99) {
                tempArray.push("4")
            } else if (randomNumber > 0.95) {
                tempArray.push("3")
            } else if (randomNumber > 0.88) {
                tempArray.push("2")
            } else if (randomNumber > 0.75) {
                tempArray.push("1")
            } else if (randomNumber > 0.65) {
                tempArray.push("empty")
            } else if (randomNumber == 0.221) {
                tempArray.push("enemy")
            }  else {
                tempArray.push("0")
            }
        }

        for (let j=0; j < screenwidthBlocks*middleBlockSquare; j++) {
            let randomNumber = Math.random()
            
            const isEnemy = Math.random()
            if (isEnemy > 0.96) {
                randomNumber = 0.221
            }
            if (randomNumber > 0.995) {
                tempArray.push("5")
            } else if (randomNumber > 0.97) {
                tempArray.push("4")
            } else if (randomNumber > 0.915) {
                tempArray.push("3")
            } else if (randomNumber > 0.75) {
                tempArray.push("2")
            } else if (randomNumber > 0.70) {
                tempArray.push("1")
            } else if (randomNumber == 0.221) {
                tempArray.push("enemy")
            } else if (randomNumber > 0.60) {
                tempArray.push("empty")
            } else {
                tempArray.push("0")
            }
        }

        for (let j=0; j < screenwidthBlocks*middleBlockSquare; j++) {
            let randomNumber = Math.random()
            
            const isEnemy = Math.random()
            if (isEnemy > 0.96) {
                randomNumber = 0.221
            }
            if (randomNumber > 0.98) {
                tempArray.push("5")
            } else if (randomNumber > 0.955) {
                tempArray.push("4")
            } else if (randomNumber > 0.87) {
                tempArray.push("3")
            } else if (randomNumber > 0.77) {
                tempArray.push("2")
            } else if (randomNumber > 0.72) {
                tempArray.push("1")
            } else if (randomNumber == 0.221) {
                tempArray.push("enemy")
            } else if (randomNumber > 0.64) {
                tempArray.push("empty")
            } else {
                tempArray.push("0")
            }
        }

        stateObj.gameMap = tempArray;

        if (stateObj.currentPosition === false) {
            stateObj.currentPosition = 1 + Math.floor(Math.random() * 7)
            stateObj.gameMap[stateObj.currentPosition] = "empty"
        }
    }
    // console.log(stateObj.gameMap)
    console.log(stateObj.currentPosition)
    return stateObj
}

//renders all the map squares. 
//To-DO: Need to set values for mapDiv and each map-square, including elements
async function renderScreen(stateObj) {
    //console.log("rendering Screen")
    if (stateObj.gameMap.length === 0) {
        console.log("calling fillMap function")
        stateObj = await fillMapWithArray(stateObj)
    }

    document.getElementById("app").innerHTML = ""
    //create a mapDiv to append all your new squares to
    topBar = await renderTopBarStats(stateObj);
    document.getElementById("app").append(topBar)

    if (stateObj.inStore === false) {
        let mapDiv = document.createElement("Div");
        mapDiv.classList.add("map-div");

        stateObj.gameMap.forEach(async function (mapSquare, squareIndex) {
            let mapSquareDiv = document.createElement("Div");
            mapSquareDiv.classList.add("map-square");

            if (stateObj.currentPosition === squareIndex) {
                mapSquareDiv.classList.add("player-here")
            }
            
            if (mapSquare === "0") {
                mapSquareDiv.classList.add("dirt")
            } else if (mapSquare === "empty") {
                mapSquareDiv.classList.add("empty")
            } else if (mapSquare === "enemy") {
                mapSquareDiv.classList.add("enemy")
            } else if (mapSquare === "1") {
                mapSquareDiv.classList.add("bronze")
            } else if (mapSquare === "2") {
                mapSquareDiv.classList.add("silver")
            } else if (mapSquare === "3") {
                mapSquareDiv.classList.add("gold")
            }  else if (mapSquare === "4") {
                mapSquareDiv.classList.add("platinum")
            } else if (mapSquare === "5") {
                mapSquareDiv.classList.add("amethyst")
            } else if (mapSquare === "STORE") {
                mapSquareDiv.classList.add("store")
                mapSquareDiv.textContent = "Store"
            }

            mapDiv.append(mapSquareDiv)
        })
        document.getElementById("app").append(mapDiv)
    } else {
        console.log("in store")
        console.log("fuel upgrade " +stateObj.fuelUpgradeCost )
        let storeDiv = document.createElement("Div")
        storeDiv.classList.add("store-div")

        let fuelUpgradeDiv = document.createElement("Div")
        fuelUpgradeDiv.classList.add("store-option")
        fuelUpgradeDiv.classList.add("fuel-store")
        fuelUpgradeDiv.textContent = "Fuel Capacity Upgrade: " + stateObj.fuelUpgradeCost + " gold"
        if (stateObj.bankedCash >= stateObj.fuelUpgradeCost) {
            fuelUpgradeDiv.classList.add("store-clickable")
            fuelUpgradeDiv.onclick = function () {
                upgradeFuel(stateObj)
            }
          }

        let laserUpgradeDiv = document.createElement("Div")
        laserUpgradeDiv.classList.add("store-option")
        laserUpgradeDiv.classList.add("laser-upgrade-store")
        laserUpgradeDiv.textContent = "Laser Capacity Upgrade: " + stateObj.laserUpgradeCost + " gold"
        if (stateObj.bankedCash >= stateObj.laserUpgradeCost) {
            laserUpgradeDiv.classList.add("store-clickable")
            laserUpgradeDiv.onclick = function () {
                laserUpgrade(stateObj)
            }
          }

        let fillFuelDiv = document.createElement("Div")
        let missingFuel = stateObj.fuelCapacity-stateObj.currentFuel
        if (missingFuel > 0) {
            fillFuelDiv.classList.add("store-option")
            fillFuelDiv.classList.add("fill-fuel")
            
            if (missingFuel > stateObj.bankedCash) {
                fillFuelDiv.textContent = "Spend all gold on fuel: " + Math.ceil(stateObj.bankedCash) + " gold"
            } else {
                fillFuelDiv.textContent = "Refill fuel: " + Math.ceil(missingFuel) + " gold"
            }
            fillFuelDiv.classList.add("store-clickable")
            
            fillFuelDiv.onclick = function () {
                    fillFuel(stateObj)
            }
        }
        

        let repairDiv = document.createElement("Div")
        let missingHull = stateObj.maxHullIntegrity-stateObj.currentHullIntegrity
        if (missingHull > 0) {
            repairDiv.classList.add("store-option")
            repairDiv.classList.add("repair-hull")
            if ((missingHull*5) > stateObj.bankedCash) {
                repairDiv.textContent = "Spend all gold on repair: " + Math.ceil(stateObj.bankedCash) + " gold"
            } else {
                repairDiv.textContent = "Repair hull fully: " + Math.ceil(missingHull*5) + " gold"
            }
            repairDiv.classList.add("store-clickable")
            
            repairDiv.onclick = function () {
                    repairHull(stateObj)
        }
        }
        


        let inventoryUpgradeDiv = document.createElement("Div")
        inventoryUpgradeDiv.classList.add("store-option")
        inventoryUpgradeDiv.textContent = "Inventory Size Upgrade: " + stateObj.inventoryUpgradeCost + " gold"
        if (stateObj.bankedCash >= stateObj.inventoryUpgradeCost) {
            inventoryUpgradeDiv.classList.add("store-clickable")
            inventoryUpgradeDiv.onclick = function () {
                upgradeInventory(stateObj)
            }
        }

        let hullUpgradeDiv = document.createElement("Div")
        hullUpgradeDiv.classList.add("store-option")
        hullUpgradeDiv.textContent = "Upgrade Hull Integrity: " + stateObj.hullUpgradeCost + " gold"
        if (stateObj.bankedCash >= stateObj.hullUpgradeCost) {
            inventoryUpgradeDiv.classList.add("store-clickable")
            inventoryUpgradeDiv.onclick = function () {
                upgradeHull(stateObj)
            }
        }

        let buyLaserDiv = document.createElement("Div")
        if (stateObj.numberLasers < stateObj.laserCapacity) {
            buyLaserDiv.classList.add("store-option")
            buyLaserDiv.textContent = "Buy 1 laser: " + stateObj.laserCost + " gold"
            buyLaserDiv.onclick = function () {
            }
            if (stateObj.bankedCash >= stateObj.laserCost) {
                buyLaserDiv.classList.add("store-clickable")
                buyLaserDiv.onclick = function () {
                    buyLaser(stateObj)
                }
            }
        }
        
    
        let buyNothingDiv = document.createElement("Div")
        buyNothingDiv.classList.add("store-option")
        buyNothingDiv.classList.add("return-to-map")
        buyNothingDiv.textContent = "Return to Map"
        buyNothingDiv.onclick = function () {
            console.log("clicked buy nothing")
            leaveStore(stateObj)
          }

        storeDiv.append(fillFuelDiv, repairDiv, buyLaserDiv, fuelUpgradeDiv, inventoryUpgradeDiv, hullUpgradeDiv, laserUpgradeDiv, buyNothingDiv)


        let testDiv = document.createElement("Div")
        document.getElementById("app").append(storeDiv)
    }
}

async function leaveStore(stateObj) {
    stateObj.inStore = false;
    await changeState(stateObj);
}

async function fillFuel(stateObj) {
    let missingFuel = stateObj.fuelCapacity - stateObj.currentFuel
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingFuel > 0) {
            if (newState.bankedCash > missingFuel) {
                newState.currentFuel += missingFuel;
                newState.bankedCash -= Math.ceil(missingFuel)
            } else {
                newState.currentFuel += Math.ceil(newState.bankedCash);
                newState.bankedCash = 0;    
            }
        }
    })
    await changeState(stateObj);
}

async function repairHull(stateObj) {
    let missingHull = stateObj.maxHullIntegrity - stateObj.currentHullIntegrity
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingHull > 0) {
            if (newState.bankedCash > (missingHull*5)) {
                newState.currentHullIntegrity = newState.maxHullIntegrity ;
                newState.bankedCash -= Math.ceil(missingHull*5)
            } else {
                newState.currentHull += Math.ceil(newState.bankedCash/5);
                newState.bankedCash = 0;    
            }
        }
    })
    await changeState(stateObj);
}

async function laserUpgrade(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.laserCapacity += 1;
        newState.numberLasers += 1;
        newState.bankedCash -= stateObj.laserUpgradeCost
        newState.laserUpgradeCost += 1000;
    })
    await changeState(stateObj);
}

async function upgradeFuel(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.fuelCapacity += 50;
        newState.currentFuel += 50;
        newState.fuelUpgrades +=1;
        newState.bankedCash -= stateObj.fuelUpgradeCost
        newState.fuelUpgradeCost += 500;

    })
    await changeState(stateObj);
}

async function upgradeInventory(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.inventoryMax += 6;
        newState.inventoryUpgrades +=1;
        newState.bankedCash -= stateObj.inventoryUpgradeCost
        newState.inventoryUpgradeCost += 500;

    })
    await changeState(stateObj);
}

async function upgradeHull(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.maxHullIntegrity += 50;
        newState.currentHullIntegrity +=50;
        newState.bankedCash -= stateObj.hullUpgradeCost
        newState.hullUpgradeCost += 1000;

    })
    await changeState(stateObj);
}

async function buyLaser(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.numberLasers += 1;
        newState.bankedCash -= stateObj.laserCost
    })
    await changeState(stateObj);
}



renderScreen(state)



//listen for key presses
document.addEventListener('keydown', async function(event) {
    let stateObj = {...state};
    let viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    let currentHeight = Math.floor(stateObj.currentPosition/screenwidthBlocks)
    let currentWidth = Math.floor(stateObj.currentPosition % screenwidthBlocks)
    let scrollHeight = Math.floor(viewportHeight * 0.1);
    let scrollWidth = Math.floor(viewportWidth * 0.1);
    if (stateObj.inTransition === false) {
        if (event.key === 'ArrowUp') {
            // Execute your function for the up arrow key
            stateObj = await UpArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowDown') {
            // Execute your function for the down arrow key
            stateObj = await DownArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowLeft') {
            // Execute your function for the left arrow key
            stateObj = await LeftArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowRight') {
            // Execute your function for the right arrow key
            stateObj = await RightArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === "l") {
              if (stateObj.numberLasers > 0) {
                  stateObj = await fireLaser(stateObj)
                  await changeState(stateObj)
              }
          }
    }
  });

async function checkForDeath(stateObj) {
    if (stateObj.currentFuel < 0) {
        await loseTheGame("You've run out of fuel!");
    }

    console.log("current position " + stateObj.currentPosition)

    if (stateObj.gameMap[stateObj.currentPosition-1] === "enemy" && stateObj.currentPosition % screenwidthBlocks !== 0) {
        stateObj = await doDamage(stateObj, 50)
    } else if (stateObj.gameMap[stateObj.currentPosition+1] === "enemy" && (stateObj.currentPosition-15) % screenwidthBlocks !== 0) {
        stateObj = await doDamage(stateObj, 50)
    } else if (stateObj.gameMap[stateObj.currentPosition+screenwidthBlocks] === "enemy") {
        stateObj = await doDamage(stateObj, 50)
    } else if (stateObj.gameMap[stateObj.currentPosition-screenwidthBlocks] === "enemy") {
        stateObj = await doDamage(stateObj, 50)
    }

    changeState(stateObj)

    if (stateObj.currentHullIntegrity <= 0) {
        await loseTheGame("Your miner took too much damage and exploded!");
    }
}

async function doDamage(stateObj, damageAmount) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentHullIntegrity -= damageAmount;
    })
    return stateObj
}

async function LeftArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {   
    //make sure not drilling while in midair
    if (stateObj.gameMap[stateObj.currentPosition - 1] === "STORE") {
        stateObj = await calculateMoveChange(stateObj, -1)
    }
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition - 1] !== "empty") {
        return stateObj
    } 

    //make sure not on left side 
    
    if (stateObj.currentPosition % screenwidthBlocks !== 0 ) {
        window.scrollTo(currentWidth*scrollWidth- (scrollWidth*4), currentHeight*scrollHeight)
        stateObj = await calculateMoveChange(stateObj, -1)
    }

    return stateObj
}

//7, 15, 23
async function RightArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    //do nothing if you're in the air and space to your left isn't air
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition + 1] !== "empty") {
        return stateObj
    } else {
        //only execute if not already on right side
        if ((stateObj.currentPosition+1) % screenwidthBlocks !== 0) {
            stateObj = await calculateMoveChange(stateObj, 1)
            window.scrollTo(currentWidth*scrollWidth- (scrollWidth*3), currentHeight*scrollHeight)
            //stateObj.currentPosition += 1;
        }
    }
    return stateObj
}

//calculate move change takes stateObj & direction
//checkIfCanMove does all the calculations to see if you CAN move there
//check target square figures out 

async function UpArrow(stateObj) {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const scrollAmount = Math.floor(viewportHeight * 0.04);
    if (stateObj.currentPosition > 7 && stateObj.gameMap[stateObj.currentPosition - screenwidthBlocks]=== "empty") {
        window.scrollTo(window.pageXOffset, window.pageYOffset - scrollAmount)
        stateObj = await calculateMoveChange(stateObj, -screenwidthBlocks)
        stateObj = immer.produce(stateObj, (newState) => {
            newState.currentFuel -= 0.25;
        })
        
    }
    return stateObj
}

async function DownArrow(stateObj) {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const scrollAmount = Math.floor(viewportHeight * 0.04);
    if (stateObj.currentPosition < (screenwidthBlocks * totalSquareNumber)) {
        window.scrollTo(window.pageXOffset, window.pageYOffset + scrollAmount)
        stateObj = await calculateMoveChange(stateObj, screenwidthBlocks)
    }
    return stateObj
}

async function calculateMoveChange(stateObj, squaresToMove) {
    targetSquareNum = stateObj.currentPosition + squaresToMove

    targetSquare = stateObj.gameMap[targetSquareNum];

    //check if target square has an enemy nearby
    

    
    if (targetSquare === "0") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime/2)
            
    } else if (targetSquare === "1") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 25, stateObj.drillTime)
    } else if (targetSquare === "2") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 50, stateObj.drillTime)
    } else if (targetSquare === "3") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 125, stateObj.drillTime)
    } else if (targetSquare === "4") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 300, stateObj.drillTime)
    } else if (targetSquare === "5") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 750, stateObj.drillTime)
    } else if (targetSquare === "empty") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 1, 0)
    } else if (targetSquare === "enemy") {
        await loseTheGame("You crashed into an enemy and both of you exploded! ")
        stateObj = await handleSquare(stateObj, targetSquareNum, 1, 0)
    } else if (targetSquare === "STORE") {
        stateObj = await seeStore(stateObj)
    } else {
        console.log("target square hasn't been handled yet")
    }

    if (targetSquare !== "empty" && targetSquare !== "STORE") {
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.gameMap[targetSquareNum] = "empty"
        })
        
    }


    return stateObj
}

function pause(timeValue) {
    return new Promise(res => setTimeout(res, timeValue))
  }

async function seeStore(stateObj) {
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.bankedCash += newState.inventoryCash;
        newState.inventoryCash = 0;
        newState.currentInventory = 0;

        newState.inStore = true;
    })
     
    return stateObj
}

async function handleSquare(stateObj, squareIndexToMoveTo, fuelToLose, goldToGain, pauseDuration=0) {
    let oldPosition = stateObj.currentPosition
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentFuel -= fuelToLose;
        newState.currentPosition = squareIndexToMoveTo;

        if (goldToGain > 0) {
            if (newState.currentInventory < newState.inventoryMax) {
                newState.inventoryCash += goldToGain;
                newState.currentInventory += 1;
            } else {
                console.log("inventory is full")
            }
        }    
    }) 
    if (pauseDuration > 0) {
        state.inTransition = true;
        document.querySelectorAll(".map-square")[stateObj.currentPosition].classList.add("change-empty")
        await pause(pauseDuration)   
        document.querySelectorAll(".map-square")[stateObj.currentPosition].classList.remove("change-empty")
        stateObj = immer.produce(stateObj, (newState) => {
            newState.inTransition = false;
        })    
    }
    return stateObj
}

async function loseTheGame(textString) {
    let confirmText = textString + ` Click OK to try again`
    var confirmation = confirm(confirmText);

  if (confirmation) {
    location.reload();
  }
}

async function fireLaser(stateObj) {
    //
    let leftBlocksToBlast = 0;
    if ((stateObj.currentPosition-1) % screenwidthBlocks === 0 ) {
        leftBlocksToBlast = 1;
    } else if (stateObj.currentPosition % screenwidthBlocks !== 0 ) {
        leftBlocksToBlast = 2;
    }

    let rightBlocksToBlast = 0;
    if ((stateObj.currentPosition+2) % screenwidthBlocks === 0) {
        rightBlocksToBlast = 1;
    } else if ((stateObj.currentPosition+1) % screenwidthBlocks !== 0) {
        rightBlocksToBlast = 2;
    }
    stateObj = immer.produce(stateObj, (newState) => {
        if (leftBlocksToBlast > 0) {
            newState.gameMap[newState.currentPosition - 1] = "empty"
        }
        if (leftBlocksToBlast >= 2) {
            newState.gameMap[newState.currentPosition - 2] = "empty"
        }

        if (rightBlocksToBlast > 0) {
            newState.gameMap[newState.currentPosition + 1] = "empty"
        }
        if (rightBlocksToBlast >= 2) {
            newState.gameMap[newState.currentPosition + 2] = "empty"
        }

        newState.numberLasers -= 1;
    })

    

    console.log("left blocks: " + leftBlocksToBlast)
    console.log("right blocks: " + rightBlocksToBlast)

    return stateObj
  
}