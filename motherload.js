let gameStartState = {
    gameMap: [],
    fuelCapacity: 20,
    currentFuel: 20,
    aboveGround: true,
    bankedCash: 50,
    inventoryCash: 0, 
    currentPosition: false,
}

let state = {...gameStartState}
let totalSquareNumber = (8*20)

//TO-DO
//change the state when the player "clears" a square; decrease  the fuel
//check so the player can't move if out of fuel
//if the player moves into a gem, change inventory AND clear the square
//edit scroll logic so it only triggers once player is at LEAST three squares up or down


//takes a state object, changes the "state" to be that, and renders the screen
async function changeState(newStateObj) {
    state = {...newStateObj}
    await renderScreen(state);
}

function renderTopBarStats(stateObj) {
    let topBarDiv = document.createElement("Div")
    topBarDiv.classList.add("top-stats-bar")

    let fuelDiv = document.createElement("Div")
    fuelDiv.textContent = "Fuel: " + stateObj.currentFuel + "/" + stateObj.fuelCapacity

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
        tempArray = ["0", "0", "0", "0",
                    "0", "0", "0", "0"];
        //first 12 * 36 squares
        for (let i=0; i < totalSquareNumber; i++) {
            let randomNumber = Math.random()
            
            const isEnemy = Math.random()
            if (isEnemy > 0.98) {
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
            stateObj.currentPosition = Math.floor(Math.random() * 8)
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
    topBar = renderTopBarStats(stateObj);
    document.getElementById("app").append(topBar)

    let mapDiv = document.createElement("Div");
    mapDiv.classList.add("map-div");

    stateObj.gameMap.forEach(function (mapSquare, squareIndex) {
        let mapSquareDiv = document.createElement("Div");
        mapSquareDiv.classList.add("map-square");

        if (stateObj.currentPosition === squareIndex) {
            mapSquareDiv.classList.add("player-here")
        }
        
        if (mapSquare === "0") {
            mapSquareDiv.classList.add("dirt")
        } else if (mapSquare === "air") {
            mapSquareDiv.classList.add("air")
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
        }

        mapDiv.append(mapSquareDiv)
    })
    document.getElementById("app").append(mapDiv)
}


renderScreen(state)



//listen for key presses
document.addEventListener('keydown', async function(event) {
    let stateObj = {...state};
    if (event.key === 'ArrowUp') {
      // Execute your function for the up arrow key
      stateObj = await UpArrow(stateObj);
      await changeState(stateObj)
    } else if (event.key === 'ArrowDown') {
      // Execute your function for the down arrow key
      stateObj = await DownArrow(stateObj);
      await changeState(stateObj)
    } else if (event.key === 'ArrowLeft') {
      // Execute your function for the left arrow key
      stateObj = await LeftArrow(stateObj);
      await changeState(stateObj)
    } else if (event.key === 'ArrowRight') {
      // Execute your function for the right arrow key
      stateObj = await RightArrow(stateObj);
      await changeState(stateObj)
    }
  });

async function LeftArrow(stateObj) {
    if (stateObj.currentPosition == 0 || stateObj.currentPosition % 8 === 0 ) {
        return stateObj
    } else {
        await calculateMoveChange(stateObj, -1)
        //stateObj.currentPosition -= 1;
    }
    return stateObj
}

//7, 15, 23
async function RightArrow(stateObj) {
    if ((stateObj.currentPosition+1) % 8 === 0 ) {
        return stateObj
    } else {
        await calculateMoveChange(stateObj, 1)
        //stateObj.currentPosition += 1;
    }
    return stateObj
}

async function UpArrow(stateObj) {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const scrollAmount = Math.floor(viewportHeight * 0.06);
    if (stateObj.currentPosition > 7 ) {
        window.scrollTo(0, window.pageYOffset - scrollAmount)
        stateObj = await calculateMoveChange(stateObj, -8)
    }
    return stateObj
}

async function DownArrow(stateObj) {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const scrollAmount = Math.floor(viewportHeight * 0.06);
    if (stateObj.currentPosition < (totalSquareNumber)) {
        window.scrollTo(0, window.pageYOffset + scrollAmount)
        stateObj = await calculateMoveChange(stateObj, 8)
    }
    return stateObj
}

async function calculateMoveChange(stateObj, squaresToMove) {
    targetSquareNum = stateObj.currentPosition + squaresToMove
    targetSquare = stateObj.gameMap[targetSquareNum];
    console.log("target square is " + targetSquare)
    

    
    if (targetSquare === "0") {
            console.log("target square was dirt")
            stateObj.currentFuel -= 2;
            stateObj.currentPosition = targetSquareNum
            
    } else {
        console.log("target square was not 0")
    }
    

    return stateObj

}