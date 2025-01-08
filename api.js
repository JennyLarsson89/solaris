// API module
const BASE_URL = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com';

/**
 * Fetch data from the API.
 * @param {string} endpoint - The API endpoint to call.
 * @returns {Object} The response data as JSON.
 */
export const getKey = async (endpoint) => {
    const url = BASE_URL + endpoint;
    const options = { method: 'POST' };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

/**
 * Get planets data from the API.
 * @param {string} endpoint - The API endpoint to call.
 * @param {Object} key - The key object containing the API key.
 * @returns {Object} The planets data as JSON.
 */
export const getPlanets = async (endpoint, key) => {
    const url = BASE_URL + endpoint;
    const options = {
        method: 'GET',
        headers: {
            'x-zocom': key.key, // Using the key to authenticate the request
        },
    };

    try {
        const bodiesData = await fetch(url, options);
        const bodiesDataJson = await bodiesData.json();
        return bodiesDataJson;
    } catch (error) {
        console.error('Error fetching planets data:', error);
    }
};