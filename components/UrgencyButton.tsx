
import React from 'react';

const UrgencyButton: React.FC = () => {
  const handleCall = () => {
    window.location.href = "tel:0649295099";
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center">
      <button
        onClick={handleCall}
        className="bg-red-600 hover:bg-red-700 text-white w-20 h-20 rounded-2xl shadow-2xl flex flex-col items-center justify-center transition-all transform hover:scale-105 active:scale-95 group animate-emergency border-4 border-white"
        title="URGENCE MÉDICALE"
      >
        <span className="text-3xl mb-1 animate-bounce">🆘</span>
        <span className="text-[10px] font-black tracking-tighter uppercase leading-none">Urgence</span>
      </button>
      
      <div className="mt-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-red-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute -top-12 left-0 whitespace-nowrap">
        <p className="text-red-700 font-bold text-xs uppercase">Appel Direct Urgent</p>
      </div>
      
      <div className="mt-2 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold animate-pulse shadow-lg">
        SERVICE 24/7
      </div>
    </div>
  );
};

export default UrgencyButton;