
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
          La consultation de médecine générale est le pilier fondamental de notre cabinet. Le Dr. Achour, fort de son expérience au C.H.U. Ibn Sina de Rabat et en France, aborde chaque patient avec une vision holistique. 
          
          Lors de votre visite, nous procédons à un examen clinique complet. Cela commence par une écoute attentive de votre anamnèse (historique médical), suivie d'une évaluation physique méticuleuse. Nous traitons les pathologies aiguës telles que les infections respiratoires, les troubles digestifs, ou les douleurs soudaines, tout en assurant un suivi préventif de pointe.
          
          La prévention est au cœur de notre pratique : dépistage de l'hypertension, gestion du cholestérol et conseils sur le mode de vie. Pour nous, une consultation réussie est celle où le patient repart non seulement avec un traitement, mais aussi avec une compréhension claire de son état de santé.
        `;
      case '2':
        return `
          L'échographie médicale est une fenêtre ouverte sur votre santé intérieure. Au cabinet du Dr. Achour, nous utilisons cette technologie non invasive pour obtenir des réponses rapides et précises. Contrairement aux rayons X, l'échographie utilise des ondes sonores (ultrasons), ce qui la rend totalement sûre, y compris pour les femmes enceintes et les enfants.
          
          Nous réalisons des échographies abdominales (foie, vésicule biliaire, pancréas, rate, reins), pelviennes et des tissus mous. Cet outil est crucial pour diagnostiquer des douleurs abdominales inexpliquées, surveiller des kystes ou évaluer des inflammations articulaires. L'avantage majeur de faire votre échographie directement au cabinet est l'intégration immédiate des résultats dans votre plan de soins, évitant ainsi des déplacements multiples.
        `;
      case '4':
        return `
          L'épileptologie est une spécialité de pointe au sein de notre cabinet. Le Dr. Achour a suivi une formation certifiée pour accompagner les patients souffrant de troubles neurologiques convulsifs. Le diagnostic de l'épilepsie demande une rigueur exceptionnelle pour différencier les crises et identifier leur origine.
          
          Nous assurons un suivi neurologique régulier pour ajuster les traitements anti-épileptiques avec la plus grande précision, minimisant ainsi les effets secondaires. Notre approche inclut également une dimension sociale et psychologique importante : nous conseillons les patients sur leur rythme de vie, leur sommeil et leur insertion professionnelle ou scolaire. Vivre avec l'épilepsie est possible grâce à un partenariat de confiance entre le patient et son médecin.
        `;
      default:
        return "Contenu détaillé en cours de rédaction. Le Dr. Achour assure une prise en charge complète de cette spécialité avec les standards médicaux les plus élevés.";
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
          <p className="text-slate-800 text-lg leading-relaxed font-semibold mb-8 border-l-4 border-red-700 pl-6">
            {service.description}
          </p>
          
          <div className="space-y-6 text-slate-600 text-base leading-relaxed">
            {getFullContent(service.id).split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Pourquoi choisir ce soin ?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Expertise spécialisée</li>
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Équipement moderne</li>
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Suivi personnalisé</li>
                <li className="flex items-start gap-3"><span className="text-red-700 font-bold">✓</span> Écoute et bienveillance</li>
              </ul>
            </div>
            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-red-900 mb-4">Prendre RDV maintenant</h3>
              <p className="text-red-800/80 mb-6 text-sm">Réservez votre créneau pour cette consultation spécifique via WhatsApp.</p>
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-red-700 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-red-800 transition-all"
              >
                Contacter le Cabinet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailView;
