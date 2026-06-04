import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import uploadSessionHandler from './api/upload-session.js';
import mediaHandler from './api/media.js';

config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

app.all('/api/upload-session', (req, res) => uploadSessionHandler(req, res));
app.all('/api/media', (req, res) => mediaHandler(req, res));

app.listen(3001, '127.0.0.1', () => console.log('Mock Vercel API running on http://127.0.0.1:3001'));
