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

    enemyArray: [],
    enemyMovementArray:[]


}

fuelCapacityUpgrades = [50, 60, 70, 80, 90, 100, 110, 120, 150, 200]
inventoryMaxUpgrades = [5, 8, 12, 17, 23, 30, 38, 47, 57]


let state = {...gameStartState}

let screenwidthBlocks = 10; 

let introBlockSquare = 8
let middleBlockSquare = 20
let totalSquareNumber = screenwidthBlocks * middleBlockSquare
//let totalSquareNumber = introBlockSquare + middleBlockSquare + middleBlockSquare + middleBlockSquare

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

function ProduceBlockSquares(arrayObj, numberRows, emptybar, bar1, bar2, bar3, bar4=1, bar5=1, bar6=1, bar7=1, enemyBar=1, isRelic=false) {
    let chosenSquare = 50000
    let stateObj = {...state}
    if (isRelic === true) {
        chosenSquare = Math.floor(Math.random() * screenwidthBlocks*numberRows);
    }
    
    let nextSquareEmpty = false;
    for (let j=10; j < (screenwidthBlocks*numberRows) + 10; j++) {
        if (j === chosenSquare) {
            arrayObj.push("fuelRelic")
        } else if (nextSquareEmpty === true){
            arrayObj.push("empty")
            nextSquareEmpty = false
        } else {
            let randomNumber = Math.random() 
            const isEnemy = Math.random()
            if (isEnemy > enemyBar && (j % screenwidthBlocks !== 0) && ((j+1) % screenwidthBlocks !== 0) && j-1 !== chosenSquare) {
                arrayObj.pop()
                arrayObj.push("empty")
                arrayObj.push("enemy")
                const randOne = Math.random()
                const direction = (randOne > 0.5) ? "left" : "right"; 
                state.enemyArray.push(j)
                state.enemyMovementArray.push(direction)
                nextSquareEmpty = true;
            } else {
                if (randomNumber > bar7) {
                    arrayObj.push("7")
                } else if (randomNumber > bar6) {
                    arrayObj.push("6")
                } else if (randomNumber > bar5) {
                    arrayObj.push("5")
                } else if (randomNumber > bar4) {
                    arrayObj.push("4")
                } else if (randomNumber > bar3) {
                    arrayObj.push("3")
                } else if (randomNumber > bar2) {
                    arrayObj.push("2")
                } else if (randomNumber > bar1) {
                    arrayObj.push("1")
                } else if (randomNumber == 0.221) {
                    arrayObj.push("enemy")
                } else if (randomNumber > emptybar) {
                    arrayObj.push("empty")
                } else {
                    arrayObj.push("0")
                }
            }
        }  
    }
    console.log("produce squares array enemy length is " + state.enemyMovementArray.length)
    return arrayObj
}



