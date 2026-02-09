
import React, { useState } from 'react';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoImg = "images/profil1.jpg";

  const handleOpenWhatsApp = () => {
    const phone = "212641298235";
    const text = "Bonjour Dr. Achour, je souhaiterais obtenir des informations sur vos services.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end">
      {/* Fenêtre de discussion simulée */}
      {isOpen && (
        <div className="mb-6 w-[320px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Header de la fenêtre */}
          <div className="bg-slate-900 p-6 flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-700 shadow-lg">
                <img src={logoImg} alt="Dr. Achour" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Cabinet Dr. Achour</p>
              <p className="text-green-400 text-[10px] font-medium uppercase tracking-widest">En ligne</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Corps du message */}
          <div className="p-6 bg-slate-50">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[90%]">
              <p className="text-slate-700 text-sm leading-relaxed">
                Bonjour ! 👋 <br />
                Comment pouvons-nous vous aider aujourd'hui ? 
                Le Dr. Achour et son équipe vous répondent rapidement.
              </p>
              <p className="text-[10px] text-slate-400 mt-2 text-right">À l'instant</p>
            </div>
          </div>

          {/* Pied de la fenêtre avec bouton d'action */}
          <div className="p-6 bg-white border-t border-slate-50">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ouvrir une discussion
            </button>
          </div>
        </div>
      )}

      {/* Bouton de déclenchement (Message Icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 group relative border-4 border-white ${isOpen ? 'bg-red-700' : 'bg-slate-900'}`}
        title="Nous contacter"
      >
        {!isOpen ? (
          <div className="relative">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white animate-pulse">1</span>
          </div>
        ) : (
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
