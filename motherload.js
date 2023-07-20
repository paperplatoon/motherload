let gameStartState = {
    gameMap: [],
    fuelCapacity: 150,
    currentFuel: 130,
    aboveGround: true,
    bankedCash: 50,
    inventoryCash: 0, 
    currentPosition: false,
}

let state = {...gameStartState}

let screenwidthBlocks = 16; 
let totalSquareNumber = (16*20)

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
    fuelDiv.textContent = "Fuel "

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

    

    let cashDiv = document.createElement("Div")
    cashDiv.textContent = "Total Funds: " + stateObj.bankedCash
    
    let inventoryDiv = document.createElement("Div")
    inventoryDiv.textContent = "Current Inventory Value: " + stateObj.inventoryCash

    topBarDiv.append(fuelDiv, cashDiv, inventoryDiv)

    return topBarDiv
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
        for (let i=0; i < totalSquareNumber; i++) {
            let randomNumber = Math.random()
            
            const isEnemy = Math.random()
            if (isEnemy > 0.97) {
                randomNumber = 0.221
            }
            if (randomNumber > 0.995) {
                tempArray.push("4")
            } else if (randomNumber > 0.98) {
                tempArray.push("3")
            } else if (randomNumber > 0.93) {
                tempArray.push("2")
            } else if (randomNumber > 0.75) {
                tempArray.push("1")
            } else if (randomNumber == 0.221) {
                tempArray.push("enemy")
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
    // console.log(stateObj.currentPosition)
    return stateObj
}

//renders all the map squares. 
//To-DO: Need to set values for mapDiv and each map-square, including elements
async function renderScreen(stateObj) {
    console.log("rendering Screen")
    if (stateObj.gameMap.length === 0) {
        console.log("calling fillMap function")
        stateObj = await fillMapWithArray(stateObj)
    }

    document.getElementById("app").innerHTML = ""
    //create a mapDiv to append all your new squares to
    topBar = await renderTopBarStats(stateObj);
    document.getElementById("app").append(topBar)

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
        } else if (mapSquare === "STORE") {
            mapSquareDiv.classList.add("store")
            mapSquareDiv.textContent = "Store"
        }

        mapDiv.append(mapSquareDiv)
    })
    document.getElementById("app").append(mapDiv)
}


renderScreen(state)



//listen for key presses
document.addEventListener('keydown', async function(event) {
    let stateObj = {...state};
    console.log("outside loop " + stateObj.currentPosition)
    if (event.key === 'ArrowUp') {
      // Execute your function for the up arrow key
      stateObj = await UpArrow(stateObj);
      await changeState(stateObj)
      await checkForDeath(stateObj)
    } else if (event.key === 'ArrowDown') {
        console.log("inside loop 1 " + stateObj.currentPosition)
      // Execute your function for the down arrow key
      stateObj = await DownArrow(stateObj);
      console.log("inside loop 2 " + stateObj.currentPosition)
      await changeState(stateObj)
      await checkForDeath(stateObj)
      console.log("inside loop 3 " + stateObj.currentPosition)
    } else if (event.key === 'ArrowLeft') {
      // Execute your function for the left arrow key
      stateObj = await LeftArrow(stateObj);
      await changeState(stateObj)
      await checkForDeath(stateObj)
    } else if (event.key === 'ArrowRight') {
      // Execute your function for the right arrow key
      stateObj = await RightArrow(stateObj);
      await changeState(stateObj)
      await checkForDeath(stateObj)
    }
  });

async function checkForDeath(stateObj) {
    if (stateObj.currentFuel < 0) {
        await loseTheGame("You've run out of fuel!");
    }

    if (stateObj.gameMap[targetSquareNum-1] === "enemy" || stateObj.gameMap[targetSquareNum+1] === "enemy") {
        await loseTheGame("You got too close to an enemy!");
    }
}

async function LeftArrow(stateObj) {   
    //make sure not drilling while in midair
    if (stateObj.gameMap[stateObj.currentPosition - 1] === "STORE") {
        stateObj = await calculateMoveChange(stateObj, -1)
    }
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition - 1] !== "empty") {
        return stateObj
    } 

    //make sure not on left side 
    if (stateObj.currentPosition % screenwidthBlocks === 0 ) {
        return stateObj
    } else {
        stateObj = await calculateMoveChange(stateObj, -1)
    }

    return stateObj
}

