
import React, { useState, useEffect, useMemo } from 'react';
import { db, auth } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const AVAILABLE_HOURS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const AdminDashboardView: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [newApt, setNewApt] = useState({
    name: '',
    phone: '',
    reason: 'Consultation Générale',
    appointmentDate: '',
    appointmentTime: '',
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

  // Calcul intelligent de la liste filtrée et triée
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

  const bookedTimesForNew = appointments
    .filter(apt => apt.appointmentDate === newApt.appointmentDate)
    .map(apt => apt.appointmentTime);

  const getFilteredHours = () => {
    const today = new Date().toISOString().split('T')[0];
    if (newApt.appointmentDate !== today) return AVAILABLE_HOURS;
    const now = new Date();
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return AVAILABLE_HOURS.filter(h => h > currentTimeStr);
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    await updateDoc(doc(db, "appointments", id), { status: nextStatus });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer ce rendez-vous ?")) {
      await deleteDoc(doc(db, "appointments", id));
    }
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.appointmentDate || !newApt.appointmentTime) {
      alert("Veuillez sélectionner une date et une heure.");
      return;
    }
    setIsAdding(true);
    try {
      await addDoc(collection(db, "appointments"), {
        ...newApt,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setShowAddModal(false);
      setNewApt({ name: '', phone: '', reason: 'Consultation Générale', appointmentDate: '', appointmentTime: '', message: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Erreur lors de l'ajout.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Responsive Drawer */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-white p-8 flex flex-col z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
               <img src="images/logo.png" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter">DR. <span className="text-red-600">ACHOUR</span></h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Admin</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">✕</button>
        </div>
        
        <nav className="space-y-4 flex-grow">
          <button onClick={() => setIsSidebarOpen(false)} className="w-full flex items-center gap-4 bg-red-700 p-4 rounded-2xl font-bold">
            <span>📅</span> Rendez-vous
          </button>
          <button onClick={() => { setShowAddModal(true); setIsSidebarOpen(false); }} className="w-full flex items-center gap-4 hover:bg-white/5 p-4 rounded-2xl text-slate-400 font-bold transition-all">
            <span>➕</span> Nouveau RDV
          </button>
          <a href="/" className="w-full flex items-center gap-4 hover:bg-white/5 p-4 rounded-2xl text-slate-400 font-bold transition-all">
            <span>🏠</span> Voir le site
          </a>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto w-full flex items-center gap-4 hover:bg-red-700/20 p-4 rounded-2xl text-red-500 font-bold transition-all"
        >
          <span>🚪</span> Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full overflow-hidden">
        {/* Admin Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between lg:px-12 lg:py-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-slate-100 rounded-xl"
            >
              <div className="w-6 h-0.5 bg-slate-900 mb-1"></div>
              <div className="w-6 h-0.5 bg-slate-900 mb-1"></div>
              <div className="w-4 h-0.5 bg-slate-900"></div>
            </button>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-slate-900">Tableau de bord</h1>
              <p className="text-slate-500 text-xs lg:text-sm hidden sm:block">Gérez vos consultations quotidiennes.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setShowAddModal(true)}
              className="bg-red-600 text-white p-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all flex items-center gap-2"
            >
              <span className="text-xl">+</span> <span className="hidden sm:inline">Nouveau RDV</span>
            </button>
          </div>
        </header>

        {/* Filters and List Scrollable Area */}
        <div className="flex-grow p-6 lg:p-12 overflow-y-auto">
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow sm:max-w-md">
              <input 
                type="text" 
                placeholder="Rechercher un patient..." 
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
              <option value="pending">En attente</option>
              <option value="completed">Terminés</option>
            </select>
          </div>

          {/* List of Appointments */}
          <div className="grid grid-cols-1 gap-6 pb-20">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                <p className="text-slate-400">Aucun rendez-vous ne correspond à vos critères.</p>
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <div 
                  key={apt.id} 
                  className={`bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm border-l-8 transition-all hover:shadow-lg ${apt.status === 'completed' ? 'border-green-500 opacity-60' : 'border-red-600'}`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg lg:text-xl font-bold text-slate-900">{apt.name}</h3>
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {apt.status === 'completed' ? 'Traité' : 'En attente'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <p className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">📅 {apt.appointmentDate}</p>
                        <p className="text-xs font-black text-red-700 bg-red-50 px-3 py-1.5 rounded-lg">⏰ {apt.appointmentTime}</p>
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1">📱 {apt.phone}</p>
                      </div>
                      <p className="text-slate-400 text-xs italic">{apt.reason}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(apt.id, apt.status)}
                        className={`flex-grow md:flex-none px-6 py-4 rounded-xl font-bold transition-all text-sm ${apt.status === 'completed' ? 'bg-slate-100 text-slate-500' : 'bg-green-600 text-white shadow-lg shadow-green-200'}`}
                      >
                        {apt.status === 'completed' ? 'Rétablir' : 'Fait'}
                      </button>
                      <button 
                        onClick={() => handleDelete(apt.id)}
                        className="p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
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

      {/* Modals and Overlays remain same as before for functionality */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative my-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 text-slate-400 text-xl">✕</button>
            <h3 className="text-2xl font-bold mb-8">Nouveau RDV Manuel</h3>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <input required type="text" placeholder="Nom du patient" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none" value={newApt.name} onChange={e => setNewApt({...newApt, name: e.target.value})} />
              <input required type="tel" placeholder="N° Téléphone" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none" value={newApt.phone} onChange={e => setNewApt({...newApt, phone: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none" value={newApt.appointmentDate} onChange={e => setNewApt({...newApt, appointmentDate: e.target.value})} />
                <select required className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 outline-none" value={newApt.appointmentTime} onChange={e => setNewApt({...newApt, appointmentTime: e.target.value})}>
                  <option value="">Heure</option>
                  {getFilteredHours().map(h => (
                    <option key={h} value={h} disabled={bookedTimesForNew.includes(h)}>{h}</option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={isAdding} className="w-full bg-slate-900 text-white p-5 rounded-xl font-bold shadow-xl">
                {isAdding ? "Enregistrement..." : "Confirmer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardView;
