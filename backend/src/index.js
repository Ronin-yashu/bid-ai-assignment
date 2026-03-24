import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db/init.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Bid.ai API is running ✅' }));

// Init DB then start server
initDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
