function detectIntent(message) {
    const bookKeywords = ['rendez-vous', 'rdv', 'réserver', 'bonjour', 'consultation', 'prendre']
    const cancelKeywords = ['cancel', 'annuler', 'stop', 'arrête']
    const msg = message.toLowerCase();
    if (bookKeywords.some(k => msg.includes(k))){
        return 'BOOK';
    } else if(bookKeywords2.some(k => msg.includes(k))) {
        return 'CANCEL';
    } else {
        return 'UNKNOWN';
    }
}

export { detectIntent };