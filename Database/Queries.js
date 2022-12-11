import mongoose from 'mongoose';
import UsersSchema from './Schema/UsersSchema.js';

export const addUser = async (twitchName, discordTag, subscription) => {
  const db = mongoose.connection.useDb('kcsub');
  const User = db.model('user', UsersSchema);
  const foundUser = await User.findOne({ 'user.twitchName': twitchName });

  if (foundUser && foundUser?.user)
    return;

  const newUser = new User({
    twitchName,
    discordTag,
    subscription
  });

  await newUser.save();
};