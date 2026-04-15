import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PRATICIENS, getNextAvailableSlots } from "@/data/praticiens";
import { Calendar, Clock } from "lucide-react";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
}

export default function Praticiens() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-3">Nos praticiens</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Prenez rendez-vous directement avec l'un de nos professionnels de santé partenaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRATICIENS.map((p) => {
            const slots = getNextAvailableSlots(p, 3);
            return (
              <div key={p.id} className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden flex flex-col">
                <div className="p-6 flex flex-col items-center text-center gap-3">
                  <img
                    src={p.avatar}
                    alt={`Dr. ${p.prenom} ${p.nom}`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h2 className="font-semibold text-foreground text-base">
                      Dr. {p.prenom} {p.nom}
                    </h2>
                    <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {p.specialite}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                </div>

                <div className="border-t border-border px-4 py-4 flex-1 flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Prochaines disponibilités
                  </p>
                  {slots.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Aucun créneau disponible</p>
                  ) : (
                    slots.map((slot) => (
                      <button
                        key={`${slot.date}-${slot.time}`}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-accent hover:bg-primary hover:text-primary-foreground transition-colors text-xs group"
                      >
                        <span className="font-medium">{formatDate(slot.date)}</span>
                        <span className="flex items-center gap-1 text-muted-foreground group-hover:text-primary-foreground/80">
                          <Clock className="w-3 h-3" />
                          {slot.time}
                        </span>
                      </button>
                    ))
                  )}
                </div>

                <div className="px-4 pb-4">
                  <button className="w-full py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                    Voir tous les créneaux
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
