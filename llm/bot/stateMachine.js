import { detectIntent } from "./intentDetection.js";
import { MESSAGES } from "./messages.js";
const sessions = new Map();

function createFreshSession(){
    return {
    step: 'IDLE',
    data: {
      specialty: null,
      datetime: null,
      patientName: null,
    }
  };
}

function getSession(userId){
    if (sessions.has(userId)) {
        return sessions.get(userId)
    } else {
        let newuser = createFreshSession()
        sessions.set(userId, newuser)
        return newuser
    }
}

function setSession(userId, session) {
  sessions.set(userId, session);
}

async function handleMessage(userId, message){
  // case pr annuler
  if (message.toLowerCase() === 'annuler') {
      setSession(userId, createFreshSession());
      return MESSAGES.CANCEL;
    }

  const session = getSession(userId);
  switch(session.step) {
    case 'IDLE':

      const intent = detectIntent(message);

      if(intent === 'BOOK') {
        session.step = 'CHOOSE_SPECIALTY';
        setSession(userId, session);
        return MESSAGES.WELCOME + '\n' + MESSAGES.CHOOSE_SPECIALTY;
      }
      break;
    case 'CHOOSE_SPECIALTY':

      session.data.specialty = message;
      session.step = 'CHOOSE_DATETIME';
      setSession(userId, session);
      return MESSAGES.CHOOSE_DATETIME;
    case 'CHOOSE_DATETIME':
      session.data.datetime = message;
      session.step = 'COLLECT_NAME';
      setSession(userId, session);
      return MESSAGES.COLLECT_NAME;
    case 'COLLECT_NAME':
      session.data.patientName = message;
      session.step = 'CONFIRM';
      setSession(userId, session);
      return `${MESSAGES.CONFIRM} 
      'Nom:'  ${session.data.patientName} 
      'Spécialité: ${session.data.specialty}
      'Date: ${session.data.datetime}`;
    case 'CONFIRM':
     if (message.toLowerCase() === 'oui'){
      session.step = 'BOOKED';
      setSession(userId, session);
      return MESSAGES.BOOKED;
     } else if(message.toLowerCase() === 'non') {
        setSession(userId, createFreshSession());
        return MESSAGES.CANCEL;
     }
     default:
        return MESSAGES.UNKNOWN;
  }
}

export { handleMessage };