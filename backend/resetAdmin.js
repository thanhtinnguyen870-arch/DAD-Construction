const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');

dotenv.config();

const [, , email, password] = process.argv;

const resetAdmin = async () => {
  if (!email || !password) {
    console.error('Usage: npm run reset-admin -- <email> <new-password>');
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is required.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOne({ email });
  if (user) {
    user.password = password;
    user.role = 'admin';
    await user.save();
    console.log(`Updated admin user: ${email}`);
  } else {
    await User.create({
      name: 'Admin DAD',
      email,
      password,
      role: 'admin',
    });
    console.log(`Created admin user: ${email}`);
  }

  await mongoose.disconnect();
};

resetAdmin().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
