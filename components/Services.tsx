
import React from 'react';
import { ViewType } from '../App';

export const servicesData = [
  { 
    id: '1', 
    title: 'Consultation Générale', 
    titleAr: 'استشارة عامة', 
    icon: '🩺', 
    imageUrl: '/images/Consultation Générale.webp', 
    desc: 'Un diagnostic rigoureux pour une prise en charge globale de votre santé.' 
  },
  { 
    id: '2', 
    title: 'Échographie Médicale', 
    titleAr: 'الفحص بالصدى', 
    icon: '📟', 
    imageUrl: '/images/Échographie Médicale.webp', 
    desc: 'Examens par ultrasons de haute précision intégrés à la consultation.' 
  },
  { 
    id: '3', 
    title: 'Prise en charge Médicale', 
    titleAr: 'التكفل الطبي', 
    icon: '🏢', 
    imageUrl: '/images/Prise en charge Médicale.jpg', 
    desc: 'Gestion des pathologies aiguës et chroniques avec suivi rationnel.' 
  },
  { 
    id: '4', 
    title: 'Prise en charge des Douleurs', 
    titleAr: 'علاج الآلام', 
    icon: '🧘', 
    imageUrl: '/images/Traitement des Douleurs.webp', 
    desc: 'Traitement spécialisé des douleurs chroniques et neuropathiques.' 
  },
  { 
    id: '5', 
    title: 'Épileptologie', 
    titleAr: 'طب الصرع', 
    icon: '🧠', 
    imageUrl: '/images/Épileptologie.jpg', 
    desc: 'Suivi neurologique expert pour une meilleure qualité de vie.' 
  },
  { 
    id: '6', 
    title: 'Suivi Chronique', 
    titleAr: 'الأمراض المزمنة', 
    icon: '📊', 
    imageUrl: '/images/Suivi Chronique.webp', 
    desc: 'Contrôle précis du diabète et de l\'hypertension artérielle.' 
  }
];

const Services: React.FC<{ onNavigate: (view: ViewType, id?: string) => void; isListView?: boolean }> = ({ onNavigate, isListView }) => {
  const data = isListView ? servicesData.slice(0, 6) : servicesData;

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-24 animate-reveal">
        <span className="text-red-700 font-black tracking-[0.4em] uppercase text-xs mb-3 block">Expertise & Savoir-faire / خبرة وكفاءة</span>
        <h2 className="text-4xl md:text-7xl font-black text-slate-300 leading-tight tracking-tighter">Nos <span className="text-red-700">Services Medicaux</span></h2>
        <p className="text-xl font-arabic font-bold text-slate-400 mt-4 leading-relaxed">رعاية طبية متميزة وفق أعلى المعايير</p>
        <div className="w-40 h-1.5 bg-red-700 mx-auto mt-10 rounded-full shadow-[0_5px_15px_rgba(185,28,28,0.4)]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {data.map((service, i) => (
          <div key={service.id} className="group relative bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl hover:shadow-red-600/10 transition-all duration-700 animate-reveal">
            <div className="relative h-80 overflow-hidden">
              <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent"></div>
              <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-xl w-16 h-16 rounded-3xl flex items-center justify-center text-3xl text-white border border-white/30 group-hover:bg-red-700 group-hover:border-red-500 transition-all duration-500">{service.icon}</div>
              <div className="absolute bottom-8 left-10 text-left">
                <p className="text-red-500 font-arabic font-bold text-xl mb-1">{service.titleAr}</p>
                <h3 className="text-3xl font-black text-white leading-tight">{service.title}</h3>
              </div>
            </div>
            <div className="p-10">
              <p className="text-slate-500 mb-10 font-medium text-lg leading-relaxed line-clamp-2 italic">"{service.desc}"</p>
              <button onClick={() => onNavigate('service-detail', service.id)} className="w-full group/btn bg-slate-900 text-white py-3 rounded-3xl font-black text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-4 shadow-xl">
                <span>DÉTAILS / التفاصيل</span>
                <span className="group-hover/btn:translate-x-2 transition-transform">➔</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
