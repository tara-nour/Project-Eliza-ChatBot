import { ChatConfig } from "@/types/chat";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import { mockBotReply } from "@/lib/mockChatBot";

const chatConfig: ChatConfig = {
  botName: "Assistant MédiRDV",
  welcomeMessage:
    "Bonjour ! 👋 Je suis votre assistant de prise de rendez-vous médical. Comment puis-je vous aider aujourd'hui ?",
  placeholder: "Écrivez votre message…",
  onSendMessage: mockBotReply,
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <HowItWorksSection />
        <FAQSection />
      </main>
      <Footer />
      <ChatWidget config={chatConfig} />
    </div>
  );
}
