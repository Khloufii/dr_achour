
import React from 'react';

const tips = [
  { title: "Sommeil", content: "Un repos de 7-8h est le premier médicament naturel.", icon: "🌙" },
  { title: "Hydratation", content: "Buvez au moins 1.5L d'eau pour booster votre immunité.", icon: "💧" },
  { title: "Activité", content: "30 min de marche par jour réduit les risques cardiaques de 40%.", icon: "🏃" },
  { title: "Mental", content: "Prenez 5 min pour méditer et réduire votre taux de cortisol.", icon: "🧘" }
];

const Motivation: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Inspiration pour votre Bien-être</h2>
        <p className="text-white/80 text-lg md:text-xl italic">
          "La santé est le trésor le plus précieux que nous possédons. Prenons-en soin ensemble, chaque jour."
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tips.map((tip) => (
          <div 
            key={tip.title}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all transform hover:-translate-y-2 text-center"
          >
            <div className="text-4xl mb-4">{tip.icon}</div>
            <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
            <p className="text-white/80">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Motivation;
