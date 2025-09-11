const DIRECTUS_URL = import.meta.env.DEV ? '/api' : 'https://strandly.onrender.com';
const DIRECTUS_TOKEN = '3h9pr1rXhkBhbF7xFj6QwUkDKeCmcUzS';

export const directusFetch = async (endpoint: string, options?: RequestInit) => {
  try {
    const url = `${DIRECTUS_URL}${endpoint}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url, {
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
    throw error;
  }
};