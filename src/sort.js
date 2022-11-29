import fetchApi from './api.js'

// Function to sort data by property
const mySort = async (order, command, apiType) => {
    try {
        const data = await fetchApi(apiType) // Fetch data from API
        const [property] = command // Destructure command - property
    
        if(!property) console.log("Please provide a property to sort by") // Property not provided
        else {
            // Sort either ascending or descending
            if(order === 'asc') console.log(data.sort((a,b) => b[`${property}`] < a[`${property}`] ? 1 : -1))
            else console.log(data.sort((a,b) => b[`${property}`] > a[`${property}`] ? 1 : -1))
        }
    } catch (error) {
        console.log(error)
    }
}

export default mySort