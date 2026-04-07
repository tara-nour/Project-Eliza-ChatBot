import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg">🩺</span>
            <span className="font-semibold text-foreground">MédiRDV</span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">Comment ça marche</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
