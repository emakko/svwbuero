import React from 'react';
import SectionHeading from './SectionHeading';

const Datenschutz: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Datenschutzerklärung" alignment="left" />
        
        <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-6">
          
          <h3 className="text-xl font-bold text-dark mt-6">1. Datenschutz auf einen Blick</h3>
          <p>
            <strong>Allgemeine Hinweise</strong><br/>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
          
          <h3 className="text-xl font-bold text-dark mt-6">2. Hosting und Content Delivery Networks (CDN)</h3>
          <p>
            <strong>Externes Hosting</strong><br/>
            Diese Website wird bei einem externen Dienstleister gehostet (Cloudflare Pages). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
          </p>

          <h3 className="text-xl font-bold text-dark mt-6">3. Allgemeine Hinweise und Pflichtinformationen</h3>
          <p>
            <strong>Datenschutz</strong><br/>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p>
            <strong>Verantwortliche Stelle</strong><br/>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br/>
            Sachverständigenbüro Michael Wienecke<br/>
            Musterstraße 42<br/>
            12345 Musterstadt<br/>
            E-Mail: m.wienecke@svw-gmbh.de
          </p>

          <h3 className="text-xl font-bold text-dark mt-6">4. Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Kontaktformular</strong><br/>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            <strong>Google reCAPTCHA</strong><br/>
            Wir nutzen „Google reCAPTCHA“ (im Folgenden „reCAPTCHA“) auf dieser Website. Anbieter ist die Google Ireland Limited („Google“).
            Mit reCAPTCHA soll überprüft werden, ob die Dateneingabe auf dieser Website (z. B. in einem Kontaktformular) durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers anhand verschiedener Merkmale.
          </p>

          <h3 className="text-xl font-bold text-dark mt-6">5. Analyse-Tools und Werbung</h3>
          <p>
            Es werden keine Tracking- oder Analyse-Tools (wie Google Analytics) ohne Ihre explizite Zustimmung eingesetzt.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Datenschutz;