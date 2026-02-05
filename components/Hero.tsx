import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Button from './Button';

const backgroundImages = [
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1486262715619-72a604e3d7b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  return (
    <section id="home" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden group">
      {/* Background Images Slider */}
      {backgroundImages.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={img} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      
      {/* Overlay - Static */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-800/40 pointer-events-none"></div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white hover:bg-black/30 p-2 rounded-full transition-all duration-300 hidden md:block opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={40} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white hover:bg-black/30 p-2 rounded-full transition-all duration-300 hidden md:block opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={40} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-teal-500 w-8' : 'bg-white/50 hover:bg-white w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left w-full mt-16 md:mt-0">
        <div className="md:w-3/4 lg:w-1/2">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-6 border border-magenta/30 rounded-full bg-gray-900/60 backdrop-blur-sm animate-fade-in-down">
            <span className="w-2 h-2 rounded-full bg-magenta mr-2 animate-pulse"></span>
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">Unabhängig</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6 animate-fade-in-down" style={{ animationDelay: '100ms' }}>
            Ihr Recht auf <span className="text-teal-400 block md:inline">faire Entschädigung</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl md:max-w-none mx-auto md:mx-0 animate-fade-in-down" style={{ animationDelay: '200ms' }}>
            Als unabhängiger KFZ-Gutachter sorge ich für Klarheit nach einem Unfall. 
            Schnell, kompetent und durchsetzungsstark gegenüber Versicherungen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <a href="tel:+49123456789" className="w-full sm:w-auto">
                <Button variant="primary" fullWidth className="text-base py-3.5 sm:py-4">
                Jetzt anrufen
                </Button>
            </a>
          </div>

          {/* Indicators */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-8 text-gray-400 text-sm font-medium justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-magenta"></div>
              <span>Kostenfrei für Geschädigte*</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;