import { Scissors, User, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchCredits } from '../utils/apiCredits';

const Header = () => {
  const [credits, setCredits] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 5000);
  };

  const fetchCreditsCount = async () => {
    try {
      const credits = await fetchCredits();
      setCredits(credits);
    } catch (error) {
      console.error('Error fetching credits:', error);
      setCredits(0);
    }
  };

  useEffect(() => {
    // Fetch credits immediately
    fetchCreditsCount();
    
    // Set up interval to fetch credits every 30 seconds
    const interval = setInterval(fetchCreditsCount, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <div className="flex items-center">
          <Scissors className="h-6 w-6 text-purple-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">
            Background<span className="text-purple-600">Remover</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Credits: {credits}</span>
          </div>
          <a 
            href="https://clipdrop.co/apis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
          >
            Powered by ClipDrop API
          </a>
          <div 
            className="relative group" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <User className="h-5 w-5" />
            </button>
            
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              style={{ display: isHovered ? 'block' : 'none' }}
            >
              <div className="px-4 py-3">
                <h3 className="text-sm font-medium text-gray-900">P Sandesh Rao</h3>
                <p className="text-xs text-gray-500">Full Stack Developer</p>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <a 
                  href="https://tinyurl.com/sandeshraop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors block"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;