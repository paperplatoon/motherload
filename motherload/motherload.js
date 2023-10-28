

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
    laserDistance: 2,

    drillTime: 850,
    timeCounter: 0,

    //states
    currentPosition: false,
    inStore: false,
    inTransition: false,  
    
    currentHullIntegrity: 100,
    maxHullIntegrity: 100,
    hullUpgradeCost: 1000,

    dirtReserves: 0,
    dirtThresholdNeeded: 25,

    enemyArray: [],
    enemyMovementArray:[],

    bombLocation: false,
    bombTimer: false,
    bombCapacity: 1,
    bombCurrentTotal: 1,
    bombUpgradeCost: 1000,
    bombDistance: 2,
    bombCost: 200,


    currentLevel: 0,
    floorValues: [
        {
            barVals: [1, 1, 1, 0.997, 0.99, 0.9, 0.65],
            enemyValue: 0.965,
            numberRows: 20,
            hasRelic: false,
            floorNumber: 0
        },
        {
            barVals: [1, 0.999, 0.997, 0.99, 0.95, 0.80, 0.65],
            enemyValue: 0.95,
            numberRows: 20,
            hasRelic: false,
            floorNumber: 1
        },
        {
            barVals: [1, 0.997, 0.99, 0.95, 0.85, 0.75, 0.7],
            enemyValue: 0.93,
            numberRows: 20,
            hasRelic: true,
            floorNumber: 2
        },
        {
            barVals: [0.999, 0.99, 0.96, 0.9, 0.8, 0.72, 0.7],
            enemyValue: 0.9,
            numberRows: 20,
            hasRelic: true,
            floorNumber: 3
        },
        {
            barVals: [0.99, 0.97, 0.91, 0.85, 0.77, 0.73, 0.7],
            enemyValue: 0.87,
            numberRows: 20,
            hasRelic: true,
            floorNumber: 4
        },
        
    ],
}

fuelCapacityUpgrades = [50, 60, 70, 80, 90, 100, 110, 120, 150, 200]
inventoryMaxUpgrades = [5, 8, 12, 17, 23, 30, 38, 47, 57]




let state = {...gameStartState}

let screenwidthBlocks = 10; 

let introBlockSquare = 4
let middleBlockSquare = 16
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

async function updateState(newStateObj) {
    state = {...newStateObj};
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
    hullDiv.textContent = "Hull: " + stateObj.currentHullIntegrity + "/" + stateObj.maxHullIntegrity
    

    let cashDiv = document.createElement("Div")
    cashDiv.textContent = "Money: " + stateObj.bankedCash
    
    let inventoryDiv = document.createElement("Div")
    inventoryDiv.classList.add("inventory")
    if (stateObj.currentInventory === stateObj.inventoryMax) {
        inventoryDiv.textContent = "Inventory Full"
        inventoryDiv.classList.add("inventory-full")
    } else {
        inventoryDiv.textContent = "Inventory: " + Math.round((stateObj.currentInventory / stateObj.inventoryMax)*100) + "% full    (Max: " + stateObj.inventoryMax + ")"
    }

    let lasersDiv = document.createElement("Div")
    laserString = "Lasers: " + stateObj.numberLasers + "/" + stateObj.laserCapacity
    if (stateObj.numberLasers > 0) {
        laserString = laserString + " (press L to fire)"
    }
    lasersDiv.textContent = laserString

    let bombDiv = document.createElement("Div")
    bombString = "Bombs: " + stateObj.bombCurrentTotal + "/" + stateObj.bombCapacity
    if (stateObj.bombCurrentTotal > 0) {
        bombString = bombString + " (press B to drop)"
    }
    bombDiv.textContent = bombString

    let dirtDiv = document.createElement("Div")
    dirtString = "Dirt: " + Math.round((stateObj.dirtReserves/(stateObj.dirtThresholdNeeded))*100) + "%"
    if (stateObj.dirtReserves >= (stateObj.dirtThresholdNeeded)) {
        dirtString = dirtString + " (press P to drop dirt)"
    }
    dirtDiv.textContent = dirtString

    topBarDiv.append(fuelDiv, cashDiv, hullDiv, lasersDiv, bombDiv, dirtDiv, inventoryDiv)

    return topBarDiv
}

