import React from 'react';
import SectionHeading from './SectionHeading';

const Impressum: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Impressum" alignment="left" />
        
        <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Angaben gemäß § 5 TMG</h3>
            <p>
              Sachverständigenbüro Michael Wienecke<br />
              Musterstraße 42<br />
              12345 Musterstadt
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Kontakt</h3>
            <p>
              Telefon: 0123 456 789<br />
              E-Mail: info@kfz-expert.de
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Umsatzsteuer-ID</h3>
            <p>
              Platzhalter
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Berufsbezeichnung und berufsrechtliche Regelungen</h3>
            <p>
              <strong>Berufsbezeichnung:</strong> KFZ-Sachverständiger (verliehen in der Bundesrepublik Deutschland)<br />
              <strong>Zuständige Kammer:</strong> Handwerkskammer Musterstadt<br />
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Streitschlichtung</h3>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline"> https://ec.europa.eu/consumers/odr/</a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impressum;