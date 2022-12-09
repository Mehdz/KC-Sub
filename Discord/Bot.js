import { Client, GatewayIntentBits } from 'discord.js';

const initDiscordBot = async () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on('ready', () => {
    console.log(`[DISCORD]: Logged in as ${client.user.tag}!`);
  });

  client.login(process.env.DISCORD_TOKEN);
};


export default initDiscordBot;