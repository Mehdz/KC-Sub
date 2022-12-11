import express from 'express';
import * as dotenv from 'dotenv';
import initTwitchBot from './Twitch/Bot.js';
import initDiscordBot, { compareUserData, sendDm } from './Discord/Bot.js';
import { getUserData, getUserToken } from './Discord/Auth.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = 3000;

await mongoose
  .connect(
    process.env.MONGODB,
    { useNewUrlParser: true }
  )
  .then(() => console.log('[MongoDB]: Connected'))
  .catch(err => console.log(err));

let userData = {};

app.use(express.json());

app.use(express.static('./Client/'));

app.post('/kcsub', (request, response) => {
  try {
    const { body } = request;

    response.json({ status: 'success' });
    console.log(body);
    userData = body;
    sendDm(userData.discord);
  } catch (error) {
    console.log(`[Webhook] POST: ${error}`);
  }
});

app.get('/kcsub', async (request, response) => {
  try {
    const { code } = request.query;
    const { access_token, token_type } = await getUserToken(code);

    userData.twitchVerification = await getUserData(access_token, token_type);
    await compareUserData(userData);
    sendDm(userData.discord);
    response.sendFile('index.html', { root: './Client/' });
  } catch (error) {
    console.log(`[Webhook] GET: ${error}`);
    response.sendFile('error.html', { root: './Client/' });
  }
});

app.listen(port, () => {
  console.log(`[Webhook]: listening at http://127.0.0.1:${port}`);
});

await initTwitchBot();
await initDiscordBot();