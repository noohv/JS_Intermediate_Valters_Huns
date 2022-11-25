const fetchApi = require("./api")

// Function to sort data by property
const mySort = async (order, command, apiType) => {
    try {
        const data = await fetchApi(apiType) // Fetch data from API
        const [property] = command // Destructure command - type, property
    
        if(!property) console.log("Please provide a property to sort by")
        else {
            let newData = [...data].sort((first, second) => first[property] > second[property])
            newData.map(i => console.log(i[property]))

            order === 'asc' ? console.log(data.sort((a,b) => b[`${property}`] < a[`${property}`] ? 1 : -1))
            :
            console.log(data.sort((a,b) => b[`${property}`] > a[`${property}`] ? 1 : -1))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = mySort