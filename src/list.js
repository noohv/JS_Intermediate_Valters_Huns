import fetchApi from './api.js'

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

export default list