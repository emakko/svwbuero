import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center',
  light = false
}) => {
  return (
    <div className={`mb-10 md:mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 ${light ? 'text-white' : 'text-dark'}`}>
        {title}
      </h2>
      {subtitle && (
        <div className={`h-1 w-16 md:w-20 bg-teal-500 rounded ${alignment === 'center' ? 'mx-auto' : ''} mb-4`}></div>
      )}
      {subtitle && (
        <p className={`text-base md:text-lg ${light ? 'text-gray-200' : 'text-gray-600'} max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;