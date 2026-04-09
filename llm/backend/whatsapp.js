import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { handleMessage } from '../bot/stateMachine.js';

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersion: '2.2412.54',
});

const BOT_START_TIME = Math.floor(Date.now() / 1000);

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('QR reçu, scanne le !');
});

client.on('ready', () => {
  console.log('✅ Bot WhatsApp prêt !');
});

client.on('message', async (msg) => {

  if (msg.from.includes('@g.us')) return;

  if (msg.timestamp < BOT_START_TIME) return;

  if (msg.fromMe) return;

  console.log('Message reçu:', msg.body);
  const reply = await handleMessage(msg.from, msg.body);
  console.log('Réponse:', reply);

  if (reply) {
    await client.sendMessage(msg.from, reply);
  }
});

client.initialize();