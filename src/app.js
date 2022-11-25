/*
    Javascript Intermediate Final Task

    Author: Valters Huns
*/

const fetchApi = require("./api")
const prompt = require("prompt-sync")({sigint:true})

const COUNT = 5 // Number of items to fetch ()

// Object with APIs
let API = {
    cat: `https://api.thecatapi.com/v1/breeds?limit=${COUNT}`,
    dog: `https://api.thedogapi.com/v1/breeds?limit=${COUNT}`
}

// Function for list command
const list = async (command, apiType) => {
    try {
        const data = await fetchApi(apiType) // Fetch data from API
        const [property, ...rest] = command // Destructure command - property and rest of the items (not used)
    
        if(rest.length > 0) console.log("This command does not accept VALUE")
        if(!property) console.log(data) // Print whole list if no property
        else if(property) data.map(item => {
            if(`${property}` in item) console.log(item[`${property}`]) // Item has property, print its value
            else console.log(`The <${property}> property doesn't exist for this item`) // Property does not exist for item
        })
    } catch (error) {
        console.log(error)
    }
}

// Function for filter command
const filter = async (command, apiType) => {
    try {
        const data = await fetchApi(apiType) // Fetch data from API
        const [property, ...value] = command // Destructure command - type property [many values]
    
        if(!property) console.log("Please provide property to filter by")
        else if(value.length === 0) console.log("Please provide a value to filter by")
       
        // If property and value
        else if(property && value) data.map(item => {
            // Check if property exists in the item
            if(`${property}` in item) {
    
                /* Stringify current item, convert string to lower case, then check if it includes
                    value (which is converted from array to string, where all commas are replaced with space)
                    which is then converted to lower case
    
                    Strings are converted to lower case for better searching (Case-Insensitive search)
                */
                if(JSON.stringify(item[`${property}`]).toLowerCase().includes(value.toString().replaceAll(","," ").toLowerCase())) console.log(item)
            } else console.log(`The <${property}> property doesn't exist for this item`)
        })
        else console.log("Unknown problem!")
    } catch (error) {
        console.log(error)
    }
}

const mySort = async (command, apiType) => {
    try {
        const data = await fetchApi(apiType) // Fetch data from API
        const [property] = command // Destructure command - type, property
    
        if(!property) console.log("Please provide a property to sort by")
        else {
            let newData = [...data].sort((first, second) => first[property] > second[property])
            newData.map(i => console.log(i[property]))
        }
    } catch (error) {
        console.log(error)
    }
}

// Main APP function
const renderApp = async () => {
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
                else if(cmdType==='sort-asc' || cmdType === 'sort-desc') await mySort(rest, API[apiType])
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

renderApp()