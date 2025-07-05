import express from 'express';
import { handleQuestion } from '../controllers/questionController.js';

const router = express.Router();

router.post('/', handleQuestion);

export default router;
