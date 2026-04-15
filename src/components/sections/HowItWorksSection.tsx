import { MessageCircle, CalendarCheck, Bell } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Décrivez votre besoin",
    description:
      "Indiquez à notre assistant le type de consultation recherché : médecin généraliste, spécialiste, ou urgence.",
  },
  {
    icon: CalendarCheck,
    title: "Choisissez votre créneau",
    description:
      "L'assistant vous propose les disponibilités en temps réel. Sélectionnez le créneau qui vous convient.",
  },
  {
    icon: Bell,
    title: "Recevez votre confirmation",
    description:
      "Un SMS de rappel vous est envoyé 24h avant. Vous pouvez modifier ou annuler à tout moment.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-foreground">Comment ça marche</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Trois étapes simples pour prendre rendez-vous avec votre praticien.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.title} className="bg-card rounded-[18px] p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="w-14 h-14 mx-auto mb-5 squircle bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
