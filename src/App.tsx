import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import Login from './components/Login';
import ImageUploader from './components/ImageUploader';
import ImageProcessing from './components/ImageProcessing';
import Footer from './components/Footer';
import Header from './components/Header';

const App: React.FC = () => {
  console.log('App component rendered');
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const renderDashboardContent = () => (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Remove Image Background</h2>
        </div>
        <p className="text-gray-600">
          Upload an image to remove its background using AI. Perfect for product photos,
          portraits, and more.
        </p>
      </section>

      <div className="space-y-8">
        {!originalImage ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Image Upload</h3>
              <button onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
              }} className="flex items-center text-red-600 hover:text-red-700 transition-colors">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
            <ImageUploader 
              setOriginalImage={setOriginalImage} 
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Image Processing</h3>
              <button onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/login';
              }} className="flex items-center text-red-600 hover:text-red-700 transition-colors">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
            <ImageProcessing
              originalImage={originalImage}
              processedImage={processedImage}
              setProcessedImage={setProcessedImage}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              error={error}
              setError={setError}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={
          <>
            <Login />
            <Footer />
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <Header />
            {renderDashboardContent()}
            <Footer />
          </>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;