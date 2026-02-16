
import React from 'react';

const tips = [
  { title: "Sommeil", content: "Un repos de 7-8h est le premier médicament naturel.", icon: "🌙" },
  { title: "Hydratation", content: "Buvez au moins 1.5L d'eau pour booster votre immunité.", icon: "💧" },
  { title: "Activité", content: "30 min de marche par jour réduit les risques cardiaques de 40%.", icon: "🏃" },
  { title: "Mental", content: "Prenez 5 min pour méditer et réduire votre taux de cortisol.", icon: "🧘" }
];

const expertPillars = [
  {
    titleFr: "Le Médecin au Cœur du Système",
    titleAr: "الطبيب في قلب المنظومة",
    contentFr: "Le médecin généraliste occupe une place centrale dans le système de santé marocain, assurant le premier contact et la coordination des soins.",
    contentAr: "يحتل الطبيب العام مكانة مركزية في المنظومة الصحية المغربية، حيث يضمن الاتصال الأول وتنسيق الرعاية الصحية.",
    icon: "🏥",
    animation: "animate-float",
    color: "from-red-600/30 to-slate-900/30"
  },
  {
    titleFr: "Engagement Citoyen & National",
    titleAr: "التزام مواطن ووطني",
    contentFr: "Une structure de santé citoyenne dévouée au service du citoyen, alignée sur les objectifs nationaux de santé publique.",
    contentAr: "هيكل صحي مواطن مخصص لخدمة المواطن، يتماشى مع الأهداف الوطنية للصحة العامة.",
    icon: "🇲🇦",
    animation: "animate-pulse-glow",
    color: "from-emerald-600/20 to-slate-900/40"
  },
  {
    titleFr: "Expertise & IA Médicale",
    titleAr: "الخبرة والذكاء الاصطناعي الطبي",
    contentFr: "L'intégration de l'IA et des données expertes pour affiner le diagnostic et optimiser le parcours de soin du patient.",
    contentAr: "إدماج الذكاء الاصطناعي والبيانات المتخصصة لتدقيق التشخيص وتحسين مسار رعاية المريض.",
    icon: "🤖",
    animation: "animate-float delay-2",
    color: "from-blue-600/20 to-slate-900/40"
  }
];

const medicalTips = [
  {
    titleFr: "Rigueur Diagnostique",
    titleAr: "الصرامة في التشخيص",
    contentFr: "Chaque cas est traité avec une précision clinique absolue, garantissant une efficacité thérapeutique maximale.",
    contentAr: "تتم معالجة كل حالة بدقة سريرية مطلقة، مما يضمن أقصى قدر من الفعالية العلاجية.",
    icon: "🔬",
    animation: "animate-float"
  },
  {
    titleFr: "Transparence Éthique",
    titleAr: "الشفافية الأخلاقية",
    contentFr: "Partage total de l'information médicale et des coûts pour une relation de confiance inébranlable.",
    contentAr: "المشاركة الكاملة للمعلومات الطبية والتكاليف من أجل علاقة ثقة راسخة.",
    icon: "💎",
    animation: "animate-float delay-3"
  }
];


const Motivation: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
        {expertPillars.map((pillar, idx) => (
          <div 
            key={idx}
            className={`group glass-card p-12 rounded-[4rem] border-2 border-white/5 hover:border-red-600/30 transition-all duration-700 relative overflow-hidden animate-reveal delay-${idx + 1}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-40`}></div>
            <div className="relative z-10">
              <div className={`text-7xl text-white mb-10 inline-block ${pillar.animation}`}>
                {pillar.icon}
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1">{pillar.titleFr}</h3>
                <h3 className="text-3xl font-arabic font-bold text-red-500 leading-tight">{pillar.titleAr}</h3>
              </div>
              <div className="space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed font-medium italic">"{pillar.contentFr}"</p>
                <p className="text-slate-100 text-2xl font-arabic font-bold leading-relaxed">{pillar.contentAr}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Intermédiaire - Texte d'expertise */}
      <div className="max-w-6xl mx-auto mb-32 animate-reveal delay-3">
        <div className="bg-gradient-to-r from-red-600/10 to-transparent p-12 rounded-[4rem] border-l-8 border-red-600 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-2/3 space-y-8">
              <h4 className="text-3xl font-black text-white leading-tight">
                OPTIMISATION DE LA COMMUNICATION <br />
                <span className="text-red-600 uppercase tracking-widest text-lg">Par l'Intelligence Artificielle</span>
              </h4>
              <p className="text-slate-400 text-xl leading-relaxed">
                Le Cabinet du Dr. Achour intègre les dernières avancées technologiques pour formuler et structurer 
                le contenu médical, assurant ainsi une clarté et une précision exemplaire au service du citoyen.
              </p>
            </div>
            <div className="lg:w-1/3 text-center">
                <div className="w-40 h-40 bg-slate-900 rounded-full flex items-center justify-center mx-auto border-4 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.3)] animate-float">
                    <span className="text-6xl">✨</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grille secondaire - Conseils Santé */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {medicalTips.map((tip, idx) => (
          <div 
            key={idx}
            className="flex flex-col lg:flex-row gap-8 items-center bg-white/5 p-12 rounded-[3.5rem] border border-white/10 hover:bg-white/10 transition-all animate-reveal"
          >
            <div className={`text-6xl ${tip.animation}`}>
              {tip.icon}
            </div>
            <div className="space-y-4 text-center lg:text-left">
              <div>
                <h4 className="text-white font-black text-xl uppercase tracking-tighter">{tip.titleFr}</h4>
                <h4 className="text-2xl font-arabic font-bold text-red-500">{tip.titleAr}</h4>
              </div>
              <p className="text-slate-400 text-sm italic">{tip.contentFr}</p>
              <p className="text-slate-200 text-lg font-arabic font-bold">{tip.contentAr}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Finale */}
      <div className="mt-40 text-center animate-reveal">
        <div className="inline-block relative">
          <div className="absolute -inset-10 bg-red-600/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
          <p className="text-3xl md:text-6xl font-arabic font-bold text-white leading-tight mb-8">
            "صحتكم هي هدفنا الأسمى، وخبرتنا هي وسيلتنا لتحقيق ذلك بكل إخلاص"
          </p>
          <div className="flex items-center justify-center gap-4 text-red-600 font-black tracking-widest uppercase text-xl">
            <span className="h-px w-12 bg-red-600"></span>
            Expertise & Engagement
            <span className="h-px w-12 bg-red-600"></span>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white/50">Inspiration pour votre Bien-être</h2>
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