function ProduceBlockSquares(arrayObj, numberRows, stateObj, isRelic=false) {
    let chosenSquare = 50000
    let floorObj = stateObj.floorValues[stateObj.currentLevel]
    if (floorObj.hasRelic === true) {
        chosenSquare = Math.floor(Math.random() * screenwidthBlocks*numberRows);
    }
    
    let nextSquareEmpty = false;
    //the top row is already reserved for store and empty space
    let middleLength = (screenwidthBlocks*floorObj.numberRows) + (screenwidthBlocks);
    for (let j=screenwidthBlocks; j < middleLength; j++) {
        if (j === chosenSquare) {
            let relicArray = ["fuelRelic", "bombDistanceRelic", "laserDistanceRelic", "dirtRelic"]
            //let relicArray = ["dirtRelic"]
            let chosenRelic = relicArray[Math.floor(Math.random() * relicArray.length)]
            arrayObj.push(chosenRelic)
        } else if (nextSquareEmpty === true){
            arrayObj.push("empty")
            nextSquareEmpty = false
        } else {
            let randomNumber = Math.random() 
            const isEnemy = Math.random()
            let enemyVal = (j < (screenwidthBlocks*3)) ? 1 : floorObj.enemyValue
            if (isEnemy > enemyVal && (j % screenwidthBlocks !== 0) && ((j+1) % screenwidthBlocks !== 0) && j-1 !== chosenSquare) {
                arrayObj.pop()
                arrayObj.push("empty")
                arrayObj.push("enemy")
                nextSquareEmpty = true;
            } else {
                if (randomNumber > floorObj.barVals[0]) {
                    arrayObj.push("7")
                } else if (randomNumber > floorObj.barVals[1]) {
                    arrayObj.push("6")
                } else if (randomNumber > floorObj.barVals[2]) {
                    arrayObj.push("5")
                } else if (randomNumber > floorObj.barVals[3]) {
                    arrayObj.push("4")
                } else if (randomNumber > floorObj.barVals[4]) {
                    arrayObj.push("3")
                } else if (randomNumber > floorObj.barVals[5]) {
                    arrayObj.push("2")
                } else if (randomNumber > floorObj.barVals[6]) {
                    arrayObj.push("1")
                } else if (randomNumber > 0.55) {
                    arrayObj.push("empty")
                } else {
                    arrayObj.push("0")
                }
            }
        }  
    }
    console.log("doing enemies")
    let enemy1 = Math.floor(Math.random() * screenwidthBlocks)
    let enemy2 = Math.floor(Math.random() * screenwidthBlocks)
    console.log("enemy randoms assigned")

    for (let j=0; j < (screenwidthBlocks); j++) {
        console.log("calling inner loop")
        if (j === enemy1 || j === enemy2) {
            arrayObj.push("enemy")
        } else {
            arrayObj.push("empty")
        }
    }

    middleLength += screenwidthBlocks
    const exit = Math.floor(Math.random() * screenwidthBlocks)
    for (let j=0; j < (screenwidthBlocks); j++) {
        if (j === exit ) {
            arrayObj.push("EXIT")
        } else {
            arrayObj.push("0")
        }
    }
    console.log("produce squares array enemy length is " + state.enemyMovementArray.length)
    return arrayObj
}


async function returnArrayObject(stateObj) {
    console.log('inside returnArray')
    tempArray = ["STORE"];
    for (let i=0; i<screenwidthBlocks-1; i++ ) {
        tempArray.push("empty")
    };
    console.log('About to call produceblocksquares')
    tempArray = await ProduceBlockSquares(tempArray, middleBlockSquare, stateObj, isRelic=false)
    console.log('called produceblocksquares')    
    return tempArray
}

