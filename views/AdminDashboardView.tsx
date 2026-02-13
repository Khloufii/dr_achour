
import React, { useState, useEffect, useMemo } from 'react';
import { db, auth } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { Appointment } from '../types';

const AVAILABLE_HOURS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const AdminDashboardView: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState<any>(null);
  const [editingApt, setEditingApt] = useState<any>(null);
  
  const [formState, setFormState] = useState<Partial<Appointment>>({
    name: '',
    phone: '',
    reason: 'Consultation Générale',
    appointmentDate: '',
    appointmentTime: '',
    price: '',
    message: ''
  });

  // Écoute en temps réel des rendez-vous
  useEffect(() => {
    const q = query(collection(db, "appointments"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(apt => {
        const matchesSearch = (apt.name?.toLowerCase().includes(searchTerm.toLowerCase()) || apt.phone?.includes(searchTerm));
        const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === 'pending' ? -1 : 1;
        }
        const dateA = new Date(`${a.appointmentDate}T${a.appointmentTime}`).getTime();
        const dateB = new Date(`${b.appointmentDate}T${b.appointmentTime}`).getTime();
        return dateA - dateB;
      });
  }, [appointments, searchTerm, statusFilter]);

  const bookedTimesForDate = (date: string, excludeId?: string) => 
    appointments
      .filter(apt => apt.appointmentDate === date && apt.id !== excludeId)
      .map(apt => apt.appointmentTime);

  const getFilteredHours = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    if (date !== today) return AVAILABLE_HOURS;
    const now = new Date();
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return AVAILABLE_HOURS.filter(h => h > currentTimeStr);
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    await updateDoc(doc(db, "appointments", id), { 
      status: currentStatus === 'pending' ? 'completed' : 'pending' 
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) {
      await deleteDoc(doc(db, "appointments", id));
      if (selectedApt?.id === id) setSelectedApt(null);
    }
  };

  const handleOpenEdit = (apt: any) => {
    setEditingApt(apt);
    setFormState({
      name: apt.name,
      phone: apt.phone,
      reason: apt.reason,
      appointmentDate: apt.appointmentDate,
      appointmentTime: apt.appointmentTime,
      price: apt.price || '',
      message: apt.message || ''
    });
    setShowFormModal(true);
  };

  const handleOpenAdd = () => {
    setEditingApt(null);
    setFormState({
      name: '',
      phone: '',
      reason: 'Consultation Générale',
      appointmentDate: '',
      appointmentTime: '',
      price: '',
      message: ''
    });
    setShowFormModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.appointmentDate || !formState.appointmentTime) {
      alert("Veuillez sélectionner une date et une heure.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (editingApt) {
        // Mode Edition
        await updateDoc(doc(db, "appointments", editingApt.id), {
          ...formState,
          updatedAt: serverTimestamp()
        });
      } else {
        // Mode Création
        await addDoc(collection(db, "appointments"), {
          ...formState,
          status: 'pending',
          createdAt: serverTimestamp()
        });
      }
      setShowFormModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">Chargement du cabinet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden relative font-sans">
      
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-bounce">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border-2 border-red-600">
            <span className="text-xl">✨</span> Opération réussie !
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-white p-8 flex flex-col z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
               <img src="images/logo.png" className="w-full h-full object-cover" alt="Dr. Achour" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter">DR. <span className="text-red-600">ACHOUR</span></h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Administration</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">✕</button>
        </div>
        
        <nav className="space-y-4 flex-grow">
          <button onClick={() => setIsSidebarOpen(false)} className="w-full flex items-center gap-4 bg-red-700 p-4 rounded-2xl font-bold shadow-lg shadow-red-900/20">
            <span>📅</span> Rendez-vous
          </button>
          <button onClick={handleOpenAdd} className="w-full flex items-center gap-4 hover:bg-white/5 p-4 rounded-2xl text-slate-400 font-bold transition-all">
            <span>➕</span> Nouveau RDV
          </button>
          <a href="/" className="w-full flex items-center gap-4 hover:bg-white/5 p-4 rounded-2xl text-slate-400 font-bold transition-all">
            <span>🏠</span> Site Public
          </a>
        </nav>

        <button onClick={handleLogout} className="mt-auto w-full flex items-center gap-4 hover:bg-red-700/20 p-4 rounded-2xl text-red-500 font-bold transition-all border border-red-900/20">
          <span>🚪</span> Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between lg:px-12 lg:py-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-slate-100 rounded-xl">
              <div className="w-6 h-0.5 bg-slate-900 mb-1"></div>
              <div className="w-6 h-0.5 bg-slate-900 mb-1"></div>
              <div className="w-4 h-0.5 bg-slate-900"></div>
            </button>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-slate-900">Tableau de bord</h1>
              <p className="text-slate-500 text-xs lg:text-sm hidden sm:block">Planification et suivi des patients.</p>
            </div>
          </div>
          <button onClick={handleOpenAdd} className="bg-slate-900 text-white p-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl font-bold shadow-lg hover:bg-red-700 transition-all flex items-center gap-2">
            <span className="text-xl">+</span> <span className="hidden sm:inline">Nouveau RDV</span>
          </button>
        </header>

        <div className="flex-grow p-6 lg:p-12 overflow-y-auto bg-[#f8fafc]">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow sm:max-w-md">
              <input 
                type="text" 
                placeholder="Chercher par nom ou téléphone..." 
                className="w-full bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm focus:ring-4 focus:ring-red-700/5 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm outline-none text-sm font-bold text-slate-600"
            >
              <option value="all">Tous les états</option>
              <option value="pending">En attente 🔴</option>
              <option value="completed">Consultés 🟢</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 pb-20">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                <p className="text-slate-400 font-medium">Aucun rendez-vous trouvé.</p>
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <div 
                  key={apt.id} 
                  className={`group bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border-l-8 transition-all hover:shadow-xl ${apt.status === 'completed' ? 'border-green-500 bg-green-50/10' : 'border-red-600'}`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-2 flex-grow cursor-pointer" onClick={() => setSelectedApt(apt)}>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900">{apt.name}</h3>
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {apt.status === 'completed' ? 'Traité' : 'En attente'}
                        </span>
                        {apt.price && (
                          <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black">
                            {apt.price} DH
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <p className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">📅 {apt.appointmentDate}</p>
                        <p className="text-xs font-black text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">⏰ {apt.appointmentTime}</p>
                        {apt.phone && <p className="text-xs font-medium text-slate-500 flex items-center gap-1">📱 {apt.phone}</p>}
                      </div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{apt.reason}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenEdit(apt); }}
                        className="p-4 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(apt.id, apt.status); }}
                        className={`flex-grow md:flex-none px-6 py-4 rounded-xl font-bold transition-all text-sm border ${apt.status === 'completed' ? 'bg-white border-green-200 text-green-600' : 'bg-green-600 border-green-700 text-white shadow-lg shadow-green-200'}`}
                      >
                        {apt.status === 'completed' ? 'Annuler Terminé' : 'Terminer'}
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(apt.id); }}
                        className="p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-100"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Appointment Form Modal (Add/Edit) */}
      {showFormModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[3rem] p-8 lg:p-12 shadow-2xl relative my-auto animate-reveal">
            <button onClick={() => setShowFormModal(false)} className="absolute top-8 right-8 text-slate-400 text-2xl hover:text-slate-900">✕</button>
            
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900">{editingApt ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}</h3>
              <p className="text-slate-500 text-sm mt-1">Renseignez les informations du patient ci-dessous.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Nom du patient</label>
                <input required type="text" placeholder="Ex: Ahmed Benani" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Téléphone</label>
                  <input type="tel" placeholder="06..." className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-red-700/5 focus:border-red-700" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Prix (Optionnel)</label>
                  <input type="number" placeholder="Prix en DH" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-red-700/5 focus:border-red-700" value={formState.price} onChange={e => setFormState({...formState, price: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Date</label>
                  <input required type="date" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-red-700/5 focus:border-red-700" value={formState.appointmentDate} onChange={e => setFormState({...formState, appointmentDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Heure</label>
                  <select required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-red-700/5 focus:border-red-700" value={formState.appointmentTime} onChange={e => setFormState({...formState, appointmentTime: e.target.value})}>
                    <option value="">Choisir...</option>
                    {getFilteredHours(formState.appointmentDate || '').map(h => (
                      <option key={h} value={h} disabled={bookedTimesForDate(formState.appointmentDate || '', editingApt?.id).includes(h)}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Service</label>
                <select className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-red-700/5 focus:border-red-700" value={formState.reason} onChange={e => setFormState({...formState, reason: e.target.value})}>
                    <option value="Consultation Générale">Consultation Générale</option>
                    <option value="Échographie Médicale">Échographie Médicale</option>
                    <option value="Traitement des Douleurs">Traitement des Douleurs</option>
                    <option value="Épileptologie">Épileptologie</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Notes médicales</label>
                <textarea placeholder="Observations particulières..." className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:ring-4 focus:ring-red-700/5 focus:border-red-700 h-24 resize-none" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})}></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold shadow-xl hover:bg-red-700 transition-all mt-4">
                {isSubmitting ? "Enregistrement en cours..." : (editingApt ? "Mettre à jour" : "Confirmer le rendez-vous")}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal (Read Only) */}
      {selectedApt && !showFormModal && (
        <div className="fixed inset-0 z-[105] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-8 lg:p-14 shadow-2xl relative my-auto animate-reveal">
            <button onClick={() => setSelectedApt(null)} className="absolute top-8 right-8 text-slate-400 text-2xl hover:text-slate-900 transition-colors">✕</button>
            
            <div className="mb-10">
              <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4 ${selectedApt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {selectedApt.status === 'completed' ? 'Patient Consulté' : 'En Attente'}
              </span>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">{selectedApt.name}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Téléphone</p>
                <p className="text-xl font-bold text-slate-900">{selectedApt.phone || 'Non renseigné'}</p>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Service</p>
                <p className="text-xl font-bold text-slate-900">{selectedApt.reason}</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Date du RDV</p>
                <p className="text-xl font-bold text-slate-900">📅 {selectedApt.appointmentDate}</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Heure</p>
                <p className="text-xl font-bold text-red-700">⏰ {selectedApt.appointmentTime}</p>
              </div>

              {selectedApt.price && (
                <div className="p-6 bg-slate-900 text-white rounded-3xl border border-white/10 col-span-1 md:col-span-2 shadow-xl">
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">Tarif Consultation</p>
                  <p className="text-3xl font-black">{selectedApt.price} DH</p>
                </div>
              )}
            </div>

            {selectedApt.message && (
              <div className="mb-10 p-8 bg-slate-50 text-slate-700 rounded-[2rem] border border-slate-200">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Commentaire</p>
                <p className="text-lg leading-relaxed italic">"{selectedApt.message}"</p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => { setSelectedApt(null); handleOpenEdit(selectedApt); }}
                className="flex-grow py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl"
              >
                Modifier
              </button>
              <button 
                onClick={() => handleDelete(selectedApt.id)}
                className="px-8 py-5 bg-red-50 text-red-600 rounded-2xl font-black text-lg hover:bg-red-600 hover:text-white transition-all border border-red-100"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardView;
