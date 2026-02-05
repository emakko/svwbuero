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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
      <section
        id="services"
        className="py-16 md:py-24 bg-gray-100 relative services-watermark"
      >
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
              <h3 className="text-lg md:text-xl font-bold text-dark mb-2 md:mb-3">
                {service.title}
              </h3>
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