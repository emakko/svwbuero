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
              Pirolring 1<br />
              45472 Mülheim an der Ruhr
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Kontakt</h3>
            <p>
              Telefon: 0171 3259698<br />
              E-Mail: m.wienecke@svw-gmbh.de
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Steuer-Nr.</h3>
            <p>
              120/5305/2880
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-2">Berufsbezeichnung und berufsrechtliche Regelungen</h3>
            <p>
              <strong>Berufsbezeichnung:</strong> Kfz-ccSachverständiger für Schaden- und Wertgutachten (verliehen in der Bundesrepublik Deutschland)<br />
              <strong>Zuständige Kammer:</strong> Industrie- und Handelskammer für Essen, Mülheim an der Ruhr, Oberhausen zu Essen <br />
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