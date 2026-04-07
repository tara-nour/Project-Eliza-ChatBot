import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🩺</span>
          <span className="font-bold text-foreground text-lg">MédiRDV</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">Comment ça marche</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#" className="px-4 py-2 squircle-sm gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Prendre RDV
          </a>
        </nav>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-3 animate-fade-in-up">
          <a href="#how-it-works" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Comment ça marche</a>
          <a href="#faq" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>FAQ</a>
        </div>
      )}
    </header>
  );
}