//takes a stateObj, and if the gameMap is not created, creates it
async function fillMapWithArray(stateObj) {
    console.log("filling the Map")
        tempArray = await returnArrayObject(stateObj)

        stateObj = await immer.produce(stateObj, (newState) => {
            newState.gameMap = tempArray;
            newState.currentPosition = 2;
        })

    await updateState(stateObj)
    let tempEnemyArray = []
    let tempEnemyMovementArray = []
    for (i = 0; i < stateObj.gameMap.length; i++) {
        console.log("map square " + i + " has content " + stateObj.gameMap[i])
        if (stateObj.gameMap[i] === "enemy") {
            console.log("found an enemy at square " + i)
            let direction = (Math.random > 0.5) ? "left" : "right";
            tempEnemyArray.push(i)
            tempEnemyMovementArray.push(direction)
        }
    }
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.enemyArray = tempEnemyArray;
        newState.enemyMovementArray = tempEnemyMovementArray;
    })
    await updateState(stateObj)
    console.log("enemy array is " + stateObj.enemyArray)
    return stateObj
}


var enemyMovementTimer = setInterval(moveEnemies, 600); // 500 milliseconds (half a second)



async function moveEnemies() {
    let stateObj = {...state}
    if (stateObj.timeCounter === 0) {
        console.log("calling fillMap function")
        stateObj = await fillMapWithArray(stateObj)
        await updateState(stateObj)
    }
    stateObj = await immer.produce(stateObj, (newState) => {
        newState.timeCounter += 1;
    })
    await updateState(stateObj)
    // console.log("number of enemies is " + stateObj.enemyMovementArray.length)
    // console.log("enemy positions are " + stateObj.enemyArray)
    for (let i=0; i < stateObj.enemyArray.length; i++) {
        let k = stateObj.enemyArray[i]
        if (stateObj.enemyMovementArray[i] === "left") {
                if (k % screenwidthBlocks !== 0 && stateObj.gameMap[k-1] === "empty") {
                    //console.log("enemy  " + i + " moving left at position " + k + ", now " + k-1)
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.gameMap[k-1] = "enemy";
                        newState.gameMap[k] = "empty";
                        newState.enemyArray[i] -= 1
                    })

                    
                } else {
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.enemyMovementArray[i] = "right";
                    })
                    //console.log("enemy  " + i + " switching to right at position " + k)
                }
        } else {
                if ((k+1) % screenwidthBlocks !== 0 && stateObj.gameMap[k+1] === "empty") {
                    //console.log("enemy  " + i + " moving right at position " + k + ", now " + k+1)
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.gameMap[k+1] = "enemy";
                        newState.gameMap[k] = "empty";
                        newState.enemyArray[i] += 1
                    })
                } else {
                    stateObj = await immer.produce(stateObj, (newState) => {
                        newState.enemyMovementArray[i] = "left";
                    })
                    //console.log("enemy  " + i + " switching to left at position " + k)
                }   
            }
        }


        if (stateObj.bombLocation) {
            if (stateObj.bombTimer > 0) {
                console.log('counting down bomb timer from ' + stateObj.bombTimer)
                stateObj = await immer.produce(stateObj, (newState) => {
                    newState.bombTimer -= 1
                })
            } else {
                stateObj = await fireLaser(stateObj, stateObj.bombLocation, isLaser=false)
                stateObj = await immer.produce(stateObj, (newState) => {
                    newState.gameMap[newState.bombLocation] = "empty"
                    newState.bombTimer = false;
                    newState.bombLocation = false;
                    
                })
            }
        }

    await changeState(stateObj)
    await checkForDeath(stateObj)
}


