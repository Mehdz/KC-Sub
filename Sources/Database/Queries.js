import mongoose from 'mongoose';
import UsersSchema from './Schema/UsersSchema.js';

const db = mongoose.connection.useDb(process.env.DATABASE);
const User = db.model('user', UsersSchema);

export const addUser = async (twitchName, discordTag, subscription) => {
  try {
    const foundUser = await User.findOne({ twitchName: twitchName });

    if (foundUser && foundUser?.twitchName)
      await deleteUser(twitchName);

    const newUser = new User({
      twitchName: twitchName.toLowerCase(),
      discordTag: discordTag,
      subscription : subscription
    });

    await newUser.save();
    console.log('[DATABASE]: User created.');
  } catch (error) {
    console.log('[DATABASE]:', error);
  }
};

export const getUser = async (twitchVerification) => {
  const user = await User.findOne({twitchName: twitchVerification});

  if (user) {
    console.log('[DATABASE]: User has been found.');
    return user;
  } else {
    console.log('[DATABASE]: User has not been found.');
    return {};
  }
};

export const deleteUser = async (twitchName) => {
  try {
    const user = await User.findOne({twitchName: twitchName});

    if (!user || user.length === 0)
      return;

    await User.deleteOne({ _id: user._id });
    console.log(`[DATABASE]: User ${twitchName} deleted.`);
  } catch (error) {
    console.log('[DATABASE]:', error);
  }
};

export const compareUserData = async (twitchVerification) => {
  const user = await User.findOne({twitchName: twitchVerification});

  if (user) {
    console.log('[DATABASE]: User has been found.');
    return true;
  } else {
    console.log('[DATABASE]: User has not been found.');
    return false;
  }
};
