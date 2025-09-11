const DIRECTUS_URL = '/api';
const DIRECTUS_TOKEN = '3h9pr1rXhkBhbF7xFj6QwUkDKeCmcUzS';

export const directusFetch = async (endpoint: string, options?: RequestInit) => {
  try {
    const url = `${DIRECTUS_URL}${endpoint}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      // Using same-origin proxy; CORS mode is fine but not required
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
      throw new Error(errorData.errors?.[0]?.message || 'Failed to fetch data from Directus');
    }

    return response.json();
  } catch (error) {
    console.error('Directus fetch error:', error);
    throw error;
  }
};