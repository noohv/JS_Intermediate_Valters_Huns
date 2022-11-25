const fetchApi = require("./api")

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

module.exports = filter