require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB().then(async () => {
  console.log('🌱 Creating admin account...');
  
  const exists = await User.findOne({ email: 'admin@mobafolio.com' });
  if (exists) {
    console.log('✅ Admin account already exists.');
    process.exit();
  }

  await User.create({
    name: 'MobaFolio Admin',
    email: 'admin@mobafolio.com',
    password: 'Admin@1234',
    role: 'admin',
    bio: 'Mobile Legends enthusiast and community manager!',
    rank: 'Mythical Glory',
    favoriteHero: 'Lancelot'
  });

  console.log('🎉 Admin account created successfully!');
  console.log('📧 Email: admin@mobafolio.com');
  console.log('🔑 Password: Admin@1234');
  console.log('🎮 Welcome to MobaFolio!');
  process.exit();
});