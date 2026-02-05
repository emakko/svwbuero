import React, { useState, useRef } from 'react';
import { Send, HelpCircle, Upload, X, FileText, AlertCircle, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import SectionHeading from './SectionHeading';
import Button from './Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    // Person
    type: 'person', // 'person' or 'gesellschaft'
    title: '',
    firstName: '',
    lastName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    birthPlace: '',
    nationality: '',
    address: '',
    zip: '',
    city: '',
    phone: '',
    email: '',
    iban: '',

    // General Questions
    isDriver: '',
    hasLegalProtection: '',
    isTaxDeductible: '',

    // Vehicle
    vehiclePlate: '',
    isLeased: '',
    isFinanced: '',
    isOwner: '',
    hasExistingExpertise: '',
    hasFullInsurance: '',

    // Opponent
    opponentPlate: '',
    opponentTitle: '',
    opponentFirstName: '',
    opponentLastName: '',
    opponentAddress: '',
    opponentZip: '',
    opponentCity: '',

    // Opponent Insurance
    opponentInsuranceName: '',
    opponentInsuranceNumber: '',
    opponentClaimNumber: '',

    // Accident Details
    accidentDay: '',
    accidentMonth: '',
    accidentYear: '',
    accidentHour: '',
    accidentMinute: '',
    accidentLocation: '',
    accidentDescription: '',
    policeRecorded: '',

    // Footer / Extra
    notes: '',
    prefEmail: true,
    prefPhone: true,
    prefPost: false,
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  
  // UI States
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // ReCAPTCHA ref
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onCaptchaChange = async (token: string | null) => {
    if (token) {
      await submitForm(token);
      // Reset captcha after submission attempt so it can be used again if needed
      recaptchaRef.current?.reset();
    }
  };

  const submitForm = async (token: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        // Convert booleans to string for FormData
        data.append(key, value.toString());
      });

      // Append Token
      data.append('g-recaptcha-response', token);

      // Append Files
      files.forEach(file => data.append('files', file));
      additionalFiles.forEach(file => data.append('additionalFiles', file));

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const resData = await response.json().catch(() => ({}));
        throw new Error(resData.error || 'Fehler beim Senden des Formulars.');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, targetSet: React.Dispatch<React.SetStateAction<File[]>>) => {
    if (e.target.files) {
      // Limit file size (example: 10MB) per file or total could be checked here
      targetSet(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeFile = (index: number, targetFiles: File[], targetSet: React.Dispatch<React.SetStateAction<File[]>>) => {
    targetSet(targetFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Execute reCAPTCHA which will trigger onCaptchaChange
    recaptchaRef.current?.execute();
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-200 placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const radioLabelClasses = "flex items-center cursor-pointer mr-6 py-1 select-none hover:text-teal-600 transition-colors";
  const radioInputClasses = "w-5 h-5 text-teal-600 focus:ring-teal-500 border-gray-300 mr-3 cursor-pointer";

  // Helper component for Yes/No Radio groups
  const YesNoRadio = ({ name, value, onChange, options = [{label: 'Ja', val: 'yes'}, {label: 'Nein', val: 'no'}] }: { name: string, value: string, onChange: (val: string) => void, options?: {label: string, val: string}[] }) => (
    <div className="flex flex-wrap gap-4 mt-1">
      {options.map((opt) => (
        <label key={opt.val} className={radioLabelClasses}>
          <input 
            type="radio" 
            name={name} 
            checked={value === opt.val} 
            onChange={() => onChange(opt.val)}
            className={radioInputClasses}
          />
          <span className="text-gray-700 font-medium">{opt.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Kontaktformular" 
          subtitle="Bitte füllen Sie die nachfolgenden Informationen sorgfältig aus."
        />

        <div className="bg-white p-6 md:p-10 lg:p-12 rounded-xl shadow-sm border border-gray-200 relative">
          
          {/* Global Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start gap-3 rounded-r">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold">Senden fehlgeschlagen</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Send className="text-green-600" size={36} />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Vielen Dank!</h4>
              <p className="text-gray-600 text-lg max-w-lg mx-auto mb-8">
                Wir haben Ihre Daten erfolgreich erhalten. Unser Team wird das Gutachten prüfen und sich schnellstmöglich bei Ihnen melden.
              </p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ ...formData, notes: '' }); // Reset partial state if needed
                  setFiles([]);
                  setAdditionalFiles([]);
                }}
                className="text-teal-600 font-bold hover:text-teal-700 hover:underline transition-colors"
              >
                Neues Formular ausfüllen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`space-y-12 ${isSubmitting ? 'opacity-50 pointer-events-none filter blur-[1px]' : ''} transition-all duration-300`}>
              
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your real Site Key in production
                onChange={onCaptchaChange}
              />

              {/* --- 1. Angaben zur Person --- */}
              <div>
                <h3 className="text-2xl font-bold text-dark mb-8 text-center md:text-left border-b pb-4 border-gray-100">Angaben zu Ihrer Person</h3>

                <div className="flex gap-6 mb-8">
                  <YesNoRadio 
                    name="type" 
                    value={formData.type} 
                    onChange={(val) => handleRadioChange('type', val)} 
                    options={[{label: 'Person', val: 'person'}, {label: 'Gesellschaft', val: 'gesellschaft'}]}
                  />
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClasses}>Anrede, Titel</label>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClasses} placeholder="z.B. Herr Dr." />
                    </div>
                    <div>
                      <label className={labelClasses}>Vorname</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClasses} placeholder="Max" />
                    </div>
                    <div>
                      <label className={labelClasses}>Nachname</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClasses} placeholder="Mustermann" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClasses}>Geburtsdatum</label>
                      <div className="flex gap-2">
                        <input type="text" name="birthDay" value={formData.birthDay} onChange={handleChange} className={`${inputClasses} text-center px-2`} placeholder="TT" maxLength={2} />
                        <input type="text" name="birthMonth" value={formData.birthMonth} onChange={handleChange} className={`${inputClasses} text-center px-2`} placeholder="MM" maxLength={2} />
                        <input type="text" name="birthYear" value={formData.birthYear} onChange={handleChange} className={`${inputClasses} text-center px-2`} placeholder="JJJJ" maxLength={4} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses}>Geburtsort</label>
                      <input type="text" name="birthPlace" value={formData.birthPlace} onChange={handleChange} className={inputClasses} placeholder="Musterstadt" />
                    </div>
                    <div>
                      <label className={labelClasses}>Staatsangehörigkeit</label>
                      <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className={inputClasses} placeholder="Deutsch" />
                    </div>
                  </div>

                  <div>
                     <label className={labelClasses}>Anschrift</label>
                     <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClasses} placeholder="Straße und Hausnummer" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>PLZ</label>
                      <input type="text" name="zip" value={formData.zip} onChange={handleChange} className={inputClasses} placeholder="12345" />
                    </div>
                    <div>
                      <label className={labelClasses}>Ort</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClasses} placeholder="Musterstadt" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Telefon</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="+49 123 4567890" />
                    </div>
                    <div>
                      <label className={labelClasses}>E-Mail</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="max@beispiel.de" />
                    </div>
                  </div>

                  <div>
                     <label className={labelClasses}>IBAN</label>
                     <input type="text" name="iban" value={formData.iban} onChange={handleChange} className={inputClasses} placeholder="DE00 0000 0000 0000 0000 00" />
                     <p className="mt-2 text-xs text-gray-500">
                       Die Bankverbindung dient ausschließlich der Erstattung Ihrer Kosten und Ansprüche an Sie.
                     </p>
                  </div>
                </div>
              </div>

              {/* --- 2. Allgemeine Fragen --- */}
              <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100">
                 <h4 className="text-lg font-bold text-dark mb-6">Allgemeine Angaben</h4>
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>Waren Sie der Fahrzeugführer?</label>
                    <YesNoRadio name="isDriver" value={formData.isDriver} onChange={(val) => handleRadioChange('isDriver', val)} />
                  </div>
                  <div>
                    <label className={labelClasses}>Besteht eine Rechtsschutzversicherung?</label>
                    <YesNoRadio name="hasLegalProtection" value={formData.hasLegalProtection} onChange={(val) => handleRadioChange('hasLegalProtection', val)} />
                  </div>
                  <div>
                    <label className={`${labelClasses} flex items-center gap-2`}>
                      Vorsteuerabzugsberechtigt? 
                      <span title="Sind Sie zum Vorsteuerabzug berechtigt (z.B. als Unternehmen)?">
                        <HelpCircle size={16} className="text-gray-400 cursor-help" />
                      </span>
                    </label>
                    <YesNoRadio name="isTaxDeductible" value={formData.isTaxDeductible} onChange={(val) => handleRadioChange('isTaxDeductible', val)} />
                  </div>
                </div>
              </div>

              {/* --- 3. Angaben zum Unfallfahrzeug --- */}
              <div>
                <h3 className="text-2xl font-bold text-dark mb-8 text-center md:text-left border-b pb-4 border-gray-100">Angaben zum Unfallfahrzeug</h3>
                <div className="space-y-8">
                  <div>
                    <label className={labelClasses}>Kennzeichen des eigenen Fahrzeugs</label>
                    <input type="text" name="vehiclePlate" value={formData.vehiclePlate} onChange={handleChange} className={`${inputClasses} max-w-sm font-mono`} placeholder="M-AB 1234" />
                  </div>
                  
                  <div>
                    <label className={labelClasses}>Ist das Fahrzeug geleast?</label>
                    <YesNoRadio name="isLeased" value={formData.isLeased} onChange={(val) => handleRadioChange('isLeased', val)} />
                  </div>

                  <div>
                    <label className={labelClasses}>Ist das Fahrzeug finanziert?</label>
                    <YesNoRadio name="isFinanced" value={formData.isFinanced} onChange={(val) => handleRadioChange('isFinanced', val)} />
                  </div>

                  <div>
                    <label className={labelClasses}>Sind Sie Eigentümer des Unfallfahrzeugs?</label>
                    <YesNoRadio name="isOwner" value={formData.isOwner} onChange={(val) => handleRadioChange('isOwner', val)} />
                  </div>

                  <div>
                    <label className={labelClasses}>Wurde bereits ein Schadengutachten, Kostenvoranschlag oder eine Reparaturrechnung beauftragt/erstellt?</label>
                    <YesNoRadio name="hasExistingExpertise" value={formData.hasExistingExpertise} onChange={(val) => handleRadioChange('hasExistingExpertise', val)} />
                  </div>

                  <div>
                    <label className={labelClasses}>Besteht für das Unfallfahrzeug eine Vollkaskoversicherung?</label>
                    <YesNoRadio 
                      name="hasFullInsurance" 
                      value={formData.hasFullInsurance} 
                      onChange={(val) => handleRadioChange('hasFullInsurance', val)} 
                      options={[
                        {label: 'Ja', val: 'yes'}, 
                        {label: 'Nein', val: 'no'},
                        {label: 'Nicht sicher', val: 'unsure'}
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* --- 4. Angaben zum Unfallgegner --- */}
              <div>
                <h3 className="text-2xl font-bold text-dark mb-8 text-center md:text-left border-b pb-4 border-gray-100">Angaben zum Unfallgegner</h3>
                <div className="space-y-8">
                  <div>
                    <label className={labelClasses}>Kennzeichen des Unfallgegners</label>
                    <input type="text" name="opponentPlate" value={formData.opponentPlate} onChange={handleChange} className={`${inputClasses} max-w-sm font-mono`} placeholder="B-XY 9876" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClasses}>Anrede, Titel (falls bekannt)</label>
                      <input type="text" name="opponentTitle" value={formData.opponentTitle} onChange={handleChange} className={inputClasses} placeholder="Anrede" />
                    </div>
                    <div>
                      <label className={labelClasses}>Vorname (falls bekannt)</label>
                      <input type="text" name="opponentFirstName" value={formData.opponentFirstName} onChange={handleChange} className={inputClasses} placeholder="Vorname" />
                    </div>
                    <div>
                      <label className={labelClasses}>Nachname (falls bekannt)</label>
                      <input type="text" name="opponentLastName" value={formData.opponentLastName} onChange={handleChange} className={inputClasses} placeholder="Nachname" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Anschrift (falls bekannt)</label>
                    <input type="text" name="opponentAddress" value={formData.opponentAddress} onChange={handleChange} className={inputClasses} placeholder="Straße und Hausnummer" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className={labelClasses}>PLZ</label>
                      <input type="text" name="opponentZip" value={formData.opponentZip} onChange={handleChange} className={inputClasses} placeholder="PLZ" />
                    </div>
                    <div>
                       <label className={labelClasses}>Ort</label>
                      <input type="text" name="opponentCity" value={formData.opponentCity} onChange={handleChange} className={inputClasses} placeholder="Ort" />
                    </div>
                  </div>

                  {/* --- Versicherung des Unfallgegners --- */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6">
                     <h5 className="font-bold text-dark mb-4">Versicherung des Unfallgegners</h5>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                           <label className={labelClasses}>Name der Versicherung</label>
                           <input type="text" name="opponentInsuranceName" value={formData.opponentInsuranceName} onChange={handleChange} className={inputClasses} placeholder="z.B. Allianz" />
                        </div>
                        <div>
                           <label className={labelClasses}>Versicherungsscheinnummer</label>
                           <input type="text" name="opponentInsuranceNumber" value={formData.opponentInsuranceNumber} onChange={handleChange} className={inputClasses} placeholder="Nummer" />
                        </div>
                        <div>
                           <label className={labelClasses}>Schadennummer</label>
                           <input type="text" name="opponentClaimNumber" value={formData.opponentClaimNumber} onChange={handleChange} className={inputClasses} placeholder="Nummer" />
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* --- 5. Angaben zum Unfallhergang --- */}
              <div>
                <h3 className="text-2xl font-bold text-dark mb-8 text-center md:text-left border-b pb-4 border-gray-100">Angaben zum Unfallhergang</h3>
                <div className="space-y-8">
                  
                  {/* Date, Time, Location Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                     
                     {/* Date */}
                     <div className="lg:col-span-4">
                        <label className={labelClasses}>Unfalldatum</label>
                        <div className="flex gap-2">
                           <input type="text" name="accidentDay" value={formData.accidentDay} onChange={handleChange} className={`${inputClasses} text-center px-2`} placeholder="TT" maxLength={2} />
                           <input type="text" name="accidentMonth" value={formData.accidentMonth} onChange={handleChange} className={`${inputClasses} text-center px-2`} placeholder="MM" maxLength={2} />
                           <input type="text" name="accidentYear" value={formData.accidentYear} onChange={handleChange} className={`${inputClasses} text-center px-2`} placeholder="JJJJ" maxLength={4} />
                        </div>
                     </div>

                     {/* Time */}
                     <div className="lg:col-span-3">
                        <label className={labelClasses}>Zeit (circa)</label>
                        <div className="flex items-center gap-2">
                           <input type="text" name="accidentHour" value={formData.accidentHour} onChange={handleChange} className={`${inputClasses} text-center`} placeholder="12" maxLength={2} />
                           <span className="font-bold text-gray-400">:</span>
                           <input type="text" name="accidentMinute" value={formData.accidentMinute} onChange={handleChange} className={`${inputClasses} text-center`} placeholder="00" maxLength={2} />
                        </div>
                     </div>

                     {/* Location */}
                     <div className="lg:col-span-5">
                        <label className={labelClasses}>Unfallort/Straße</label>
                        <textarea 
                           name="accidentLocation" 
                           value={formData.accidentLocation} 
                           onChange={handleChange} 
                           className={`${inputClasses} h-[54px] resize-none overflow-hidden pt-3.5 leading-normal`} 
                           placeholder="z.B. Musterstraße 1, Kreuzung"
                           rows={1}
                        />
                     </div>
                  </div>

                  {/* Description */}
                  <div>
                     <label className={labelClasses}>Unfallschilderung</label>
                     <textarea 
                        name="accidentDescription" 
                        value={formData.accidentDescription} 
                        onChange={handleChange} 
                        className={`${inputClasses} h-32 resize-y`} 
                        placeholder="Beschreiben Sie hier kurz den Unfallhergang..."
                     />
                  </div>

                  {/* Police */}
                  <div>
                    <label className={labelClasses}>Wurde der Unfall von der Polizei aufgenommen?</label>
                    <YesNoRadio name="policeRecorded" value={formData.policeRecorded} onChange={(val) => handleRadioChange('policeRecorded', val)} />
                  </div>

                  {/* Image Upload */}
                  <div>
                     <label className={labelClasses}>Bilder vom Unfall</label>
                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 text-center hover:bg-gray-100 transition-colors relative cursor-pointer">
                        <input 
                           type="file" 
                           multiple 
                           onChange={(e) => handleFileChange(e, setFiles)} 
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center">
                           <Upload className="text-teal-500 mb-3" size={32} />
                           <p className="text-gray-700 font-medium mb-1">Bilder hierher ziehen</p>
                           <p className="text-sm text-gray-500">oder klicken zum Auswählen</p>
                        </div>
                     </div>
                     {/* File List Preview */}
                     {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                           {files.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                 <div className="flex items-center gap-3 overflow-hidden">
                                    <FileText size={20} className="text-teal-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 truncate font-medium">{file.name}</span>
                                    <span className="text-xs text-gray-400 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                 </div>
                                 <button type="button" onClick={() => removeFile(idx, files, setFiles)} className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors">
                                    <X size={18} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                </div>
              </div>

              {/* --- 6. Ende des Formulars (NEW) --- */}
              <div>
                <h3 className="text-2xl font-bold text-dark mb-8 text-center md:text-left border-b pb-4 border-gray-100">Abschluss & Dokumente</h3>
                <div className="space-y-8">

                  {/* Additional Documents Upload */}
                  <div>
                     <label className={labelClasses}>Weitere Dokumente hochladen (optional)</label>
                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 text-center hover:bg-gray-100 transition-colors relative cursor-pointer">
                        <input 
                           type="file" 
                           multiple 
                           onChange={(e) => handleFileChange(e, setAdditionalFiles)} 
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center">
                           <FileText className="text-teal-500 mb-3" size={32} />
                           <p className="text-gray-700 font-medium mb-1">Dokumente hierher ziehen</p>
                           <p className="text-sm text-gray-500">PDF, JPG, PNG (Max. 10 MB)</p>
                        </div>
                     </div>
                     <p className="text-xs text-gray-500 mt-2">
                       Z.B. Korrespondenz mit Versicherungen, Nachweise über Sachschäden etc.
                     </p>
                     
                     {/* Additional File List Preview */}
                     {additionalFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                           {additionalFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                                 <div className="flex items-center gap-3 overflow-hidden">
                                    <FileText size={20} className="text-teal-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 truncate font-medium">{file.name}</span>
                                    <span className="text-xs text-gray-400 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                 </div>
                                 <button type="button" onClick={() => removeFile(idx, additionalFiles, setAdditionalFiles)} className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors">
                                    <X size={18} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* Notes */}
                  <div>
                     <label className={labelClasses}>Anmerkungen/Sonstige Hinweise</label>
                     <textarea 
                        name="notes" 
                        value={formData.notes} 
                        onChange={handleChange} 
                        className={`${inputClasses} h-32 resize-y`} 
                        placeholder="Platz für weitere Anmerkungen..."
                     />
                  </div>

                  {/* Preferred Communication */}
                  <div className="bg-teal-50/50 p-6 md:p-8 rounded-xl border border-teal-100">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Checkboxes */}
                      <div className="lg:col-span-4">
                        <label className={`${labelClasses} mb-4 text-base`}>Bevorzugte Kommunikation <span className="text-red-500 font-normal ml-1 text-sm">*</span></label>
                        <div className="space-y-3">
                           <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                              <input 
                                type="checkbox" 
                                name="prefEmail" 
                                checked={formData.prefEmail} 
                                onChange={handleChange}
                                className={radioInputClasses}
                              />
                              <span className="font-semibold text-gray-700">E-Mail</span>
                           </label>
                           <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                              <input 
                                type="checkbox" 
                                name="prefPhone" 
                                checked={formData.prefPhone} 
                                onChange={handleChange}
                                className={radioInputClasses}
                              />
                              <span className="font-semibold text-gray-700">Telefon</span>
                           </label>
                           <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                              <input 
                                type="checkbox" 
                                name="prefPost" 
                                checked={formData.prefPost} 
                                onChange={handleChange}
                                className={radioInputClasses}
                              />
                              <span className="font-semibold text-gray-700">Post</span>
                           </label>
                        </div>
                      </div>

                      {/* Inputs linked to state */}
                      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className={labelClasses}>E-mail <span className="text-red-500 font-normal ml-1">*</span></label>
                           <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="E-Mail Adresse" required />
                        </div>
                        <div>
                           <label className={labelClasses}>Telefon <span className="text-red-500 font-normal ml-1">*</span></label>
                           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="Telefonnummer" required />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 relative">
                <Button 
                    fullWidth 
                    type="submit" 
                    disabled={isSubmitting}
                    className="text-lg py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none bg-teal-600 hover:bg-teal-700"
                >
                  {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={24} />
                          Wird gesendet...
                      </span>
                  ) : "Daten prüfen & absenden"}
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Mit dem Absenden des Formulars stimmen Sie unseren Datenschutzbestimmungen zu.
                </p>
                {/* Overlay while submitting to prevent interaction */}
                {isSubmitting && <div className="absolute inset-0 z-10 bg-white/50 rounded-xl cursor-wait backdrop-blur-[1px]"></div>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;