//renders all the map squares. 
//Can set this to 0 in exitDoor
//To-DO: Need to set values for mapDiv and each map-square, including elements
async function renderScreen(stateObj) {
    //console.log("rendering Screen")

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
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("player-img")
                mapSquareImg.src = "img/miner1.png"
                mapSquareDiv.append(mapSquareImg)
            }
            
            if (mapSquare === "0") {
                mapSquareDiv.classList.add("dirt")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("dirt-img")
                mapSquareImg.src = "img/dirt.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "empty") {
                mapSquareDiv.classList.add("empty")
            } else if (mapSquare === "enemy") {
                mapSquareDiv.classList.add("enemy")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("enemy-img")
                mapSquareImg.src = "img/enemy1.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "1") {
                mapSquareDiv.classList.add("bronze")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("bronze-img")
                mapSquareImg.src = "img/bronze.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "2") {
                mapSquareDiv.classList.add("silver")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("silver-img")
                mapSquareImg.src = "img/silver.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "3") {
                mapSquareDiv.classList.add("gold")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("gold-img")
                mapSquareImg.src = "img/gold.png"
                mapSquareDiv.append(mapSquareImg)
            }  else if (mapSquare === "4") {
                mapSquareDiv.classList.add("ruby")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("ruby-img")
                mapSquareImg.src = "img/ruby.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "5") {
                mapSquareDiv.classList.add("amethyst")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("amethyst-img")
                mapSquareImg.src = "img/amethyst.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "6") {
                mapSquareDiv.classList.add("diamond")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("diamond-img")
                mapSquareImg.src = "img/diamond.png"
                mapSquareDiv.append(mapSquareImg)
            }  else if (mapSquare === "7") {
                mapSquareDiv.classList.add("blkdiamond")
                let mapSquareImg = document.createElement("Img");
                mapSquareImg.classList.add("blkdiamond-img")
                mapSquareImg.src = "img/blkdiamond.png"
                mapSquareDiv.append(mapSquareImg)
            } else if (mapSquare === "STORE") {
                mapSquareDiv.classList.add("store")
                mapSquareDiv.textContent = "Store"
            } else if (mapSquare === "EXIT") {
                mapSquareDiv.classList.add("exit")
                mapSquareDiv.textContent = "EXIT"
            } else if (mapSquare === "BOMB") {
                mapSquareDiv.classList.add("bomb")
                mapSquareDiv.textContent = stateObj.bombTimer
            } else if (mapSquare === "fuelRelic") {
                mapSquareDiv.classList.add("fuel-relic")
                mapSquareDiv.textContent = "Fuel ++"
            } else if (mapSquare === "bombDistanceRelic") {
                mapSquareDiv.classList.add("bomb-distance-relic")
                mapSquareDiv.textContent = "Bomb Distance ++"
            } else if (mapSquare === "laserDistanceRelic") {
                mapSquareDiv.classList.add("laser-distance-relic")
                mapSquareDiv.textContent = "Laser Distance ++"
            } else if (mapSquare === "dirtRelic") {
                mapSquareDiv.classList.add("dirt-relic")
                mapSquareDiv.textContent = "Dirt Efficiency ++"
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

          let bombUpgradeDiv = document.createElement("Div")
          bombUpgradeDiv.classList.add("store-option")
          bombUpgradeDiv.classList.add("bomb-upgrade-store")
          bombUpgradeDiv.textContent = "Bomb Capacity Upgrade: " + stateObj.bombUpgradeCost + " gold"
        if (stateObj.bankedCash >= stateObj.bombUpgradeCost) {
            bombUpgradeDiv.classList.add("store-clickable")
            bombUpgradeDiv.onclick = function () {
                bombUpgrade(stateObj)
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

        let buyBombDiv = document.createElement("Div")
        if (stateObj.bombCurrentTotal < stateObj.bombCapacity) {
            buyBombDiv.classList.add("store-option")
            buyBombDiv.textContent = "Buy 1 bomb: " + stateObj.bombCost + " gold"
            buyBombDiv.onclick = function () {
            }
            if (stateObj.bankedCash >= stateObj.bombCost) {
                buyBombDiv.classList.add("store-clickable")
                buyBombDiv.onclick = function () {
                    buyBomb(stateObj)
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

        storeDiv.append(fillFuelDiv, repairDiv, buyLaserDiv, buyBombDiv, fuelUpgradeDiv, inventoryUpgradeDiv, hullUpgradeDiv, laserUpgradeDiv, bombUpgradeDiv, buyNothingDiv)


        let testDiv = document.createElement("Div")
        document.getElementById("app").append(storeDiv)
    }
    return stateObj
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

async function bombUpgrade(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombCapacity += 1;
        newState.bombCurrentTotal += 1;
        newState.bankedCash -= stateObj.bombUpgradeCost
        newState.bombUpgradeCost += 1000;
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

//upgrade bomb distance, laser distance, and hull integrity relics
async function upgradeFuelRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.fuelCapacity += 80;
        newState.currentFuel += 80;
        newState.fuelUpgrades +=1;
    })
    await changeState(stateObj);
    return stateObj
}

async function upgradeBombDistanceRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombDistance += 1;
    })
    await changeState(stateObj);
    return stateObj
}

