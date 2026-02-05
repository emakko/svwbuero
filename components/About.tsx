import React, { useEffect, useRef, useState } from 'react';
import { Award, Users, Wrench, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const About: React.FC = () => {
  const yearsOfExperience = new Date().getFullYear() - 1994;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div 
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="hidden md:block absolute -top-4 -left-4 w-24 h-24 bg-teal-100 rounded-full z-0 opacity-50"></div>
            <div className="hidden md:block absolute -bottom-4 -right-4 w-32 h-32 bg-gray-200 rounded-full z-0"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Michael Wienecke - KFZ Gutachter" 
              className="relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/5] md:aspect-auto"
            />
            
            {/* Experience Badge - Responsive Positioning */}
            <div className="relative -mt-8 mx-6 md:absolute md:bottom-8 md:-left-6 md:m-0 z-20 bg-white p-5 md:p-6 rounded-lg shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] border-l-4 border-teal-500 max-w-xs group hover:border-magenta transition-colors duration-500">
              <div className="flex items-center gap-4">
                {/* Magenta Highlight on number */}
                <div className="text-3xl md:text-4xl font-bold text-magenta group-hover:scale-110 transition-transform duration-300">{yearsOfExperience}+</div>
                <div className="text-xs md:text-sm font-medium text-gray-600 leading-tight">Jahre Erfahrung<br/>als Sachverständiger</div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 pt-4 lg:pt-0">
            <h4 className="text-teal-600 font-semibold tracking-wider uppercase mb-2 text-sm md:text-base flex items-center gap-2">
              <span className="w-8 h-[2px] bg-magenta"></span> Ihr Experte
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-4 md:mb-6">
              Michael Wienecke
            </h2>
            <p className="text-lg font-medium text-gray-800 mb-4">
              Staatlich geprüfter Maschinenbau-Techniker
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
              Meine berufliche Laufbahn begann mit einer soliden handwerklichen Ausbildung, die mir praktische Erfahrung und technisches Verständnis vermittelt hat. Darauf aufbauend habe ich mich zum staatlich geprüften Maschinenbau-Techniker weiterqualifiziert und meine technischen Kenntnisse vertieft.
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
              Seit 1994 bin ich als unabhängiger Sachverständiger für Schaden- und Wertgutachten tätig. Ich arbeite vollkommen unabhängig von Versicherungen. Mein Ziel ist es, Unfallgeschädigten zu ihrem Recht zu verhelfen und sie bei der Durchsetzung ihrer Ansprüche kompetent zu unterstützen.
            </p>

            <div className="mb-8">
              <h5 className="font-bold text-dark mb-3">Spezialisiert auf die Bewertung von:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <Award className="text-teal-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-sm md:text-base">Personenkraftwagen (Pkw)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="text-teal-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-sm md:text-base">Motorräder</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="text-teal-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-sm md:text-base">Nutzfahrzeuge</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-teal-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-sm md:text-base">Sonderfahrzeuge</span>
                </div>
              </div>
            </div>

            <div>
              <Link to="/zertifikate" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 group">
                  Zertifizierungen und Aufzeichnungen
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;