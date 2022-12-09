import express from 'express';
import * as dotenv from 'dotenv';
import initTwitchBot from './Twitch/Bot.js';
import initDiscordBot from './Discord/Bot.js';
import { getUserData, getUserToken } from './Discord/Auth.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/kcsub', (request, response) => {
  const { body } = request;

  response.json({ status: 'success' });
  console.log(body);
});

app.get('/kcsub', async (request, response) => {

  const { code } = request.query;
  const { access_token, token_type } = await getUserToken(code);

  await getUserData(access_token, token_type);

  response.send('Access token:');
});

app.listen(port, () => {
  console.log(`[Webhook]: listening at http://127.0.0.1:${port}`);
});

await initTwitchBot();
await initDiscordBot();