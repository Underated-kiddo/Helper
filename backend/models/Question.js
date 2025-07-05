import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
