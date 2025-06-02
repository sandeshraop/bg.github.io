export const validateFile = async (file: File): Promise<{ valid: boolean; error?: string }> => {
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return Promise.resolve({
      valid: false,
      error: 'Invalid file format. Please upload a JPG, PNG, or WEBP image.',
    });
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return Promise.resolve({
      valid: false,
      error: 'File size exceeds the 10MB limit. Please upload a smaller image.',
    });
  }

  // Check image dimensions using image loading
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      
      // Check if dimensions are too small
      if (img.width < 50 || img.height < 50) {
        resolve({
          valid: false,
          error: 'Image dimensions are too small. Minimum size is 50x50 pixels.',
        });
        return;
      }
      
      // Check if dimensions are too large
      if (img.width > 5000 || img.height > 5000) {
        resolve({
          valid: false,
          error: 'Image dimensions are too large. Maximum size is 5000x5000 pixels.',
        });
        return;
      }
      
      resolve({ valid: true });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        valid: false,
        error: 'Failed to load image. Please ensure it is a valid image file.'
      });
    };
    
    img.src = objectUrl;
  });
};