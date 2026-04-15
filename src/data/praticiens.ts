export interface TimeSlot {
  date: string; // "2026-04-17"
  time: string; // "09:00"
  available: boolean;
}

export interface Praticien {
  id: string;
  nom: string;
  prenom: string;
  specialite: string;
  specialiteKey: string;
  avatar: string;
  description: string;
  agenda: TimeSlot[];
}

const TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"];

function generateSlots(seed: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let day = 1; day <= 21; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue;

    const dateStr = date.toISOString().split("T")[0];

    for (let t = 0; t < TIMES.length; t++) {
      const available = ((seed * 7 + day * 3 + t * 2) % 3) !== 0;
      slots.push({ date: dateStr, time: TIMES[t], available });
    }
  }

  return slots;
}

export function getNextAvailableSlots(praticien: Praticien, count = 3): TimeSlot[] {
  return praticien.agenda.filter((s) => s.available).slice(0, count);
}

export const PRATICIENS: Praticien[] = [
  {
    id: "martin-sophie",
    prenom: "Sophie",
    nom: "Martin",
    specialite: "Médecin généraliste",
    specialiteKey: "generaliste",
    avatar: "https://i.pravatar.cc/200?img=47",
    description: "Médecine générale, suivi chronique, certificats médicaux.",
    agenda: generateSlots(1),
  },
  {
    id: "bernard-lucas",
    prenom: "Lucas",
    nom: "Bernard",
    specialite: "Cardiologue",
    specialiteKey: "cardiologue",
    avatar: "https://i.pravatar.cc/200?img=12",
    description: "Maladies cardiovasculaires, bilan cardiaque, ECG.",
    agenda: generateSlots(2),
  },
  {
    id: "dubois-emma",
    prenom: "Emma",
    nom: "Dubois",
    specialite: "Neurologue",
    specialiteKey: "neurologue",
    avatar: "https://i.pravatar.cc/200?img=20",
    description: "Céphalées, vertiges, troubles neurologiques, mémoire.",
    agenda: generateSlots(3),
  },
  {
    id: "petit-thomas",
    prenom: "Thomas",
    nom: "Petit",
    specialite: "Dentiste",
    specialiteKey: "dentiste",
    avatar: "https://i.pravatar.cc/200?img=33",
    description: "Soins dentaires, détartrage, extractions, orthodontie.",
    agenda: generateSlots(4),
  },
  {
    id: "moreau-julie",
    prenom: "Julie",
    nom: "Moreau",
    specialite: "Ophtalmologue",
    specialiteKey: "ophtalmologue",
    avatar: "https://i.pravatar.cc/200?img=10",
    description: "Bilan visuel, prescription de lunettes, maladies de l'œil.",
    agenda: generateSlots(5),
  },
  {
    id: "lefebvre-antoine",
    prenom: "Antoine",
    nom: "Lefebvre",
    specialite: "Rhumatologue",
    specialiteKey: "rhumatologue",
    avatar: "https://i.pravatar.cc/200?img=51",
    description: "Arthrose, douleurs articulaires, maladies rhumatismales.",
    agenda: generateSlots(6),
  },
  {
    id: "girard-marie",
    prenom: "Marie",
    nom: "Girard",
    specialite: "Gynécologue",
    specialiteKey: "gynecologue",
    avatar: "https://i.pravatar.cc/200?img=56",
    description: "Suivi gynécologique, grossesse, contraception.",
    agenda: generateSlots(7),
  },
  {
    id: "dupont-pierre",
    prenom: "Pierre",
    nom: "Dupont",
    specialite: "Gastro-entérologue",
    specialiteKey: "gastrologue",
    avatar: "https://i.pravatar.cc/200?img=64",
    description: "Troubles digestifs, coloscopie, maladies intestinales.",
    agenda: generateSlots(8),
  },
];

export function getPraticienContext(): string {
  const lines = PRATICIENS.map((p) => {
    const slots = getNextAvailableSlots(p, 3)
      .map((s) => `${s.date} à ${s.time}`)
      .join(", ");
    return `- Dr. ${p.prenom} ${p.nom} (${p.specialite}) — prochains créneaux : ${slots}`;
  });
  return lines.join("\n");
}
