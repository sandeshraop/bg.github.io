import React, { useState, useRef } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { validateFile } from '../utils/validation';

interface ImageUploaderProps {
  setOriginalImage: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setOriginalImage }): JSX.Element => {

  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setValidationError(null);
    setUploadStatus('idle');
    const previewUrl = URL.createObjectURL(file);
    
    try {
      const validationResult = await validateFile(file);
      if (validationResult.valid) {
        setUploadStatus('success');
        setOriginalImage(file);
      } else {
        URL.revokeObjectURL(previewUrl);
        setValidationError(validationResult.error || 'Unknown error');
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Error validating file:', error);
      URL.revokeObjectURL(previewUrl);
      setValidationError('Failed to validate file');
      setUploadStatus('error');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <div
          className={`border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="space-y-8">
            <Upload className="mx-auto h-20 w-20 text-gray-400" />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Drop your image here</h3>
              <p className="text-gray-500 text-xl mb-4">
                or
              </p>
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer"
              >
                Browse files
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
            </div>
          </div>
          {validationError && (
            <p className="text-red-700 text-sm">{validationError}</p>
          )}
          {uploadStatus === 'success' && (
            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700 text-sm">File uploaded successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;