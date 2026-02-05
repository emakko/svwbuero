import React from 'react';
import SectionHeading from './SectionHeading';

const AGB: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Allgemeine Geschäftsbedingungen" alignment="left" />
        
        <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-6">
          <p className="italic text-sm">Stand: 01.01.2024</p>

          <h3 className="text-lg font-bold text-dark mt-4">1. Geltungsbereich</h3>
          <p>
            Die nachstehenden Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Aufträge und Leistungen des Sachverständigenbüros Michael Wienecke (Auftragnehmer) gegenüber seinen Auftraggebern.
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">2. Auftragserteilung</h3>
          <p>
            Die Beauftragung des Sachverständigen kann mündlich, schriftlich oder per E-Mail erfolgen. Gegenstand des Auftrags ist in der Regel die Erstellung eines Gutachtens über Schäden an Kraftfahrzeugen oder die Bewertung von Fahrzeugen.
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">3. Durchführung des Auftrags</h3>
          <p>
            Der Sachverständige erbringt seine Leistungen unparteiisch, unabhängig und nach bestem Wissen und Gewissen. Der Auftraggeber hat dem Sachverständigen alle für die ordnungsgemäße Erstellung des Gutachtens erforderlichen Unterlagen und Auskünfte wahrheitsgemäß und vollständig zur Verfügung zu stellen.
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">4. Honorar und Zahlungsbedingungen</h3>
          <p>
            Das Honorar des Sachverständigen richtet sich nach der Höhe des Schadens bzw. dem Wert des Fahrzeugs, sofern keine abweichende Vereinbarung getroffen wurde. Bei Unfallhaftpflichtschäden wird das Honorar in der Regel direkt mit der gegnerischen Versicherung abgerechnet (Abtretungserklärung).
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">5. Haftung</h3>
          <p>
            Der Sachverständige haftet für Schäden – gleich aus welchem Rechtsgrund – nur, wenn er diese vorsätzlich oder grob fahrlässig verursacht hat. Für einfache Fahrlässigkeit haftet er nur bei Verletzung wesentlicher Vertragspflichten.
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">6. Urheberrecht</h3>
          <p>
            Der Sachverständige behält sich an den von ihm erstellten Gutachten, Berechnungen und sonstigen Unterlagen das Urheberrecht vor. Eine Weitergabe an Dritte oder eine Veröffentlichung bedarf der Zustimmung, soweit dies nicht dem Zweck des Gutachtens dient (z.B. Einreichung bei der Versicherung).
          </p>

          <h3 className="text-lg font-bold text-dark mt-4">7. Gerichtsstand</h3>
          <p>
            Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Sachverständigenbüros (Musterstadt).
          </p>
        </div>
      </div>
    </section>
  );
};

export default AGB;