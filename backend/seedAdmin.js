require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Your Atlas connection string with the NEW password
const MONGO_URI = 'mongodb+srv://jroropilla23114013_db_user:odQiy9jHDFxzkLyM@cluster0.vc2a2mu.mongodb.net/mobafolio';

async function seedAdmin() {
  try {
    console.log('🌱 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const exists = await User.findOne({ email: 'admin@mobafolio.com' });
    if (exists) {
      console.log('✅ Admin already exists');
      process.exit(0);
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
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedAdmin();