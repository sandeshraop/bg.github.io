import { API_KEY } from '../config';

export const removeBackground = async (file: File): Promise<string> => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please set your ClipDrop API key in the config file.');
  }

  const formData = new FormData();
  formData.append('image_file', file);

  try {
    const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      // Handle different error responses
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your ClipDrop API key.');
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Error: ${response.status} ${response.statusText}`
        );
      }
    }

    // Process successful response
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error removing background:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};