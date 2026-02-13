
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ViewType } from '../App';

interface LoginViewProps {
  onNavigate: (view: ViewType) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onNavigate('admin');
    } catch (err: any) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl animate-fade-in">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-red-700 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-xl shadow-red-200">🔐</div>
          <h2 className="text-3xl font-bold text-slate-900">Espace Admin</h2>
          <p className="text-slate-500 mt-2">Cabinet Dr. Achour</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-medium mb-8 text-center border border-red-100">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-700 font-bold mb-2 ml-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none"
              placeholder="admin@cabinetachour.com"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-2 ml-2">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-red-700/5 focus:border-red-700 transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-red-700 text-white font-bold py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Se connecter"}
          </button>
        </form>

        <button 
          onClick={() => onNavigate('home')}
          className="w-full mt-6 text-slate-400 font-medium hover:text-slate-600 transition-colors text-sm"
        >
          Retour au site public
        </button>
      </div>
    </div>
  );
};

export default LoginView;
