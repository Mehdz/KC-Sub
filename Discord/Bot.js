import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

export const compareUserData = async (userData) => {
  const { twitch, twitchVerification } = userData;

  if (twitch === twitchVerification)
    return true;
  return false;
};

const createParams = async () => {
  const params = new URLSearchParams();

  params.append('client_id', process.env.DISCORD_CLIENT_ID);
  params.append('response_type', 'code');
  params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
  params.append('scope', 'identify connections');

  return params;
};

export const sendDm = async (discordtag) => {
  try {
    const guild = await client.guilds.fetch('882211657005269053');
    const members = await guild.members.fetch();
    const user = members.find(member => member.user.username === discordtag.split('#')[0] && member.user.discriminator === discordtag.split('#')[1]);
    const uri = 'https://discord.com/api/oauth2/authorize?' + await createParams();

    await user.send('Salut, bla bla bla bla!');
    await user.send(uri);
  } catch (error) {
    console.log('[DISCORD]: ', error);
  }
};

const initDiscordBot = async () => {
  try {
    client.on('ready', () => {
      console.log(`[DISCORD]: Logged in as ${client.user.tag}!`);
    });
    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.log('[DISCORD]: ', error);
  }
};


export default initDiscordBot;