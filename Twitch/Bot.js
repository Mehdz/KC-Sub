import { Client } from 'tmi.js';
import axios from 'axios';
import { addUser } from '../../Database/Queries.js';

const getBody = async (tags, discord) => {
  const body = {
    twitch: tags['display-name'].toLowerCase(),
    subscription : tags['badge-info'].subscriber,
    discord
  };

  return body;
};

const commandListener = async (client) => {
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
        await addUser(tags['display-name'], discord, tags['badge-info'].subscriber);
        return response.data;
      }
    } catch (err) {
      console.log(`[TWITCH]: ${err}`);
    }
  });

};

const initTwitchBot = async () => {
  const client = new Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [process.env.TWITCH_CHANNEL_NAME || 'MehdiiQLF']
  });

  await commandListener(client);

  client.connect();
};

export default initTwitchBot;