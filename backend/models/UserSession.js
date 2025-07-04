import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  response: String,
  createdAt: { type: Date, default: Date.now }
});

const userSessionSchema = new mongoose.Schema({
  userId: String,
  gradeLevel: String,
  history: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('UserSession', userSessionSchema);
