import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Award, FileCheck, ShieldCheck, GraduationCap, X, ExternalLink } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const certificates = [
  {
    title: "Diagnose, Kalibrierung & Justierung elektronischer Fahrzeugsysteme",
    issuer: "ZKF/TAK/KTI",
    year: "2019",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page2.pdf",
  },
  {
    title: "Foto-Workshop für Gutachter",
    issuer: "TÜV Rheinland",
    year: "2018",
    icon: <FileCheck size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page1.pdf",
  },
  {
    title: "SilverDAT II Schulung – Kalkulation & Fahrzeugbewertung",
    issuer: "DAT",
    year: "2017",
    icon: <FileCheck size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page10.pdf",
  },
  {
    title: "Oldtimer- und Klassikerbewertung",
    issuer: "GFU",
    year: "2016",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page8.pdf",
  },
  {
    title: "Oldtimer-Seminar",
    issuer: "TÜV Rheinland",
    year: "2016",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page4.pdf",
  },
  {
    title: "Produktschulung Aufbauten (Nutzfahrzeuge)",
    issuer: "FAUN",
    year: "2016",
    icon: <FileCheck size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page7.pdf",
  },
  {
    title: "Schadenmanagement & Schadenrecht",
    issuer: "TÜV Rheinland",
    year: "2016",
    icon: <FileCheck size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page11.pdf",
  },
  {
    title: "Fachkunde für Arbeiten an HV-eigensicheren Systemen",
    issuer: "TAK",
    year: "2015",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page5.pdf",
  },
  {
    title: "Smart-Repair Workshop",
    issuer: "SRC",
    year: "2015",
    icon: <FileCheck size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page6.pdf",
  },
  {
    title: "Pkw-Unfallinstandsetzung & Lackierung",
    issuer: "Mercedes-Benz Global Training",
    year: "2013",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page12.pdf",
  },
  {
    title: "Pkw-Unfallinstandsetzung für Sachverständige",
    issuer: "Mercedes-Benz Global Training",
    year: "2012",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page13.pdf",
  },
  {
    title: "Roadshow Seminar – Unfallwagenmarkt, Bewertung, Prozesse",
    issuer: "AUTOonline ",
    year: "2010",
    icon: <Award size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page3.pdf",
  },
  {
    title: "Fachseminar für Kfz-Sachverständige – Restwertermittlung, Unfallfahrzeuge",
    issuer: "AUTOonline",
    year: "2006",
    icon: <GraduationCap size={40} className="text-teal-500" />,
    pdfUrl: "/documents/pdf/page9.pdf",
  }
];

const Certificates: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Zertifizierungen" 
          subtitle="Qualität durch Kompetenz, geprüfte Standards und stetige Weiterbildung."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedPdf(cert.pdfUrl)}
              className="relative bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-start gap-6 group cursor-pointer hover:-translate-y-1"
            >
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
                  Vorschau ansehen
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- MODAL --- */}
        {selectedPdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
            <div className="relative bg-white rounded-2xl max-w-4xl w-full my-8 p-4 md:p-8">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPdf(null)}
                className="fixed top-6 right-6 z-[60] p-3 bg-teal-600 hover:bg-teal-700 rounded-full text-white shadow-xl transition-transform hover:scale-110"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center">
                <Document
                  file={selectedPdf}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div className="py-20 text-teal-600 font-bold">Lade Dokument...</div>}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="mb-10 last:mb-0 shadow-lg border border-gray-200">
                     <Page 
                        pageNumber={index + 1} 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false}
                        width={Math.min(window.innerWidth * 0.7, 550)} 
                        className="mx-auto"
                      />
                      <div className="bg-gray-50 py-2 text-center text-xs text-gray-400 border-t border-gray-100">
                        Seite {index + 1} von {numPages}
                      </div>
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          </div>
        )}

        {/* --- Footer Info Box --- */}
        <div className="mt-16 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-sm">
            <h4 className="text-2xl font-bold text-dark mb-4">Warum ist das für Sie wichtig?</h4>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Als unabhängiger KFZ-Gutachter ist fachliche Kompetenz das Fundament meiner Arbeit. Durch regelmäßige Fortbildungen und Prüfungen stelle ich sicher, dass meine Gutachten stets den aktuellen technischen und rechtlichen Standards entsprechen. Dies garantiert Ihnen maximale Sicherheit bei der Durchsetzung Ihrer Ansprüche.
            </p>
            <div className="inline-block px-4 py-2 bg-white border border-teal-200 rounded-full text-teal-700 font-medium text-sm">
                Geprüfte Qualität seit über 32 Jahren
            </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;