//7, 15, 23
async function RightArrow(stateObj) {
    //do nothing if you're in the air and space to your left isn't air
    if (stateObj.gameMap[stateObj.currentPosition + screenwidthBlocks] === "empty" && stateObj.gameMap[stateObj.currentPosition + 1] !== "empty") {
        return stateObj
    } else {
        //only execute if not already on right side
        if ((stateObj.currentPosition+1) % screenwidthBlocks !== 0) {
            stateObj = await calculateMoveChange(stateObj, 1)
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
    const scrollAmount = Math.floor(viewportHeight * 0.02);
    if (stateObj.currentPosition > 7 && stateObj.gameMap[stateObj.currentPosition - screenwidthBlocks]=== "empty") {
        window.scrollTo(0, window.pageYOffset - scrollAmount)
        stateObj = await calculateMoveChange(stateObj, -screenwidthBlocks)
        stateObj.currentFuel -= 3;
    }
    return stateObj
}

async function DownArrow(stateObj) {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const scrollAmount = Math.floor(viewportHeight * 0.02);
    if (stateObj.currentPosition < (totalSquareNumber)) {
        window.scrollTo(0, window.pageYOffset + scrollAmount)
        stateObj = await calculateMoveChange(stateObj, screenwidthBlocks)
    }
    return stateObj
}

async function calculateMoveChange(stateObj, squaresToMove) {
    targetSquareNum = stateObj.currentPosition + squaresToMove
    targetSquare = stateObj.gameMap[targetSquareNum];
    console.log("target square is " + targetSquareNum)

    //check if target square has an enemy nearby
    

    
    if (targetSquare === "0") {
        console.log("target square was dirt")
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 1)
            
    } else if (targetSquare === "1") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 5)
    } else if (targetSquare === "2") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 10)
    } else if (targetSquare === "3") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 20)
    } else if (targetSquare === "4") {
        stateObj = await handleSquare(stateObj, targetSquareNum, 2, 50)
    } else if (targetSquare === "empty") {
        console.log("target square was empty")
        stateObj = await handleSquare(stateObj, targetSquareNum, 1, 0)
    } else if (targetSquare === "enemy") {
        await loseTheGame()
        stateObj = await handleSquare(stateObj, targetSquareNum, 1, 0)
    } else if (targetSquare === "STORE") {
        stateObj = await seeStore(stateObj)
    } else {
        console.log("target square hasn't been handled yet")
    }

    if (targetSquare !== "empty" && targetSquare !== "STORE") {
        console.log(`target quare wasn't empty`)
        console.log(stateObj.gameMap[targetSquareNum])
        stateObj = await immer.produce(stateObj, async (newState) => {
            newState.gameMap[targetSquareNum] = "empty"
        })
        
        console.log(stateObj.gameMap[targetSquareNum])
    }


    return stateObj
}

function pause(timeValue) {
    return new Promise(res => setTimeout(res, timeValue))
  }

async function seeStore(stateObj) {
    let missingFuel = stateObj.fuelCapacity - stateObj.currentFuel 
    stateObj = await immer.produce(stateObj, async (newState) => {
        newState.bankedCash += newState.inventoryCash;
        newState.inventoryCash = 0;
        if (missingFuel > 0) {
            if (newState.bankedCash > missingFuel) {
                newState.currentFuel += missingFuel;
                newState.bankedCash -= missingFuel
            } else {
                newState.currentFuel += newState.bankedCash;
                newState.bankedCash = 0;
            }
        }
    })
     
    return stateObj
}

async function handleSquare(stateObj, squareIndexToMoveTo, fuelToLose, goldToGain) {
    stateObj = immer.produce(stateObj, (newState) => {
        stateObj.currentFuel -= fuelToLose;
        newState.currentPosition = squareIndexToMoveTo;
        newState.inventoryCash += goldToGain
    }) 
    return stateObj
}

async function loseTheGame(textString) {
    let confirmText = textString + ` Click OK to try again`
    var confirmation = confirm(confirmText);

  if (confirmation) {
    location.reload();
  }
}