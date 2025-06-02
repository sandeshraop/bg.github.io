import { API_KEY } from '../config';

export const fetchCredits = async (): Promise<number> => {
  try {
    console.log('Fetching credits with API key:', API_KEY.substring(0, 5) + '...' + API_KEY.substring(API_KEY.length - 5));
    
    const response = await fetch('https://api.clipdrop.co/usage', {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Response error data:', errorData);
      
      if (response.status === 401) {
        throw new Error('API key is invalid or expired');
      }
      throw new Error(`Failed to fetch credits: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data);
    
    // The response format might be different, let's check different properties
    const credits = data.credits?.remaining || data.remaining_credits || data.credits || 0;
    console.log('Extracted credits:', credits);
    
    return credits;
  } catch (error) {
    console.error('Error fetching credits:', error);
    return 0;
  }
};
