// Method to fetch api and return data
const fetchApi = async (url) => {
    let data = null
    try {
        const response = await fetch(url)
        data = await response.json()
    } catch (error) {
        console.log('An error happened:', error)
    }
    return data
}

module.exports = fetchApi