
import React, { useEffect } from 'react';

const SEO: React.FC = () => {
  useEffect(() => {
    document.title = "Dr. Achour | Cabinet de Médecine Générale & Soins Modernes";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Cabinet du Dr. Achour : Expertise médicale, conseils de bien-être, et prise en charge moderne pour toute la famille. Contactez-nous via WhatsApp.');
    }
  }, []);

  return null;
};

export default SEO;