async function upgradeLaserDistanceRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.laserDistance += 1;
    })
    await changeState(stateObj);
    return stateObj
}

async function upgradeDirtBlockRelic(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        if (newState.dirtThresholdNeeded > 10) {
            newState.dirtThresholdNeeded -= 5;
        }
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

async function buyBomb(stateObj) {
    stateObj = immer.produce(stateObj, (newState) => {
        newState.bombCurrentTotal += 1;
        newState.bankedCash -= stateObj.bombCost
    })
    await changeState(stateObj);
}


async function startGame(state) {
    
}



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
                  stateObj = await fireLaser(stateObj, stateObj.currentPosition)
                  await changeState(stateObj)
              }
          } else if (event.key === "p") {
            //if (stateObj.numberLasers > 0) {
                stateObj = await dropBlock(stateObj)
                await changeState(stateObj)
            //}
        }else if (event.key === "b") {
            //if (stateObj.numberLasers > 0) {
                stateObj = await dropBomb(stateObj)
                await changeState(stateObj)
            //}
        }
    }
  });

async function checkForDeath(stateObj) {
    if (stateObj.currentFuel < 0) {
        await loseTheGame("You've run out of fuel!");
    }

    if (stateObj.gameMap[stateObj.currentPosition-1] === "enemy" && stateObj.currentPosition % screenwidthBlocks !== 0) {
        stateObj = await doDamage(stateObj, 50)
    } else if (stateObj.gameMap[stateObj.currentPosition+1] === "enemy" && (stateObj.currentPosition-15) % screenwidthBlocks !== 0) {
        stateObj = await doDamage(stateObj, 50)
    } else if (stateObj.gameMap[stateObj.currentPosition+screenwidthBlocks] === "enemy") {
        stateObj = await doDamage(stateObj, 50)
    } else if (stateObj.gameMap[stateObj.currentPosition-screenwidthBlocks] === "enemy") {
        stateObj = await doDamage(stateObj, 50)
    }

    await changeState(stateObj)

    if (stateObj.currentHullIntegrity <= 0) {
        await loseTheGame("Your miner took too much damage and exploded!");
    }
}

async function doDamage(stateObj, damageAmount) {
    if (stateObj.inStore === false) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.currentHullIntegrity -= damageAmount;
        })
    }
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
    let newSquare = stateObj.gameMap[stateObj.currentPosition - screenwidthBlocks]
    if (stateObj.currentPosition > 7) {
        if (newSquare=== "empty" || newSquare === "STORE") {
            window.scrollTo(currentWidth*scrollWidth- (scrollWidth*3), currentHeight*scrollHeight - (scrollHeight*2))
            stateObj = await calculateMoveChange(stateObj, -screenwidthBlocks)
            stateObj = immer.produce(stateObj, (newState) => {
                newState.currentFuel -= 0.25;
            })
        }
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
    } else if (targetSquare === "EXIT") {
        stateObj = await goToNextLevel(stateObj)
    } else if (targetSquare === "fuelRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeFuelRelic(stateObj)  
    } else if (targetSquare === "bombDistanceRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeBombDistanceRelic(stateObj)  
    } else if (targetSquare === "laserDistanceRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeLaserDistanceRelic(stateObj)  
    } else if (targetSquare === "dirtRelic") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 0, stateObj.drillTime)
        stateObj = await upgradeDirtBlockRelic(stateObj)  
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

