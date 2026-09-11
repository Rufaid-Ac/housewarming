const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev-only';

app.use(helmet());
app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, '../db.json');

// Initialize DB if not exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ rsvps: [], adminUser: null }));
}

const getDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const saveDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Basic Rate Limiting middleware
const rateLimit = {};
const checkRateLimit = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  if (rateLimit[ip] && now - rateLimit[ip].time < 60000) {
    if (rateLimit[ip].count > 5) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }
    rateLimit[ip].count++;
  } else {
    rateLimit[ip] = { time: now, count: 1 };
  }
  next();
};

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// POST /api/rsvp - Submit RSVP
app.post('/api/rsvp', checkRateLimit, (req, res) => {
  try {
    const { name, guestCount, attendance, message } = req.body;
    
    if (!name || typeof attendance !== 'boolean') {
      return res.status(400).json({ error: 'Name and attendance are required.' });
    }
    const count = parseInt(guestCount) || 1;
    if (count < 1 || count > 10) {
      return res.status(400).json({ error: 'Guest count must be between 1 and 10.' });
    }

    const db = getDB();
    const existing = db.rsvps.find(r => r.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'An RSVP with this name has already been submitted.' });
    }

    const newRsvp = {
      id: Date.now(),
      name,
      guestCount: count,
      attendance,
      message: message || '',
      createdAt: new Date().toISOString()
    };

    db.rsvps.push(newRsvp);
    saveDB(db);

    res.status(201).json({ message: 'RSVP submitted successfully', rsvp: newRsvp });
  } catch (error) {
    console.error('RSVP submission error:', error);
    res.status(500).json({ error: 'Failed to submit RSVP. Please try again.' });
  }
});

// POST /api/admin/login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  try {
    const db = getDB();
    const admin = db.adminUser;
    
    if (!admin || admin.username !== username) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admin/rsvps
app.get('/api/admin/rsvps', authenticate, (req, res) => {
  try {
    const db = getDB();
    const sorted = db.rsvps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

// GET /api/admin/stats
app.get('/api/admin/stats', authenticate, (req, res) => {
  try {
    const db = getDB();
    const rsvps = db.rsvps;
    
    const stats = {
      totalResponses: rsvps.length,
      attending: rsvps.filter(r => r.attendance).length,
      notAttending: rsvps.filter(r => !r.attendance).length,
      totalGuests: rsvps.reduce((acc, curr) => curr.attendance ? acc + curr.guestCount : acc, 0)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// DELETE /api/admin/rsvp/:id
app.delete('/api/admin/rsvp/:id', authenticate, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = getDB();
    
    const initialLength = db.rsvps.length;
    db.rsvps = db.rsvps.filter(r => r.id !== id);
    
    if (db.rsvps.length === initialLength) {
      return res.status(404).json({ error: 'RSVP not found' });
    }
    
    saveDB(db);
    res.json({ message: 'RSVP deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete RSVP' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
