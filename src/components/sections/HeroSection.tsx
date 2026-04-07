import { Calendar, Shield, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/15 backdrop-blur-md border border-card/20 text-card text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-soft" />
            Assistant disponible 24h/24
          </div>

          <div className="relative py-2">
            {"MédiRDV".split("").map((letter, i) => (
              <span
                key={i}
                className="inline-block animate-letter-reveal"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span
                  className={`text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight animate-shimmer ${
                    letter === "é" || letter === "R" || letter === "D" || letter === "V"
                      ? "bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                  style={
                    letter === "é" || letter === "R" || letter === "D" || letter === "V"
                      ? { backgroundImage: "linear-gradient(90deg, hsl(187 72% 75%), hsl(217 91% 75%), hsl(187 72% 85%), hsl(217 91% 70%))" }
                      : undefined
                  }
                >
                  {letter}
                </span>
              </span>
            ))}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-card leading-[1.08] tracking-tight">
            Prenez rendez-vous
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, hsl(187 72% 63%), hsl(187 72% 80%))" }}>
              simplement.
            </span>
          </h1>

          <p className="text-lg text-card/75 max-w-lg mx-auto leading-relaxed font-light">
            Notre assistant intelligent vous guide pas à pas pour trouver le bon praticien et réserver votre créneau en quelques secondes.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { icon: Calendar, label: "Prise de RDV rapide" },
              { icon: Shield, label: "Données sécurisées" },
              { icon: Clock, label: "Disponible 24/7" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-card/60 font-light">
                <Icon className="w-4 h-4 text-secondary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
