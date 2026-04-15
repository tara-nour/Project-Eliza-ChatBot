import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Comment prendre rendez-vous avec un praticien ?",
    a: "Décrivez simplement vos symptômes dans le chat. Notre assistant identifie le bon professionnel et vous propose un créneau disponible en quelques secondes. Vous confirmez, c'est fait.",
  },
  {
    q: "Le service est-il disponible la nuit et le week-end ?",
    a: "Oui. L'assistant est disponible 24h/24 et 7j/7. Vous pouvez prendre rendez-vous à tout moment, même en dehors des horaires d'ouverture des cabinets.",
  },
  {
    q: "Quels praticiens sont disponibles ?",
    a: "Notre réseau comprend des médecins généralistes, cardiologues, neurologues, dentistes, ophtalmologues, rhumatologues, gynécologues et gastro-entérologues. Consultez la page \"Nos praticiens\" pour voir leurs disponibilités.",
  },
  {
    q: "Le chatbot peut-il poser un diagnostic ?",
    a: "Non. MédiRDV est un assistant d'orientation, pas un médecin. Il vous guide vers le bon professionnel de santé mais ne remplace en aucun cas une consultation médicale. En cas d'urgence, composez le 15.",
  },
  {
    q: "Puis-je annuler ou modifier un rendez-vous ?",
    a: "Oui, vous pouvez annuler ou modifier votre rendez-vous directement via le chatbot jusqu'à 2 heures avant le créneau prévu.",
  },
  {
    q: "Mes données de santé sont-elles protégées ?",
    a: "Vos données sont traitées conformément au RGPD. MédiRDV fonctionne en local : les échanges ne transitent pas par des serveurs cloud tiers. Vos informations ne sont jamais revendues ni partagées sans votre consentement.",
  },
  {
    q: "La prise de rendez-vous est-elle gratuite ?",
    a: "La prise de rendez-vous via notre assistant est entièrement gratuite. Seuls les actes médicaux sont facturés selon les tarifs conventionnels de chaque praticien.",
  },
  {
    q: "Combien de temps prend la prise de rendez-vous ?",
    a: "En moyenne moins d'une minute. Décrivez votre besoin, confirmez le créneau proposé, c'est tout. Vous recevez une confirmation immédiate.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-foreground">Questions fréquentes</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tout ce que vous devez savoir sur notre service de prise de rendez-vous.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="squircle-shadow-soft">
              <div className="bg-card squircle-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-base font-medium text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-base text-muted-foreground leading-relaxed animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
