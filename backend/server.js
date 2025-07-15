import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// API Routes
app.get('/api/profile', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'profile.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading profile data:', error);
    res.status(500).json({ error: 'Failed to load profile data' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'projects.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading projects data:', error);
    res.status(500).json({ error: 'Failed to load projects data' });
  }
});

app.get('/api/experience', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'experience.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading experience data:', error);
    res.status(500).json({ error: 'Failed to load experience data' });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'blogs.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading blogs data:', error);
    res.status(500).json({ error: 'Failed to load blogs data' });
  }
});

app.get('/api/education', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'education.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading education data:', error);
    res.status(500).json({ error: 'Failed to load education data' });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'testimonials.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading testimonials data:', error);
    res.status(500).json({ error: 'Failed to load testimonials data' });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', 'skills.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading skills data:', error);
    res.status(500).json({ error: 'Failed to load skills data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
