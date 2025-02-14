const API_KEY = "g4G4NjjftXOlyxa/7x8N1g==0DJChry2Bp40XsqB";
const API_URL = "https://api.api-ninjas.com/v1/planets";

/**
 * Fetch data from the given URL.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<object>} - A promise that resolves with the fetched data.
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url, { headers: { "X-Api-Key": API_KEY } });
    return { data: await response.json() };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

export { fetchData };
