
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reason: 'Consultation Générale',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "212641298235"; // GSM du docteur
    const text = `Bonjour Dr. Achour,\n\nPatient: ${formData.name}\nNuméro: ${formData.phone}\nMotif: ${formData.reason}\n\nMessage: ${formData.message}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Info Column */}
        <div className="lg:w-1/2">
          <span className="text-red-700 font-bold tracking-widest uppercase text-sm block mb-4">Localisation & Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10">À votre service à <span className="text-red-700">Meknès</span></h2>
          
          <div className="space-y-10 mb-12">
            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-3xl text-red-700 shadow-xl group-hover:bg-red-700 group-hover:text-white transition-all duration-300">📍</div>
              <div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Adresse du Cabinet</p>
                <p className="text-slate-900 font-bold text-xl leading-relaxed">
                  Résidence Badr, Imm. A 10, App. 2<br />
                  Oujeh Arouss Meknès-Rond Point Bab Jdid
                </p>
                <p className="text-slate-500 font-arabic text-lg mt-2">عمارة أ 10 شقة اقامة بدر، وجه عروس مكناس</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-2xl text-blue-800 shadow-lg group-hover:bg-blue-800 group-hover:text-white transition-all duration-300">📞</div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Fixe Cabinet</p>
                        <p className="text-slate-900 font-bold text-lg">06.12.08.56.99</p>
                    </div>
                </div>
                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-2xl text-teal-600 shadow-lg group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">📱</div>
                    <div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">GSM / WhatsApp</p>
                        <p className="text-slate-900 font-bold text-lg">06.41.29.82.35</p>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-6 group p-6 bg-red-50 border-2 border-red-100 rounded-3xl">
              <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl animate-pulse">🆘</div>
              <div>
                <p className="text-red-700 text-sm font-bold uppercase tracking-wider mb-1">Service d'Urgences</p>
                <p className="text-red-900 font-black text-2xl">06.49.29.50.99</p>
                <p className="text-red-600 font-arabic text-lg mt-1">المستعجلات</p>
              </div>
            </div>
          </div>

          <div className="h-72 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13248.33772879669!2d-5.553634!3d33.89352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd957f0f6c2f37c3%3A0x8670c538a7c2f821!2sMeknes!5e0!3m2!1sen!2sdz!4v1700000000000!5m2!1sen!2sdz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:w-1/2">
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-slate-300/50 border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 rounded-bl-[100px]"></div>
            
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Prise de Rendez-vous</h3>
            <p className="text-slate-500 mb-10">Envoyez vos informations et le Dr. Achour vous répondra rapidement.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    required
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none peer placeholder-transparent"
                    placeholder="Nom complet"
                    id="input-name"
                  />
                  <label htmlFor="input-name" className="absolute left-8 top-5 text-slate-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-6 peer-focus:text-xs peer-focus:text-red-700 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-red-700 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">Nom complet</label>
                </div>
                
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none peer placeholder-transparent"
                    placeholder="Téléphone"
                    id="input-tel"
                  />
                  <label htmlFor="input-tel" className="absolute left-8 top-5 text-slate-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-6 peer-focus:text-xs peer-focus:text-red-700 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-red-700 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">Votre téléphone</label>
                </div>

                <div className="relative">
                    <select 
                    name="reason"
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none appearance-none font-medium text-slate-700"
                    >
                    <option value="Consultation Générale">Consultation Générale</option>
                    <option value="Échographie Médicale">Échographie Médicale</option>
                    <option value="Traitement des Douleurs">Traitement des Douleurs</option>
                    <option value="Épileptologie / Neurologie">Épileptologie / Neurologie</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                </div>

                <div className="relative">
                  <textarea 
                    name="message"
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none resize-none peer placeholder-transparent"
                    placeholder="Message"
                    id="input-msg"
                  ></textarea>
                  <label htmlFor="input-msg" className="absolute left-8 top-5 text-slate-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-6 peer-focus:text-xs peer-focus:text-red-700 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-6 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-red-700 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">Notes médicales ou questions</label>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-red-700 text-white font-bold py-6 rounded-2xl transition-all shadow-2xl hover:shadow-red-700/30 transform hover:-translate-y-1 flex items-center justify-center gap-4 text-lg"
              >
                Confirmer par WhatsApp <span>➡️</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
