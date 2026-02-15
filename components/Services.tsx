
import React from 'react';
import { ViewType } from '../App';

export const servicesData = [
  {
    id: '1',
    title: 'Consultation Medicale',
    description: 'Suivi de santé complet, diagnostics et soins préventifs pour toute la famille.',
    icon: '🩺',
    imageUrl: '/images/Consultation Générale.webp'
  },
  {
    id: '2',
    title: 'Échographie Médicale',
    description: 'Examens radiologiques par ultrasons précis pour un diagnostic immédiat.',
    icon: '📟',
    imageUrl: '/images/Échographie Médicale.webp'
  },
  {
    id: '3',
    title: 'Prise en charge Médicale',
    description: 'Gestion globale de votre santé avec des protocoles de soins coordonnés et personnalisés.',
    icon: '🏢',
    imageUrl: '/images/Prise en charge Médicale.jpg'
  },
  {
    id: '4',
    title: 'Épileptologie',
    description: 'Diagnostic et suivi neurologique pour les patients souffrant de crises convulsives.',
    icon: '🧠',
    imageUrl: '/images/Épileptologie.jpg'
  },
  {
    id: '5',
    title: 'Pédiatrie',
    description: 'Suivi de croissance et soins infantiles dans un environnement sécurisant.',
    icon: '👶',
    imageUrl: '/images/Pédiatrie.webp'
  },
  {
    id: '6',
    title: 'Suivi Chronique',
    description: 'Gestion du diabète, hypertension et bilans métaboliques réguliers.',
    icon: '📊',
    imageUrl: '/images/Suivi Chronique.webp'
  },
  {
   id: '7',
    title: 'Prise en charge des Douleurs',
    description: 'Traitement spécialisé des douleurs chroniques, articulaires et neuropathiques.',
    icon: '🧘',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  }
];

interface ServicesProps {
  onNavigate: (view: ViewType, id?: string) => void;
  isListView?: boolean;
}

const Services: React.FC<ServicesProps> = ({ onNavigate, isListView }) => {
  const displayData = isListView ? servicesData.slice(0, 6) : servicesData;

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-red-700 font-bold tracking-widest uppercase text-sm">Expertise Médicale</span>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">Nos Services Medicaux</h2>
        <div className="w-20 h-1.5 bg-red-700 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayData.map((service) => (
          <div 
            key={service.id}
            className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-700/10 transition-all duration-500 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-4xl">{service.icon}</div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-base">
                {service.description}
              </p>
              <button 
                onClick={() => onNavigate('service-detail', service.id)}
                className="mt-auto w-full py-4 border-2 border-slate-100 rounded-xl font-bold text-slate-900 hover:bg-red-700 hover:border-red-700 hover:text-white transition-all duration-300"
              >
                Détails complets
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
