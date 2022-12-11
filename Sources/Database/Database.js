import mongoose from 'mongoose';

const initDatabase = async () => {
  mongoose.set('strictQuery', true);

  await mongoose
    .connect(
      process.env.MONGODB,
      { useNewUrlParser: true }
    )
    .then(() => console.log('[MongoDB]: Connected'))
    .catch(err => console.log(err));
};

export default initDatabase;