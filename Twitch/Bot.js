import { Client } from 'tmi.js';
import axios from 'axios';

const getBody = async (tags, discord) => {
  const body = {
    username: tags['display-name'],
    subscription : tags['badge-info'].subscriber,
    discord
  };

  return body;
};

const initTwitchBot = async () => {
  const client = new Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [process.env.TWITCH_CHANNEL_NAME || 'MehdiiQLF']
  });

  client.connect();
  client.on('message', async (channel, tags, message) => {
    try {
      if (message.toLowerCase().startsWith('!discordrank') === true && message.split(' ').length > 1 && tags['subscriber'] === true) {
        const discord = message.split(' ')[1];
        const body = await getBody(tags, discord);
        const response = await axios
          .post('http://127.0.0.1:3000/kcsub', body, {
            headers: {
              'Content-Type' : 'application/json',
            },
          });

        console.log(`[TWITCH]: ${tags['display-name']}: ${message}`);
        console.log('[TWITCH]: Webhook Response : ' + response.data.status);
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  });
};

export default initTwitchBot;