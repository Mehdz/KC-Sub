import pkg from 'mongoose';
const { Schema } = pkg;

const UsersSchema = new Schema({
  twitchName: {
    type: String,
    required: true
  },
  discordTag: {
    type: String,
    required: true
  },
  twitchNameVerification: {
    type: String,
  },
  subscription : {
    type: Number,
  }
});

export default UsersSchema;