async function goToNextLevel(stateObj) {
    console.log('inside gtnl')
    console.log('interval cleared')
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.currentLevel += 1;
        newState.timeCounter = 0;
    })
    console.log('first immer done')
    stateObj = await fillMapWithArray(stateObj)
    console.log('new array generated with length ' + newArray.length)
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.currentPosition = 5;
    })
    //window.scrollTo(0, 0)
    console.log('second immer done, game map length is ' + stateObj.gameMap.length)
    stateObj = await changeState(stateObj)
    var mapDiv = document.getElementById('app')
    mapDiv.scrollTop = 0
    console.log("you are about to return the stateObj from goToNextLevel")
    return stateObj
}

async function handleSquare(stateObj, squareIndexToMoveTo, fuelToLose, goldToGain, pauseDuration=0) {
    let oldPosition = stateObj.currentPosition
    stateObj = immer.produce(stateObj, (newState) => {
        newState.currentFuel -= fuelToLose;
        newState.currentPosition = squareIndexToMoveTo;

        if (newState.dirtReserves < (stateObj.dirtThresholdNeeded) && newState.gameMap[squareIndexToMoveTo] !== "empty") {
            newState.dirtReserves += 1;
        }

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
        // document.querySelectorAll(".map-square")[stateObj.currentPosition].classList.add("change-empty")
        // await pause(pauseDuration)   
        // document.querySelectorAll(".map-square")[stateObj.currentPosition].classList.remove("change-empty")
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

async function fireLaser(stateObj, detonatePosition, isLaser=true) {
    let rightBlocksToBlast = 0;
    let leftBlocksToBlast = 0;
    let numberBlocks = (isLaser === true) ? stateObj.laserDistance : stateObj.bombDistance
    for (i=0; i < numberBlocks+1; i++) {
        leftBlocksToBlast = i;
        if ((detonatePosition-i) % screenwidthBlocks === 0) {
            break;
        }
    }
    for (i=0; i < numberBlocks+1; i++) {
        rightBlocksToBlast = i;
        if ((detonatePosition+i+1) % screenwidthBlocks === 0) {
            break;
        }
    }
    
    for (i=1; i < leftBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition-i)
    }

    for (i=1; i < rightBlocksToBlast+1; i++) {
        stateObj = await detonateBlock(stateObj, detonatePosition+i)
    }

    if (isLaser) {
        stateObj = immer.produce(stateObj, (newState) => {
            newState.numberLasers -= 1;
        })
    }
    return stateObj
}

async function detonateBlock(stateObj, blockPosition) {
    stateObj = immer.produce(stateObj, (newState) => {
        if (newState.enemyArray.includes(blockPosition)) {
            const enemyIndex = newState.enemyArray.indexOf(blockPosition)
            newState.enemyArray.splice(enemyIndex, 1)
            newState.enemyMovementArray.splice(enemyIndex, 1)
        }
        newState.gameMap[blockPosition] = "empty"
    })
    return stateObj
}

async function dropBlock(stateObj) {
    console.log("dropping block")
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty") {
        stateObj = await immer.produce(stateObj, (newState) => {
            if (newState.dirtReserves >= (newState.dirtThresholdNeeded)) {
                newState.gameMap[stateObj.currentPosition+screenwidthBlocks] = "0";
                newState.dirtReserves = 0;
            }
        })
    }
    return stateObj
}

async function dropBomb(stateObj) {
    console.log("dropping bomb")
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty") {
        stateObj = await immer.produce(stateObj, (newState) => {
            if (newState.bombCurrentTotal > 0) {
                newState.gameMap[stateObj.currentPosition+screenwidthBlocks] = "BOMB";
                newState.bombCurrentTotal -= 1;
                newState.bombLocation = stateObj.currentPosition+screenwidthBlocks
                newState.bombTimer = 5;
            }
        })
    }
    console.log("bomb timer set to " + stateObj.bombTimer)
    return stateObj
}