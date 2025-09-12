const DIRECTUS_URL = 'https://strandly.onrender.com/api';
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
    
    // If CORS fails, try with a CORS proxy
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://strandly.onrender.com/api${endpoint}`)}`;
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

      if (!proxyResponse.ok) {
        throw new Error(`Proxy error: ${proxyResponse.status}`);
      }

      return proxyResponse.json();
    } catch (proxyError) {
      console.error('CORS proxy also failed:', proxyError);
      throw error; // Throw original error
    }
  }
};