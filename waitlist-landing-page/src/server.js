import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  walletAddress: String,
  telegramId: String,
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  completedCourses: [String],
  tokensEarned: Number,
  lastCheckin: Date
});

const User = mongoose.model('User', userSchema);

// API Endpoints
app.post('/api/signup', async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      tokensEarned: 0
    });
    await user.save();
    res.status(201).json({ 
      telegramLink: 'https://t.me/DalasTokenEduBot',
      message: 'Signup successful! Join our Telegram to start earning.' 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add other endpoints for Telegram integration
app.listen(3000, () => console.log('Server running on port 3000'));