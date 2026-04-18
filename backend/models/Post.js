const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    body: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String, 
      default: '' 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['published', 'removed'], 
      default: 'published' 
    },
    // Mobile Legends specific fields
    heroName: { 
      type: String, 
      default: '' 
    },
    gameMode: { 
      type: String, 
      enum: ['Ranked', 'Classic', 'Brawl', 'Magic Chess', 'Tournament'], 
      default: 'Ranked' 
    },
    achievement: { 
      type: String, 
      default: '' 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);