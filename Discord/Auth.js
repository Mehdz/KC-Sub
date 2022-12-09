import axios from 'axios';

const createParams = async (code) => {
  const params = new URLSearchParams();

  params.append('client_id', process.env.DISCORD_CLIENT_ID);
  params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
  params.append('scope', 'identify%20connections');

  return params;
};


export const getUserToken = async (code) => {
  try {
    const response = await axios.post('https://discord.com/api/oauth2/token', await createParams(code),
      {
        headers: {
          'Accept-Encoding': 'gzip,deflate,compress'
        }
      });
    const { access_token, token_type } = response.data;

    return { access_token, token_type };
  } catch (error) {
    console.log('[DISCORD AUTH]: Error', error.data);
  }
};

export const getUserData = async (access_token, token_type) => {
  const response = await axios.get('https://discord.com/api/users/@me/connections', {
    headers: {
      authorization: `${token_type} ${access_token}`,
      'Accept-Encoding': 'gzip,deflate,compress'
    }
  });

  console.log(response.data);
};
