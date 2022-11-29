/*
    Javascript Intermediate Final Task

    Author: Valters Huns
*/
import promptSync from 'prompt-sync'
import list from './list.js'
import filter from './filter.js'
import mySort from './sort.js'

const prompt = promptSync({sigint: true})
const COUNT = 5 // Number of items to fetch

// Available APIs
let API = {
    cat: `https://api.thecatapi.com/v1/breeds?limit=${COUNT}`,
    dog: `https://api.thedogapi.com/v1/breeds?limit=${COUNT}`
}

// Main APP function
const app = async () => {
    try {
        while(true) {
            console.log("\n\nCommand format: [api] [command] *[property] *[value]        * - not required for every command")
            console.log("Available APIs - cat, dog")
            console.log("Please enter a command: list | sort-(asc|desc) | filter ")
            let input =  prompt("> ")
    
            const [apiType, cmdType, ...rest] = input.split(" ") // destructure user input
    
            // User selected API exists
            if(apiType in API) {
                if(cmdType==='list') await list(rest, API[apiType])
                else if(cmdType==='filter') await filter(rest, API[apiType])
                else if(cmdType==='sort-asc' || cmdType === 'sort-desc') {
                    const order = cmdType.split("-")[1] // from "sort-asc" get "asc" (or "desc")
                    await mySort(order, rest, API[apiType])
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
    
            console.log("\nShould we continue? (END to stop | ANY other input to continue): ")
            input = prompt("> ")
            if(input.toLowerCase() === "end") break
        }
    
    } catch (error) {
        console.log(error)
    }
}

app()