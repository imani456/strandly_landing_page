const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'https://strandly.onrender.com';
const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN || '3h9pr1rXhkBhbF7xFj6QwUkDKeCmcUzS';

export const directusFetch = async (endpoint: string, options?: RequestInit) => {
  try {
    // Try direct API call first
    const directUrl = `${DIRECTUS_URL}${endpoint}`;
    console.log('Fetching from:', directUrl);
    
    const response = await fetch(directUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
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
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`${DIRECTUS_URL}${endpoint}`)}`,
      `https://corsproxy.io/?${encodeURIComponent(`${DIRECTUS_URL}${endpoint}`)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`${DIRECTUS_URL}${endpoint}`)}`
    ];

    for (let i = 0; i < proxies.length; i++) {
      try {
        const proxyUrl = proxies[i];
        console.log(`Trying CORS proxy ${i + 1}/${proxies.length}:`, proxyUrl);
        
        const proxyResponse = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          ...options,
        });

        if (proxyResponse.ok) {
          console.log(`CORS proxy ${i + 1} succeeded!`);
          return proxyResponse.json();
        } else {
          console.log(`CORS proxy ${i + 1} failed with status:`, proxyResponse.status);
        }
      } catch (proxyError) {
        console.log(`CORS proxy ${i + 1} failed:`, proxyError.message);
        if (i === proxies.length - 1) {
          console.error('All CORS proxies failed');
          throw error; // Throw original error
        }
      }
    }
  }
};