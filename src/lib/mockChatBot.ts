import { ChatMessage } from "@/types/chat";

/**
 * Mock chatbot — remplacez cette fonction par votre propre backend.
 * Elle simule un assistant médical qui aide à la prise de rendez-vous.
 */
export async function mockBotReply(
  userMessage: string,
  _history: ChatMessage[]
): Promise<ChatMessage> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  const lower = userMessage.toLowerCase();
  let content: string;
  let quickReplies: string[] | undefined;

  if (lower.includes("rendez-vous") || lower.includes("rdv") || lower.includes("prendre")) {
    content =
      "Je peux vous aider à prendre rendez-vous ! Pour commencer, pourriez-vous me préciser le type de consultation souhaité ?";
    quickReplies = ["Médecin généraliste", "Spécialiste", "Urgence"];
  } else if (lower.includes("généraliste") || lower.includes("médecin")) {
    content =
      "Très bien ! Voici les créneaux disponibles avec le Dr. Martin :\n\n• Lundi 14h – 15h\n• Mercredi 10h – 11h\n• Vendredi 9h – 10h\n\nQuel créneau vous conviendrait ?";
    quickReplies = ["Lundi 14h", "Mercredi 10h", "Vendredi 9h", "Autre créneau"];
  } else if (lower.includes("spécialiste")) {
    content =
      "Quel type de spécialiste recherchez-vous ?";
    quickReplies = ["Dermatologue", "Cardiologue", "ORL", "Autre"];
  } else if (lower.includes("urgence")) {
    content =
      "En cas d'urgence médicale, appelez le 15 (SAMU) ou le 112. Si votre situation n'est pas une urgence vitale, je peux vous orienter vers une consultation rapide.";
    quickReplies = ["Consultation rapide", "Retour au menu"];
  } else if (lower.includes("lundi") || lower.includes("mercredi") || lower.includes("vendredi")) {
    content =
      "Parfait ! Votre rendez-vous est confirmé. Vous recevrez un SMS de rappel 24h avant. N'oubliez pas d'apporter votre carte vitale. Puis-je vous aider pour autre chose ?";
    quickReplies = ["Annuler un RDV", "Nouveau RDV", "Non merci"];
  } else if (lower.includes("annuler")) {
    content =
      "Pour annuler un rendez-vous, merci de me fournir la date et le nom du praticien.";
  } else if (lower.includes("merci") || lower.includes("non merci")) {
    content =
      "Avec plaisir ! N'hésitez pas à revenir si vous avez besoin d'aide. Bonne journée et prenez soin de vous 😊";
  } else if (lower.includes("bonjour") || lower.includes("salut") || lower.includes("hello")) {
    content =
      "Bonjour ! Je suis votre assistant de prise de rendez-vous médical. Comment puis-je vous aider aujourd'hui ?";
    quickReplies = ["Prendre un RDV", "Annuler un RDV", "Informations pratiques"];
  } else if (lower.includes("information") || lower.includes("horaire")) {
    content =
      "Notre centre médical est ouvert du lundi au vendredi de 8h à 19h, et le samedi de 9h à 13h. Nous disposons de médecins généralistes et spécialistes.";
    quickReplies = ["Prendre un RDV", "Liste des praticiens"];
  } else {
    content =
      "Je comprends votre demande. Pour mieux vous aider, pourriez-vous préciser ce dont vous avez besoin ?";
    quickReplies = ["Prendre un RDV", "Annuler un RDV", "Informations pratiques"];
  }

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content,
    timestamp: new Date(),
    quickReplies,
  };
}
