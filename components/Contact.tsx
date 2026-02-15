
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const AVAILABLE_HOURS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reason: 'Consultation Générale',
    message: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

// Mets à jour ces constantes en haut de ton composant Contact
// Coordonnées GPS exactes du Cabinet Dr Achour
const cabinetLat = "33.8975517";
const cabinetLng = "-5.5744913";
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${cabinetLat},${cabinetLng}`;

  // Charger les créneaux déjà pris pour la date sélectionnée
  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (!formData.appointmentDate) return;
      
      const q = query(
        collection(db, "appointments"),
        where("appointmentDate", "==", formData.appointmentDate)
      );
      
      const querySnapshot = await getDocs(q);
      const times = querySnapshot.docs.map(doc => doc.data().appointmentTime);
      setBookedTimes(times);
    };

    fetchBookedTimes();
  }, [formData.appointmentDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.appointmentDate || !formData.appointmentTime) {
      alert("Veuillez choisir une date et une heure.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Enregistrement en base de données
      await addDoc(collection(db, "appointments"), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setShowSuccess(true);
      
      // Redirection WhatsApp automatique après succès
      setTimeout(() => {
        const waPhone = "212641298235";
        const text = `Bonjour Cabinet Dr. Achour, je suis ${formData.name}. Je souhaite confirmer mon rendez-vous pour : ${formData.reason} le ${formData.appointmentDate} à ${formData.appointmentTime}.`;
        window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
        
        setIsSubmitting(false);
        setShowSuccess(false);
        setFormData({ 
          name: '', 
          phone: '', 
          reason: 'Consultation Générale', 
          message: '',
          appointmentDate: '',
          appointmentTime: ''
        });
      }, 2000);

    } catch (error) {
      console.error("Erreur Firebase:", error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getFilteredHours = () => {
    const today = new Date().toISOString().split('T')[0];
    if (formData.appointmentDate !== today) return AVAILABLE_HOURS;
    const now = new Date();
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return AVAILABLE_HOURS.filter(h => h > currentTimeStr);
  };

  return (
    <div className="container mx-auto px-6 relative">
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center scale-up-center border-4 border-green-100 max-w-sm">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-lg shadow-green-200">✓</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Données enregistrées !</h3>
            <p className="text-slate-500 mb-4 text-sm">Nous vous redirigeons maintenant vers WhatsApp pour la confirmation finale...</p>
            <div className="w-12 h-1 bg-green-200 mx-auto rounded-full overflow-hidden">
                <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out]"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-5/12 space-y-10">
          <div>
            <span className="text-red-700 font-bold tracking-widest uppercase text-xs block mb-4">Localisation & Contact</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">Le Cabinet du <span className="text-red-700">Dr. Achour</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed italic">Situé stratégiquement à Meknès pour un accès facile.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-2xl text-red-700 shadow-xl group-hover:bg-red-700 group-hover:text-white transition-all">📍</div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Adresse</p>
                <p className="text-slate-900 font-bold text-lg leading-tight">
                  Résidence Badr, Imm. A 10, App. 2<br />
                  Meknès - Bab Jdid
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 flex items-center gap-5">
                    <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center text-2xl text-white">📱</div>
                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">GSM & WhatsApp Cabinet </p>
                        <p className="text-white font-black text-xl">06.41.29.82.35</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] flex items-center gap-5">
                <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center text-2xl text-white animate-pulse">🆘</div>
                <div>
                    <p className="text-red-700 text-[10px] font-bold uppercase tracking-widest">Urgences 24/7</p>
                    <p className="text-red-900 font-black text-xl">06.49.29.50.99</p>
                </div>
            </div>
          </div>

          {/* Map Integration */}
        {/* Map Integration */}
{/* Intégration de la carte corrigée */}
<div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-64 lg:h-80 relative group">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.968257008779!2d-5.5744913!3d33.8975517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f5ba01d0d90f9%3A0xc8c0273178a8bd89!2sCabinet%20de%20M%C3%A9decine%20G%C3%A9n%C3%A9rale%20%26%20%C3%89chographie%20El%20Mustapha%20Achour!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma" 
    className="w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
    style={{ border: 0 }} 
    allowFullScreen={true} 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black shadow-lg">
    BAB JDID, MEKNÈS
  </div>
</div>

          <div className="pt-4">
             <a 
               href={mapsUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-900 text-slate-900 font-black py-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-lg text-center"
             >
               <span className="text-xl">🗺️</span> OUVRIR L'ITINÉRAIRE GPS
             </a>
          </div>
        </div>

        <div className="lg:w-7/12">
          <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl border border-slate-50 relative overflow-hidden h-full flex flex-col justify-center">
            <div className="mb-10">
                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Réserver une Consultation</h3>
                <p className="text-slate-500 font-medium">Confirmation directe via WhatsApp après l'envoi.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Nom Complet</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-700 outline-none font-bold"
                      placeholder="Votre nom"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Téléphone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      required
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-700 outline-none font-bold"
                      placeholder="06..."
                    />
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Type de Consultation</label>
                  <select 
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-700 outline-none font-black text-red-700"
                  >
                    <option value="Consultation Générale">Consultation Générale</option>
                    <option value="Échographie Médicale">Échographie Médicale</option>
                    <option value="Prise en charge médicale">Prise en charge médicale</option>
                    <option value="Prise en charge des douleurs">Prise en charge des douleurs</option>
                    <option value="Épileptologie">Épileptologie</option>
                  </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Date</label>
                  <input 
                    type="date" 
                    name="appointmentDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.appointmentDate}
                    required
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Heure</label>
                  <select 
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    required
                    disabled={!formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-black text-red-700"
                  >
                    <option value="">Choisir...</option>
                    {getFilteredHours().map(hour => (
                      <option key={hour} value={hour} disabled={bookedTimes.includes(hour)}>{hour}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-red-700 text-white font-black py-6 rounded-3xl transition-all shadow-2xl flex items-center justify-center gap-4 text-lg transform hover:-translate-y-1"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>CONFIRMER & ENVOYER WHATSAPP</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
