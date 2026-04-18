// seedAdmin.js - Run this locally to create admin on MongoDB Atlas
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// IMPORTANT: Replace this with your actual Atlas connection string if not using .env
// Or set MONGO_URI in your local .env file to the Atlas string.
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jroropilla23114013_db_user:Te3xerxXgF8eCvuW@cluster0.vc2a2mu.mongodb.net/mobafolio';

async function seedAdmin() {
  try {
    console.log('🌱 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const exists = await User.findOne({ email: 'admin@mobafolio.com' });
    if (exists) {
      console.log('✅ Admin account already exists.');
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
    console.log('🎮 Welcome to MobaFolio!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedAdmin();