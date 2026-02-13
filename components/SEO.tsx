
import React, { useEffect } from 'react';
import { ViewType } from '../App';

interface SEOProps {
  currentView: ViewType;
}

const SEO: React.FC<SEOProps> = ({ currentView }) => {
  useEffect(() => {
    let title = "Dr. Achour | Cabinet de Médecine Générale & Soins Modernes";
    let description = "Cabinet du Dr. Achour à Meknès : Expertise médicale, échographie et soins modernes pour toute la famille. Prenez rendez-vous en ligne.";

    switch (currentView) {
      case 'services':
        title = "Nos Services Médicaux | Dr. Achour Meknès";
        description = "Découvrez nos spécialités : médecine générale, échographie médicale, traitement des douleurs et épileptologie.";
        break;
      case 'about':
        title = "Le Parcours du Dr. Achour | Expertise & Diplômes";
        description = "En savoir plus sur le Dr. El Mustapha Achour, diplômé de Rabat et de France, expert en soins de proximité.";
        break;
      case 'blog':
        title = "Le Blog Santé | Conseils du Dr. Achour";
        description = "Retrouvez nos articles et conseils pour une meilleure santé au quotidien rédigés par votre médecin.";
        break;
      case 'contact':
        title = "Contact & Prise de RDV | Cabinet Dr. Achour";
        description = "Contactez le cabinet à Meknès. Localisation, téléphone, WhatsApp et formulaire de prise de rendez-vous.";
        break;
      case 'admin':
        title = "Administration | Cabinet Dr. Achour";
        break;
    }

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [currentView]);

  return null;
};

export default SEO;
