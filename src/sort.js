import fetchApi from './api.js'

// Function to sort data by property
const mySort = async (order, command, apiType) => {
    try {
        const data = await fetchApi(apiType) // Fetch data from API
        const [property] = command // Destructure command - type, property
    
        if(!property) console.log("Please provide a property to sort by") // Property not provided
        else {
            // Ternary operator to sort either ascending or descending
            order === 'asc' ? 
                console.log(data.sort((a,b) => b[`${property}`] < a[`${property}`] ? 1 : -1)) :
                console.log(data.sort((a,b) => b[`${property}`] > a[`${property}`] ? 1 : -1))
        }
    } catch (error) {
        console.log(error)
    }
}

export default mySort