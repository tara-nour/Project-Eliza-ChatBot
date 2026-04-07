import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Quels types de praticiens puis-je consulter ?",
    a: "Notre réseau comprend des médecins généralistes, dermatologues, cardiologues, ORL, ophtalmologues et bien d'autres spécialistes. Le chatbot vous orientera vers le bon professionnel.",
  },
  {
    q: "Mes données de santé sont-elles protégées ?",
    a: "Absolument. Toutes vos données sont chiffrées et hébergées conformément au RGPD et aux normes HDS (Hébergement de Données de Santé). Nous ne partageons jamais vos informations sans votre consentement.",
  },
  {
    q: "Puis-je annuler ou modifier un rendez-vous ?",
    a: "Oui, vous pouvez annuler ou modifier votre rendez-vous directement via le chatbot, jusqu'à 2 heures avant le créneau prévu. Un SMS de confirmation vous sera envoyé.",
  },
  {
    q: "Le service est-il gratuit ?",
    a: "La prise de rendez-vous via notre assistant est entièrement gratuite. Seuls les actes médicaux sont facturés selon les tarifs conventionnels.",
  },
  {
    q: "Comment fonctionne le chatbot ?",
    a: "Notre chatbot utilise l'intelligence artificielle pour comprendre votre besoin et vous guider. Il est modulable et évolue constamment pour vous offrir la meilleure expérience possible.",
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
