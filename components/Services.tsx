import React, { useEffect, useRef, useState } from 'react';
import { CarFront, Scale } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Unfallgutachten",
    description: "Detaillierte Schadensfeststellung zur Durchsetzung Ihrer Ansprüche gegenüber der Versicherung des Unfallgegners.",
    icon: <CarFront size={28} />
  },
  {
    title: "Oldtimerbewertung",
    description: "Spezialisierte Bewertung (Classic Data) für die Versicherungseinstufung Ihres klassischen Fahrzeugs.",
    icon: <Scale size={28} />
  }
];

const Services: React.FC = () => {
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
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-100 relative overflow-hidden">
      {/* Background SVG Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 612 408" 
          className="absolute -right-[20%] -bottom-[20%] md:-right-[10%] md:-bottom-[20%] w-[140%] md:w-[70%] h-auto opacity-[0.1] -rotate-12 transform-gpu"
          aria-hidden="true"
        >
          <g fill="#22ad96" fillRule="evenodd">
            <path d="m92 270-2 4v3l-4 8-2 8-2 3v2l2 1 1-1 1 1 2-1 2 1h30l1-2-2-2h-1l-1-2-5-5h-1l-3-3v-1h-1l-14-14Zm14-38-8 8-4 10 1 15 36 34 10-1 11-5 4-5 3-8-1-16-31-33-14-1Zm259-5h-14l-1 1-2-1h-4l-1 1v3l1 1v8l1 1v10l1 1v10h2l1-1 5-10 2-2v-2l3-4 1-4 2-2 4-8Zm-62 0v72h29l12-25-3-31-1-1v-13l-2-2Zm-41 0-1 1v34l-1 1v36h27l12-22v-49l-1-1Zm-131 0v2h1l1 2h1l2 2v1l2 1 2 2v1h1l1 2 2 2h1l1 2 2 1 1 2 2 2h1l4 5h1l2 2h2v-2l1-1v-2l1-1v-2l1-1v-2l1-1v-2l2-4v-3l2-4v-4l2-1-1-1 1-1Z"/>
            <path d="m133 352 419 3L344 40l-60 90h40l19-27 141 212-282 1 3-9-42-1Z"/>
          </g>
          <path d="m171 226-1 2 1-1 2 2v7l3 12v7l7 43 1 1h27l12-17v-9l-4-15v-8l-5-23h-42Zm147-89h-39l-60 89 8 49 35-49 55-84Z" fill="#de3e8d" fillRule="evenodd"/>
        </svg>
      </div>

      <div 
        ref={sectionRef}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <SectionHeading 
          title="Leistungen" 
          subtitle="Wir bieten Ihnen das komplette Spektrum der KFZ-Sachverständigenleistung – unabhängig und professionell."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white/95 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 group hover:border-b-4 hover:border-b-magenta"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 mb-4 md:mb-6 group-hover:bg-magenta group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-dark mb-2 md:mb-3">{service.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;