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
      const errorData = await response.json();
      throw new Error(errorData.errors[0]?.message || 'Failed to fetch data from Directus');
    }

    return response.json();
  } catch (error) {
    console.error('Directus fetch error:', error);
    throw error;
  }
};