
import React from 'react';
import { servicesData } from '../components/Services';
import { ViewType } from '../App';

interface ServiceDetailViewProps {
  serviceId: string | null;
  onNavigate: (view: ViewType) => void;
}

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ serviceId, onNavigate }) => {
  const service = servicesData.find(s => s.id === serviceId) || servicesData[0];

  const getFullContent = (id: string) => {
    switch (id) {
      case '1':
        return `
          Diplômé de la Faculté de Médecine de Rabat en 1996, le Dr. Achour pratique une médecine générale basée sur l'excellence diagnostique. Chaque consultation est une opportunité d'allier rigueur scientifique et bienveillance humaine. 
          
          Nous prenons en charge le patient dans sa globalité, en intégrant son profil psychosocial dans la démarche de soin. Qu'il s'agisse de pathologies aiguës ou chroniques, nous établissons des protocoles thérapeutiques clairs, rationnels et documentés. Notre vision du "Médecin Citoyen" implique une transparence totale sur les stratégies de soins, partagées en confiance avec le patient et ses aidants.
        `;
      case '3':
        return `
          La prise en charge médicale au Cabinet Dr. Achour est hiérarchisée et structurée. Nous assurons un suivi continu pour les patients souffrant de pathologies multiples. 
          
          L'objectif est d'exercer avec efficacité au sein d'une structure de santé citoyenne. Nous prenons en compte le contexte socio-économique pour proposer des solutions thérapeutiques adaptées. La communication avec l'entourage et les autres acteurs de soins est au cœur de notre méthode pour garantir la sécurité et la réussite du traitement sur le long terme.
        `;
      case '4':
        return `
          La douleur ne doit plus être une fatalité. Notre service spécialisé dans la prise en charge des douleurs propose une approche multimodale certifiée. 
          
          Nous traitons les douleurs chroniques, articulaires et neuropathiques par une évaluation clinique approfondie. Le Dr. Achour personnalise chaque protocole en fonction de la source de la douleur et de son impact sur la vie quotidienne. Notre mission est de restaurer votre confort et votre mobilité à travers des traitements innovants et un accompagnement constant.
        `;
      default:
        return "Le Dr. Achour assure une prise en charge complète de cette spécialité selon les standards médicaux les plus élevés, en tant que médecin citoyen engagé au service de la santé communautaire.";
    }
  };

  return (
    <div className="py-12 animate-fade-in bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => onNavigate('services')}
          className="flex items-center gap-2 text-slate-500 hover:text-red-700 transition-colors mb-8 font-semibold"
        >
          ← Retour aux services
        </button>

        <div className="relative h-[450px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
          <img src={service.imageUrl} className="w-full h-full object-cover" alt={service.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
              <div>
                <span className="text-6xl block mb-4">{service.icon}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{service.title}</h1>
              </div>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          {/* Fix: changed service.description to service.desc to match the property name in servicesData from components/Services.tsx */}
          <p className="text-slate-800 text-lg leading-relaxed font-semibold mb-8 border-l-4 border-red-700 pl-6">
            {service.desc}
          </p>
          
          <div className="space-y-6 text-slate-600 text-base leading-relaxed">
            {getFullContent(service.id).split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Engagement du Cabinet</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Suivi documenté & rationnel</li>
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Transparence thérapeutique</li>
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Approche psychosociale</li>
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Éducation participative</li>
              </ul>
            </div>
            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-red-900 mb-4">Contact direct</h3>
              <p className="text-red-800/80 mb-6 text-sm">Discutez de votre protocole de soin directement avec le Dr. Achour sur WhatsApp.</p>
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-red-700 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-red-800 transition-all"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailView;
