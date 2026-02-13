
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
      await addDoc(collection(db, "appointments"), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setShowSuccess(true);
      
      setTimeout(() => {
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
      }, 3000);

    } catch (error) {
      console.error("Erreur Firebase:", error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Filtrer les heures pour ne pas afficher le passé si c'est aujourd'hui
  const getFilteredHours = () => {
    const today = new Date().toISOString().split('T')[0];
    if (formData.appointmentDate !== today) return AVAILABLE_HOURS;

    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0');
    const currentMin = now.getMinutes().toString().padStart(2, '0');
    const currentTimeStr = `${currentHour}:${currentMin}`;

    return AVAILABLE_HOURS.filter(h => h > currentTimeStr);
  };

  return (
    <div className="container mx-auto px-6 relative">
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center scale-up-center border-4 border-green-100 max-w-sm">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-lg shadow-green-200">✓</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Rendez-vous Confirmé !</h3>
            <p className="text-slate-500">Votre demande a été enregistrée avec succès. Le Dr. Achour vous contactera pour confirmation.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-20">
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
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-slate-300/50 border border-slate-50 relative overflow-hidden">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Prise de Rendez-vous</h3>
            <p className="text-slate-500 mb-10">Choisissez votre créneau horaire en toute simplicité.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none"
                  placeholder="Nom complet"
                />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  required
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none"
                  placeholder="Téléphone"
                />
              </div>

              <select 
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none"
              >
                <option value="Consultation Générale">Consultation Générale</option>
                <option value="Échographie Médicale">Échographie Médicale</option>
                <option value="Traitement des Douleurs">Traitement des Douleurs</option>
                <option value="Épileptologie">Épileptologie</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-2 tracking-widest">Date souhaitée</label>
                  <input 
                    type="date" 
                    name="appointmentDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.appointmentDate}
                    required
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-2 tracking-widest">Heure disponible</label>
                  <select 
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    required
                    disabled={!formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none disabled:opacity-50"
                  >
                    <option value="">Choisir l'heure</option>
                    {getFilteredHours().map(hour => (
                      <option key={hour} value={hour} disabled={bookedTimes.includes(hour)}>
                        {hour} {bookedTimes.includes(hour) ? '(Indisponible)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none resize-none"
                placeholder="Notes ou questions (Optionnel)"
              ></textarea>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-slate-900 hover:bg-red-700 text-white font-bold py-5 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-4 text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi...
                  </>
                ) : (
                  <>Confirmer le Rendez-vous</>
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
