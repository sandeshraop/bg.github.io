import React from 'react';
import Button from './ui/button';
import Spinner from './ui/spinner';
import { Download, AlertCircle } from 'lucide-react';
import { useImageProcessing } from '../hooks/useImageProcessing';

interface ImageProcessingProps {
  originalImage: File | null;
  processedImage: string | null;
  setProcessedImage: (image: string | null) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const ImageProcessing: React.FC<ImageProcessingProps> = ({
  originalImage,
  processedImage,
  setProcessedImage,
  isProcessing,
  setIsProcessing,
  error,
  setError,
}) => {
  const { processImage, isLoading } = useImageProcessing();

  const handleProcessImage = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      const result = await processImage(originalImage as File);
      setProcessedImage(result);
    } catch (err) {
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {originalImage && (
          <div className="relative w-1/2 max-w-xl aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={originalImage ? URL.createObjectURL(originalImage) : ''}
              alt="Original"
              className="w-full h-full object-cover"
              onLoad={() => URL.revokeObjectURL(originalImage as any)}
            />
            <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded">
              <span className="text-sm text-gray-600">Original</span>
            </div>
          </div>
        )}
        
        {processedImage && (
          <div className="relative w-1/2 max-w-xl aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm">
            <img
              src={processedImage}
              alt="Processed"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded">
              <span className="text-sm text-gray-600">Processed</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="primary"
            onClick={handleProcessImage}
            disabled={isProcessing || isLoading || !originalImage}
            className="flex-1"
          >
            {isProcessing || isLoading ? (
              <>
                <Spinner className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                <span>Process Image</span>
              </>
            )}
          </Button>
          {processedImage && (
            <Button
              variant="success"
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageProcessing;