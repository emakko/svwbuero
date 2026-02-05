import React from 'react';
import SectionHeading from './SectionHeading';

const CookiePolicy: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Cookie-Richtlinie" alignment="left" />
        
        <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-6">
          <p>
            Diese Cookie-Richtlinie erklärt, was Cookies sind und wie wir sie auf unserer Website verwenden.
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">Was sind Cookies?</h3>
          <p>
            Cookies sind kleine Textdateien, die auf Ihrem Computer oder Mobilgerät gespeichert werden, wenn Sie eine Website besuchen. Sie ermöglichen es der Website, sich an Ihre Aktionen und Präferenzen (wie Login, Sprache, Schriftgröße und andere Anzeigeeinstellungen) über einen bestimmten Zeitraum zu erinnern.
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">Wie verwenden wir Cookies?</h3>
          <p>
            Wir verwenden Cookies hauptsächlich für technische Zwecke, um die Funktionalität der Website zu gewährleisten. 
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Notwendige Cookies:</strong> Diese Cookies sind für das Funktionieren der Website unerlässlich. Sie enthalten keine personenbezogenen Daten.</li>
            <li><strong>Präferenz-Cookies:</strong> Wir speichern beispielsweise Ihre Entscheidung, den Cookie-Banner ausgeblendet zu haben.</li>
          </ul>

          <h3 className="text-lg font-bold text-dark mt-4">Verwalten von Cookies</h3>
          <p>
            Sie können Cookies nach Belieben steuern und/oder löschen. Wie das geht, erfahren Sie auf <a href="https://aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">aboutcookies.org</a>. Sie können alle Cookies löschen, die sich bereits auf Ihrem Computer befinden, und Sie können die meisten Browser so einstellen, dass sie nicht abgelegt werden.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;