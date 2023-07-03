let gameStartState = {
    gameMap: [],
    fuelCapacity: 20,
    currentFuel: 20,
    aboveGround: true,
    bankedCash: 50,
    inventoryCash: 0, 
    currentPosition: false,
}

//takes a state object, changes the "state" to be that, and renders the screen
async function changeState(newStateObj) {
    let stateObj = {...newStateObj}
  
    state = {...stateObj}
    renderScreen(stateObj);
    return stateObj
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
            console.log(randomNumber)
            
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
    console.log(stateObj.gameMap)
    console.log(stateObj.currentPosition)
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

    console.log(stateObj.gameMap)

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


let state = {...gameStartState}
renderScreen(state)
