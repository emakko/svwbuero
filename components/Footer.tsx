import React, { useState } from 'react';
import { Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 408" className="h-12 w-auto bg-white p-1 rounded">
                <g fill="#22ad96" fillRule="evenodd">
                    <path d="m92 270-2 4v3l-4 8-2 8-2 3v2l2 1 1-1 1 1 2-1 2 1h30l1-2-2-2h-1l-1-2-5-5h-1l-3-3v-1h-1l-14-14Zm14-38-8 8-4 10 1 15 36 34 10-1 11-5 4-5 3-8-1-16-31-33-14-1Zm259-5h-14l-1 1-2-1h-4l-1 1v3l1 1v8l1 1v10l1 1v10h2l1-1 5-10 2-2v-2l3-4 1-4 2-2 4-8Zm-62 0v72h29l12-25-3-31-1-1v-13l-2-2Zm-41 0-1 1v34l-1 1v36h27l12-22v-49l-1-1Zm-131 0v2h1l1 2h1l2 2v1l2 1 2 2v1h1l1 2 2 2h1l1 2 2 1 1 2 2 2h1l4 5h1l2 2h2v-2l1-1v-2l1-1v-2l1-1v-2l2-4v-3l2-4v-4l2-1-1-1 1-1Z"/>
                    <path d="m133 352 419 3L344 40l-60 90h40l19-27 141 212-282 1 3-9-42-1Z"/>
                </g>
                <path d="m171 226-1 2 1-1 2 2v7l3 12v7l7 43 1 1h27l12-17v-9l-4-15v-8l-5-23h-42Zm147-89h-39l-60 89 8 49 35-49 55-84Z" fill="#de3e8d" fillRule="evenodd"/>
              </svg>
              <span className="font-bold text-xl tracking-tight text-white">
                Sachverständigenbüro Michael Wienecke
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Ihr zertifizierter und unabhängiger Partner für KFZ-Gutachten, Fahrzeugbewertungen und Beweissicherung.
              Vertrauen Sie auf Kompetenz und Fairness.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/michael-wienecke-9454aa136/" className="text-gray-400 hover:text-teal-500 transition-colors bg-gray-800 p-2 rounded-full"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Legal (Rechtliches) */}
          <div>
             <h4 className="text-lg font-bold mb-6">Rechtliches</h4>
             <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/impressum" className="hover:text-teal-500 transition-colors">Impressum</Link></li>
                <li><Link to="/datenschutz" className="hover:text-teal-500 transition-colors">Datenschutz</Link></li>
                <li><Link to="/agb" className="hover:text-teal-500 transition-colors">AGB</Link></li>
                <li><Link to="/cookies" className="hover:text-teal-500 transition-colors">Cookies</Link></li>
             </ul>
          </div>

          {/* Contact Small */}
          <div>
            <h4 className="text-lg font-bold mb-6">Schnellkontakt</h4>
            <div className="text-sm text-gray-400 space-y-4">
              <div className="flex items-start gap-3">
                 <span className="block w-16 text-gray-500 flex-shrink-0">Anschrift:</span>
                 <span>Pirolring 1, 45472 Mülheim an der Ruhr</span>
              </div>
              <div className="flex items-center gap-3">
                 <span className="block w-16 text-gray-500 flex-shrink-0">Tel:</span>
                 <a href="tel:0171 3259698" className="text-white font-medium hover:text-teal-500">0171 3259698</a>
              </div>
              <div className="flex items-center gap-3">
                 <span className="block w-16 text-gray-500 flex-shrink-0">Mail: </span>
                 <a href="mailto:info@kfz-expert.de" className="hover:text-teal-500">m.wienecke@svw-gmbh.de</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sachverständigenbüro Michael Wienecke. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;