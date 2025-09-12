const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'https://strandly.onrender.com';
const DIRECTUS_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN || '3h9pr1rXhkBhbF7xFj6QwUkDKeCmcUzS';

export const directusFetch = async (endpoint: string, options?: RequestInit) => {
  // Use server-side proxy to avoid CORS issues
  const proxyUrl = `/api${endpoint}`;
  console.log('Fetching from proxy:', proxyUrl);
  
  try {
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
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
    console.error('Directus proxy fetch error:', error);
    
    // Fallback to direct API call with no-cors mode
    try {
      console.log('Trying direct API call with no-cors mode...');
      const directUrl = `${DIRECTUS_URL}${endpoint}`;
      
      const response = await fetch(directUrl, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        ...options,
      });

      // Note: no-cors mode returns an opaque response
      // We can't read the response body, but we can check if the request was made
      if (response.type === 'opaque') {
        console.log('Direct API call made (opaque response)');
        // Return mock data or handle gracefully
        throw new Error('CORS blocked - using fallback data');
      }

      return response.json();
    } catch (directError) {
      console.error('Direct API call also failed:', directError);
      
      // Final fallback: return mock/empty data
      console.log('All API calls failed, returning fallback data');
      const { fallbackPosts, fallbackTags } = await import('./fallback-data');
      
      // Return appropriate fallback data based on endpoint
      if (endpoint.includes('post_tags')) {
        return fallbackTags;
      } else if (endpoint.includes('posts')) {
        return fallbackPosts;
      }
      
      return { data: [], meta: { total_count: 0 } };
    }
  }
};