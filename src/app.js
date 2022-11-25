/*
    Javascript Intermediate Final Task

    Author: Valters Huns
*/

const prompt = require("prompt-sync")({sigint:true})
const list = require("./list")
const filter = require("./filter")
const mySort = require("./sort")

const COUNT = 5 // Number of items to fetch ()

// Available APIs
let API = {
    cat: `https://api.thecatapi.com/v1/breeds?limit=${COUNT}`,
    dog: `https://api.thedogapi.com/v1/breeds?limit=${COUNT}`
}

// Main APP function
const app = async () => {
    try {
        let command
        while(true) {
            console.log("Command format: [api] [command] *[property] *[value]        * - not required for every command")
            console.log("Available APIs - cat, dog")
            console.log("Please enter a command: list | sort-(asc|desc) | filter ")
            let input =  prompt("> ")
            command = input.split(" ") // Create array with input words
    
            const [apiType, cmdType, ...rest] = command
    
            if(apiType in API) {
                if(cmdType==='list') await list(rest, API[apiType])
                else if(cmdType==='filter') await filter(rest, API[apiType])
                else if(cmdType==='sort-asc' || cmdType === 'sort-desc') {
                    const order = cmdType.split("-")[1]
                    await mySort( order ,rest, API[apiType])
                } 
                else {
                    console.log(`<${cmdType}> command doesn't exist. Try again!`)  
                    continue
                } 
            }
            else {
                console.log(`<${apiType}> API doesn't exist`)
                continue
            }
    
    
            let programInput = prompt("Should we continue? (END to stop | ANY other input to continue): ")
            if(programInput.toLowerCase() === "end") break
        }
    
    } catch (error) {
        console.log(error)
    }
}

app()