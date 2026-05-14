const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI is not set in environment variables');
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Import Models
const User = require('./models/User');
const Nda = require('./models/Nda');
const ActivityLog = require('./models/ActivityLog');
const { normalizeDoc } = require('./models/helpers');

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NDA Backend is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// ============ AUTH ROUTES ============
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_this';

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Register
app.post('/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, middleInitial, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Create name
    const name = [firstName, lastName].filter(Boolean).join(' ');
    
    // Create user
    const user = new User({
      firstName,
      lastName,
      middleInitial: middleInitial || '',
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'employee',
      createdAt: new Date().toISOString()
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      token,
      user: normalizeDoc(user)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      token,
      user: normalizeDoc(user)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get current user
app.get('/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    res.json({ user: normalizeDoc(user) });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update password
app.patch('/auth/password', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { currentPassword, newPassword } = req.body;
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();
    
    res.json({ user: normalizeDoc(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset password (admin only or with email)
app.post('/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ USER ROUTES ============
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users: users.map(normalizeDoc) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ NDA ROUTES ============
// Get NDAs (with optional filter by signerEmail)
app.get('/ndas', async (req, res) => {
  try {
    const { signerEmail } = req.query;
    const query = signerEmail ? { signerEmail: signerEmail.toLowerCase() } : {};
    const ndas = await Nda.find(query).sort({ generatedDate: -1 });
    res.json({ ndas: ndas.map(normalizeDoc) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create NDA
app.post('/ndas', async (req, res) => {
  try {
    const nda = new Nda(req.body);
    await nda.save();
    
    // Log activity
    const activityLog = new ActivityLog({
      type: 'created',
      ndaId: nda.ndaId,
      ndaType: nda.ndaType,
      partnerName: nda.partnerName,
      partnerEmail: nda.partnerEmail,
      signerEmail: nda.signerEmail,
      signerName: nda.signerName,
      timestamp: new Date().toISOString(),
      description: `NDA created with ${nda.partnerName}`
    });
    await activityLog.save();
    
    res.json({ nda: normalizeDoc(nda) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sign NDA
app.patch('/ndas/:id/sign', async (req, res) => {
  try {
    const { id } = req.params;
    const { signedAt, signerEmail, signerName } = req.body;
    
    const nda = await Nda.findById(id);
    if (!nda) {
      return res.status(404).json({ error: 'NDA not found' });
    }
    
    nda.status = 'signed';
    nda.signedAt = signedAt;
    await nda.save();
    
    // Log activity
    const activityLog = new ActivityLog({
      type: 'signed',
      ndaId: nda.ndaId,
      ndaType: nda.ndaType,
      partnerName: nda.partnerName,
      partnerEmail: nda.partnerEmail,
      signerEmail: signerEmail,
      signerName: signerName,
      timestamp: new Date().toISOString(),
      description: `${signerName} signed the NDA with ${nda.partnerName}`
    });
    await activityLog.save();
    
    res.json({ nda: normalizeDoc(nda) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Revoke NDA
app.patch('/ndas/:id/revoke', async (req, res) => {
  try {
    const { id } = req.params;
    const { revokedAt, revokedBy } = req.body;
    
    const nda = await Nda.findById(id);
    if (!nda) {
      return res.status(404).json({ error: 'NDA not found' });
    }
    
    nda.status = 'revoked';
    nda.revokedAt = revokedAt;
    nda.revokedBy = revokedBy;
    await nda.save();
    
    // Log activity
    const activityLog = new ActivityLog({
      type: 'revoked',
      ndaId: nda.ndaId,
      ndaType: nda.ndaType,
      partnerName: nda.partnerName,
      partnerEmail: nda.partnerEmail,
      signerEmail: nda.signerEmail,
      signerName: nda.signerName,
      timestamp: new Date().toISOString(),
      description: `NDA with ${nda.partnerName} was revoked by ${revokedBy}`
    });
    await activityLog.save();
    
    res.json({ nda: normalizeDoc(nda) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete NDA
app.delete('/ndas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Nda.findByIdAndDelete(id);
    res.json({ message: 'NDA deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ ACTIVITY LOG ROUTES ============
app.get('/activity-logs', async (req, res) => {
  try {
    const { signerEmail } = req.query;
    const query = signerEmail ? { signerEmail: signerEmail.toLowerCase() } : {};
    const logs = await ActivityLog.find(query).sort({ timestamp: -1 }).limit(100);
    res.json({ logs: logs.map(normalizeDoc) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
