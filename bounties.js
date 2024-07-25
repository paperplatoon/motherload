let bounties = [
    //level ONE
    [
        goldbounty = {
            name: "Panning for Gold",
            requirementText: "Costs 2 gold",
            rewardText: "Increase Hull Armor by 25",
            value: 35,
            isBountyMet: async (stateObj, value) => {
                return (stateObj.goldInventory >= 2)
            },
            bountyFunc: async (stateObj) => {
                    stateObj = immer.produce(stateObj, (newState) => {
                        newState.goldInventory -= 2;
                        newState.currentInventory -= 2;
                        newState.currentHullArmor += 25
                        newState.hullArmorMax += 25
                        newState.levelBounty = false
                    })
                    await changeState(stateObj);   
            },
        },

        goldbounty = {
            name: "Panning for Gold",
            requirementText: "Costs 3 gold",
            rewardText: "Increase Fuel Tank by 35",
            value: 35,
            isBountyMet: async (stateObj) => {
                return (stateObj.goldInventory >= 3)
            },
            bountyFunc: async (stateObj) => {
                    stateObj = immer.produce(stateObj, (newState) => {
                        newState.goldInventory -= 3;
                        newState.currentInventory -= 3;
                        newState.currentFuel += 35
                        newState.fuelTankMax += 35
                        newState.levelBounty = false
                    })
                    await changeState(stateObj);   
            },
        },

        goldbounty = {
            name: "Panning for Gold",
            requirementText: "Costs 3 gold",
            rewardText: "Increase Fuel Tank by 35",
            value: 35,
            isBountyMet: async (stateObj) => {
                return (stateObj.goldInventory >= 3)
            },
            bountyFunc: async (stateObj) => {
                    stateObj = immer.produce(stateObj, (newState) => {
                        newState.goldInventory -= 3;
                        newState.currentInventory -= 3;
                        newState.currentFuel += 35
                        newState.fuelTankMax += 35
                        newState.levelBounty = false
                    })
                    await changeState(stateObj);   
            },
        },

    ],
    //level 2
    [
    ]
]