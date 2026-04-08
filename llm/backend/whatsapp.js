import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

const client = new Client({
    authStrategy: new LocalAuth()
})

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('qr', (qr) => {
    console.log('QR received')
})

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');
    } else if (msg.body === '!reaction') {
        msg.react('👍')
    }
});

client.initialize();