//takes a stateObj, and if the gameMap is not created, creates it
async function fillMapWithArray(stateObj) {
    console.log("filling the Map")
    if (stateObj.gameMap.length === 0) {
        tempArray = ["STORE"];
        for (let i=0; i<screenwidthBlocks-1; i++ ) {
            tempArray.push("empty")
        };
        // first 12 * 36 squares
        tempArray = ProduceBlockSquares(tempArray, middleBlockSquare, 0.6, 0.75, 0.93, 0.98, bar4=1, bar5=1, bar6=1, bar7=1, enemyBar=0.94, isRelic=false)
        // tempArray = ProduceBlockSquares(tempArray, introBlockSquare, 0.6, 0.75, 0.93, 0.98, bar4=1, bar5=1, bar6=1, bar7=1, enemyBar=1, isRelic=false)
        // tempArray = ProduceBlockSquares(tempArray, middleBlockSquare, 0.65, 0.75, 0.88, 0.95, bar4=0.99, bar5=1, bar6=1, bar7=1, enemyBar=0.99, isRelic=true)
        // tempArray = ProduceBlockSquares(tempArray, middleBlockSquare, 0.64, 0.72, 0.77, 0.87, bar4=0.955, bar5=98, bar6=1, bar7=1, enemyBar=0.96, isRelic=true)

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

async function timeStuff() {
    setInterval(moveEnemies, 500); // 500 milliseconds (half a second)
}

timeStuff();

async function moveEnemies() {
    let stateObj = {...state}
    console.log("number of enemies is " + stateObj.enemyMovementArray.length)
    console.log("enemy positions are " + stateObj.enemyArray)
    for (let i=0; i < stateObj.enemyArray.length; i++) {
        let k = stateObj.enemyArray[i]
        if (stateObj.enemyMovementArray[i] === "left") {
                if (k % screenwidthBlocks !== 0 && stateObj.gameMap[k-1] === "empty") {
                    console.log("enemy  " + i + " moving left at position " + k + ", now " + k-1)
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.gameMap[k-1] = "enemy";
                        newState.gameMap[k] = "empty";
                        newState.enemyArray[i] -= 1
                    })
                } else {
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.enemyMovementArray[i] = "right";
                    })
                    console.log("enemy  " + i + " switching to right at position " + k)
                }
        } else {
                if ((k+1) % screenwidthBlocks !== 0 && stateObj.gameMap[k+1] === "empty") {
                    console.log("enemy  " + i + " moving right at position " + k + ", now " + k+1)
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.gameMap[k+1] = "enemy";
                        newState.gameMap[k] = "empty";
                        newState.enemyArray[i] += 1
                    })
                } else {
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.enemyMovementArray[i] = "left";
                    })
                    console.log("enemy  " + i + " switching to left at position " + k)
                }   
            }
            // if (randomNumber > 0.5) {
            //     if (i % screenwidthBlocks !== 0 && (i+1) % screenwidthBlocks !== 0) {
            //         stateObj = immer.produce(stateObj, (newState) => {
            //             newState.gameMap[i]
            //         })
            //     }
            // }
        }
    await changeState(stateObj)
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
            } else if (mapSquare === "fuelRelic") {
                mapSquareDiv.classList.add("fuel-relic")
                mapSquareDiv.textContent = "Fuel ++"
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
        let missingFuel = Math.floor((stateObj.fuelCapacity-stateObj.currentFuel)/2)
        if (missingFuel > 0) {
            fillFuelDiv.classList.add("store-option")
            fillFuelDiv.classList.add("fill-fuel")
            
            if (Math.floor(missingFuel/2) > stateObj.bankedCash) {
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
            hullUpgradeDiv.classList.add("store-clickable")
            hullUpgradeDiv.onclick = function () {
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
    let missingFuelValue = Math.floor((stateObj.fuelCapacity - stateObj.currentFuel)/2)
    stateObj = immer.produce(stateObj, (newState) => {
        if (missingFuel > 0) {
            if (newState.bankedCash > missingFuelValue) {
                newState.currentFuel += missingFuel;
                newState.bankedCash -= missingFuelValue
            } else {
                newState.currentFuel += Math.ceil(newState.bankedCash*2);
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

async function upgradeFuelRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.fuelCapacity += 80;
        newState.currentFuel += 80;
        newState.fuelUpgrades +=1;

    })
    await changeState(stateObj);
    return stateObj
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
        if (event.key === 'ArrowUp' || event.key ==="w") {
            // Execute your function for the up arrow key
            stateObj = await UpArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowDown' || event.key ==="s") {
            // Execute your function for the down arrow key
            stateObj = await DownArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowLeft' || event.key ==="a") {
            // Execute your function for the left arrow key
            stateObj = await LeftArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth);
            await changeState(stateObj)
            await checkForDeath(stateObj)
          } else if (event.key === 'ArrowRight' || event.key ==="d") {
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
        window.scrollTo(currentWidth*scrollWidth- (scrollWidth*4), currentHeight*scrollHeight - (scrollHeight*2))
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
            window.scrollTo(currentWidth*scrollWidth- (scrollWidth*2), currentHeight*scrollHeight - (scrollHeight*2))
            //stateObj.currentPosition += 1;
        }
    }
    return stateObj
}

//calculate move change takes stateObj & direction
//checkIfCanMove does all the calculations to see if you CAN move there
//check target square figures out 

async function UpArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    if (stateObj.currentPosition > 7 && stateObj.gameMap[stateObj.currentPosition - screenwidthBlocks]=== "empty") {
        window.scrollTo(currentWidth*scrollWidth- (scrollWidth*3), currentHeight*scrollHeight - (scrollHeight*2))
        stateObj = await calculateMoveChange(stateObj, -screenwidthBlocks)
        stateObj = immer.produce(stateObj, (newState) => {
            newState.currentFuel -= 0.25;
        })
        
    }
    return stateObj
}

async function DownArrow(stateObj, currentHeight, currentWidth, scrollHeight, scrollWidth) {
    if (stateObj.currentPosition < (screenwidthBlocks * totalSquareNumber)) {
        window.scrollTo(currentWidth*scrollWidth- (scrollWidth*3), currentHeight*scrollHeight - (scrollHeight))
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
    } else if (targetSquare === "fuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeFuelRelic(stateObj)
        
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