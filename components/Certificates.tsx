import React from 'react';
import SectionHeading from './SectionHeading';
import { Award, FileCheck, ShieldCheck, GraduationCap, ExternalLink } from 'lucide-react';

const certificates = [
  {
    title: "Staatlich geprüfter Maschinenbau-Techniker",
    issuer: "Fachschule für Technik",
    year: "1994",
    icon: <GraduationCap size={40} className="text-teal-500" />,
    // HINWEIS: Ersetzen Sie diesen Pfad mit Ihrer echten PDF-Datei im public Ordner
    pdfUrl: "/documents/techniker-urkunde.pdf" 
  },
  {
    title: "Classic Data Bewertungspartner",
    issuer: "Classic Data",
    year: "Aktuell",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/classic-data-zertifikat.pdf"
  },
  {
    title: "Zertifizierter KFZ-Sachverständiger",
    issuer: "Verband der unabhängigen KFZ-Sachverständigen",
    year: "Laufend",
    icon: <ShieldCheck size={40} className="text-teal-500" />,
    pdfUrl: "/documents/sachverstaendigen-zertifikat.pdf"
  },
  {
    title: "Fortbildungen & Seminare",
    issuer: "Verschiedene Fachinstitute",
    year: "Regelmäßig",
    description: "Schwerpunkte: Unfallrekonstruktion, moderne Fahrzeugtechnik und E-Mobilität.",
    icon: <FileCheck size={40} className="text-teal-500" />,
    pdfUrl: "/documents/fortbildungsnachweis.pdf"
  }
];

const Certificates: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Zertifizierungen und Aufzeichnungen" 
          subtitle="Qualität durch Kompetenz, geprüfte Standards und stetige Weiterbildung."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {certificates.map((cert, index) => (
            <a 
              key={index} 
              href={cert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer" // Security best practice for target="_blank"
              className="relative bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-start gap-6 group cursor-pointer hover:-translate-y-1 block"
            >
              {/* Hover Indicator Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-teal-400">
                <ExternalLink size={20} />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                {cert.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-teal-600 transition-colors">{cert.title}</h3>
                <p className="text-teal-600 font-medium mb-1">{cert.issuer}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                   <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-xs font-semibold">{cert.year}</span>
                </div>
                {cert.description && <p className="text-gray-600 mt-3 text-sm leading-relaxed">{cert.description}</p>}
                <p className="mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-teal-500 flex items-center gap-1">
                  Zertifikat ansehen
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h4 className="text-2xl font-bold text-dark mb-4">Warum ist das für Sie wichtig?</h4>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Als unabhängiger KFZ-Gutachter ist fachliche Kompetenz das Fundament meiner Arbeit. Durch regelmäßige Fortbildungen und Prüfungen stelle ich sicher, dass meine Gutachten stets den aktuellen technischen und rechtlichen Standards entsprechen. Dies garantiert Ihnen maximale Sicherheit bei der Durchsetzung Ihrer Ansprüche.
            </p>
            <div className="inline-block px-4 py-2 bg-white border border-teal-200 rounded-full text-teal-700 font-medium text-sm">
                Geprüfte Qualität seit über 25 Jahren
            </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;