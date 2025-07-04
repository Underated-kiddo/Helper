import express from 'express';
import 'dotenv/config';
import questionRoutes from './routes/question.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/question', questionRoutes);

export default app;
