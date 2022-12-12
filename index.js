import express from 'express';
import * as dotenv from 'dotenv';
import initTwitchBot from './Sources/Twitch/Bot.js';
import initDiscordBot, { sendDm, updateUserDiscordRank } from './Sources/Discord/Bot.js';
import { getUserData, getUserToken } from './Sources/Discord/Auth.js';
import initDatabase from './Sources/Database/Database.js';
import { compareUserData } from './Sources/Database/Queries.js';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = 3000;
const rootPathClient = './Sources/Client/';

await initDatabase();

app.use(express.json());
app.use(helmet());
app.disable('x-powered-by');

app.use(express.static(rootPathClient));

app.post('/kcsub', async (request, response) => {
  try {
    const { body } = request;

    response.json({ status: 'success' });
    await sendDm(body.discordTag);
  } catch (error) {
    console.log(`[WEBHOOK] POST: ${error}`);
  }
});

app.get('/kcsub', async (request, response) => {
  try {
    const { code } = request.query;
    const { access_token, token_type } = await getUserToken(code);
    const twitchVerification = await getUserData(access_token, token_type);

    if (await compareUserData(twitchVerification) == true) {
      await updateUserDiscordRank(twitchVerification);
      response.sendFile('index.html', { root: rootPathClient });
    } else
      throw new Error('User has not been found');
  } catch (error) {
    console.log(`[WEBHOOK] GET: ${error}`);
    response.sendFile('error.html', { root: rootPathClient });
  }
});

app.use((request, response) => {
  response.sendFile('error.html', { root: rootPathClient });
});

app.use((error, request, response) => {
  console.error(error.stack);
  response.sendFile('error.html', { root: rootPathClient });
});

app.listen(port, () => {
  console.log(`[WEBHOOK]: listening at http://127.0.0.1:${port}`);
});

await initTwitchBot();
await initDiscordBot();