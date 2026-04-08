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
