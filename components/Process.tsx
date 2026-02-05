import React, { useState, useEffect, useRef } from 'react';
import { Phone, Search, FileSignature, HandCoins } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { StepItem } from '../types';

const steps: StepItem[] = [
  { id: 1, title: 'Kontakt aufnehmen', description: 'Rufen Sie uns an. Wir beraten Sie sofort kostenlos.' },
  { id: 2, title: 'Fahrzeugbesichtigung', description: 'Wir besichtigen Ihr Fahrzeug bei Ihnen vor Ort, in der Werkstatt oder bei uns.' },
  { id: 3, title: 'Gutachtenerstellung', description: 'Wir erstellen ein detailliertes Gutachten mit Fotos und Schadenskalkulation.' },
  { id: 4, title: 'Abwicklung & Auszahlung', description: 'Versand an die Versicherung und Anwalt. Sie erhalten Ihr Geld.' },
];

const icons = [Phone, Search, FileSignature, HandCoins];

const Process: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
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
    <section id="process" className="py-16 md:py-24 bg-white text-dark relative overflow-hidden">
      {/* Subtle Background Pattern adjusted for light background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}></div>
      
      <div 
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <SectionHeading 
          title="Der Ablauf" 
          subtitle="In nur 4 Schritten zu Ihrem Recht – wir kümmern uns um alles."
          light={false}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mt-12 md:mt-24">
          {steps.map((step, index) => {
            const Icon = icons[index];
            const isHovered = hoveredStep === step.id;
            const isNextHovered = hoveredStep === step.id + 1;
            const isPrevHovered = hoveredStep === step.id - 1;

            return (
              <div 
                key={step.id} 
                className="relative flex flex-col items-center text-center group cursor-default"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* --- CONNECTOR LINES (Between Steps) --- */}
                
                {/* Desktop Connector (Right side of current item, connecting to next) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-gray-200 -z-10 overflow-hidden rounded-full">
                    {/* Gradient moving Right (triggered by current step) */}
                    <div 
                      className={`absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-magenta to-transparent transition-opacity duration-500 ease-out ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                    />
                    
                    {/* Gradient moving Left (triggered by next step) */}
                    <div 
                      className={`absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-magenta to-transparent transition-opacity duration-500 ease-out ${isNextHovered ? 'opacity-100' : 'opacity-0'}`} 
                    />
                  </div>
                )}
                
                {/* Mobile Connector (Bottom of current item, connecting to next) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute top-20 left-1/2 w-[2px] h-full bg-gray-200 -z-10 -translate-x-1/2 overflow-hidden rounded-full">
                     {/* Gradient moving Down (triggered by current step) */}
                     <div 
                      className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-magenta to-transparent transition-opacity duration-500 ease-out ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                    />
                     {/* Gradient moving Up (triggered by next step) */}
                     <div 
                      className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-magenta to-transparent transition-opacity duration-500 ease-out ${isNextHovered ? 'opacity-100' : 'opacity-0'}`} 
                    />
                  </div>
                )}
                
                {/* --- ICON CIRCLE --- */}
                {/* Using ring-offset and specific shadows for sharper look */}
                <div className={`
                  relative w-20 h-20 rounded-full flex items-center justify-center mb-6 
                  transition-all duration-300 transform-gpu
                  ${isHovered ? 'scale-110 -translate-y-2' : 'scale-100'}
                `}>
                  {/* Background & Base Shadow */}
                  <div className={`
                    absolute inset-0 rounded-full bg-teal-500 transition-all duration-300
                    ${isHovered ? 'shadow-[0_0_30px_rgba(218,0,127,0.6)]' : 'shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_20px_rgba(0,175,140,0.3)]'}
                  `}></div>

                  {/* Border Ring (Separate element for crispness) */}
                  <div className={`
                    absolute inset-0 rounded-full border-[3px] transition-colors duration-300 z-10
                    ${isHovered ? 'border-magenta' : 'border-white'}
                  `}></div>
                  
                  {/* Icon */}
                  <Icon 
                    size={32} 
                    className={`relative z-20 transition-colors duration-300 text-white`} 
                    strokeWidth={1.5}
                  />
                </div>
                
                {/* --- TEXT CONTENT --- */}
                <h3 className="text-xl font-bold mb-3 text-dark">
                  <span className="inline-block mr-1 text-magenta">
                    {step.id}.
                  </span>
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm px-4 md:px-2 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;