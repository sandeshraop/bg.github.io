import { useState } from 'react';
import { removeBackground } from '../utils/api';

export function useImageProcessing() {
  const [isLoading, setIsLoading] = useState(false);

  const processImage = async (file: File): Promise<string> => {
    setIsLoading(true);
    try {
      const result = await removeBackground(file);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { processImage, isLoading };
}
