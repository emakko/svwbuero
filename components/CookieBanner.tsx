import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      // Show with a slight delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-dark/95 backdrop-blur-sm text-white p-4 md:p-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] border-t border-gray-700 animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex-1 text-sm md:text-base text-gray-300">
          <p>
            Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
            Einige sind technisch notwendig, andere helfen uns, unser Angebot zu verbessern.
            Weitere Informationen finden Sie in unserer{' '}
            <Link to="/cookies" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
              Cookie-Richtlinie
            </Link>.
          </p>
        </div>
        
        <div className="flex gap-4 flex-shrink-0 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
          >
            Akzeptieren
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;