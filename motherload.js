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

//TO-DO
//render current state (fuel capacity, cash, etc) at top of page
//change the state when the player "clears" a square; decrease  the fuel
//check so the player can't move if out of fuel
//if the player moves into a gem, change inventory AND clear the square

//takes a state object, changes the "state" to be that, and renders the screen
async function changeState(newStateObj) {
    state = {...newStateObj}
    await renderScreen(state);
  }

//takes a stateObj, and if the gameMap is not created, creates it
async function fillMapWithArray(stateObj) {
    console.log("filling the Map")
    if (stateObj.gameMap.length === 0) {
        tempArray = ["air", "air", "air", "air",
                    "air", "air", "air", "air"];
        //first 12 * 36 squares
        let iterations = (8*7)
        for (let i=0; i < iterations; i++) {
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
      changeState(stateObj)
    } else if (event.key === 'ArrowDown') {
      // Execute your function for the down arrow key
      stateObj = await DownArrow(stateObj);
      changeState(stateObj)
    } else if (event.key === 'ArrowLeft') {
      // Execute your function for the left arrow key
      stateObj = await LeftArrow(stateObj);
      changeState(stateObj)
    } else if (event.key === 'ArrowRight') {
      // Execute your function for the right arrow key
      stateObj = await RightArrow(stateObj);
      changeState(stateObj)
    }
  });

async function LeftArrow(stateObj) {
    if (stateObj.currentPosition == 0 || stateObj.currentPosition % 8 === 0 ) {
        return stateObj
    } else {
        stateObj.currentPosition -= 1;
    }
    return stateObj
}

//7, 15, 23
async function RightArrow(stateObj) {
    if ((stateObj.currentPosition+1) % 8 === 0 ) {
        return stateObj
    } else {
        stateObj.currentPosition += 1;
    }
    return stateObj
}

async function UpArrow(stateObj) {
    if (stateObj.currentPosition < 8 ) {
        return stateObj
    } else {
        stateObj.currentPosition -= 8;
    }
    return stateObj
}

async function DownArrow(stateObj) {
    if (stateObj.currentPosition > 55) {
        return stateObj
    } else {
        stateObj.currentPosition += 8;
    }
    return stateObj
}