const DIRECTUS_URL = 'https://strandly.onrender.com';
const DIRECTUS_TOKEN = '3h9pr1rXhkBhbF7xFj6QwUkDKeCmcUzS';

export const directusFetch = async (endpoint: string, options?: RequestInit) => {
  try {
    // Try direct API call first
    const directUrl = `https://strandly.onrender.com/api${endpoint}`;
    console.log('Fetching from:', directUrl);
    
    const response = await fetch(directUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      // If response isn't JSON (e.g., 404 text), throw a generic error
      let message = 'Failed to fetch data from Directus';
      try {
        const errorData = await response.json();
        message = errorData.errors?.[0]?.message || message;
      } catch (_e) {
        // ignore JSON parse error
      }
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error('Directus fetch error:', error);
    
    // If CORS fails, try with different CORS proxies
    const proxies = [
      `https://cors-anywhere.herokuapp.com/https://strandly.onrender.com${endpoint}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://strandly.onrender.com${endpoint}`)}`,
      `https://thingproxy.freeboard.io/fetch/https://strandly.onrender.com${endpoint}`,
    ];

    for (const proxyUrl of proxies) {
      try {
        console.log('Trying CORS proxy:', proxyUrl);
        
        const proxyResponse = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          ...options,
        });

        if (proxyResponse.ok) {
          return proxyResponse.json();
        }
      } catch (proxyError) {
        console.error('Proxy failed:', proxyUrl, proxyError);
        continue; // Try next proxy
      }
    }
    
    throw error; // All proxies failed
  }
};