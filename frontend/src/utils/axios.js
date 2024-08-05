import axios from 'axios'
import { API_BASE_URL } from './constants'

// Create an instance of Axios and store it in the 'apiInstance' variable
const apiInstance = axios.create({
    // Set the base URL for this instance. All requests made using this instance will have this URL as starting point.
    baseURL: API_BASE_URL,
    // Set a timeout for requests made using this instance. If a request takes longer than 5 seconds to complete, it will be canceled.
    timeout: 5000,
    // Define headers that will be included in every request made using this instance.
    headers: {
        'Content-Type': 'application/json', // The request will be sending data in JSON format.
        Accept: 'application/json', // The request expects a reponse in JSON format.
    }
})

// Export the 'apiInstance'.
export default apiInstance