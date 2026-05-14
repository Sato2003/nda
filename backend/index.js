const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Nda = require('./models/Nda');
const ActivityLog = require('./models/ActivityLog');
const { normalizeDoc } = require('./models/helpers');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());
app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON request body.'
    });
  }

  return next(error);
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nda_management_system';
const JWT_SECRET = process.env.JWT_SECRET || 'replace-this-with-a-long-random-secret';

const asyncRoute = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
};

const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

const sanitizeUser = (user) => {
  const normalized = normalizeDoc(user);
  if (!normalized) return null;

  const { passwordHash, ...safeUser } = normalized;
  return safeUser;
};

const makeUserPayload = (user) => {
  const safeUser = sanitizeUser(user);
  return {
    ...safeUser,
    displayName: safeUser?.name || safeUser?.email
  };
};

const signToken = (user) =>
  jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

const requireAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';

    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid session.' });
    }

    req.user = user;
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, error: 'Invalid session.' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role === 'admin' || req.user?.email?.includes('admin')) {
    return next();
  }

  return res.status(403).json({ success: false, error: 'Admin access required.' });
};

app.get('/', (_req, res) => {
  res.json({
    message: 'NDA Backend Running Successfully',
    database: 'MongoDB Atlas'
  });
});

app.post('/auth/register', asyncRoute(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');
  const firstName = String(req.body.firstName || '').trim();
  const lastName = String(req.body.lastName || '').trim();
  const middleInitial = String(req.body.middleInitial || '').trim();

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, error: 'Password should be at least 6 characters long.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ success: false, error: 'That email is already registered. Try logging in instead.' });
  }

  const name = `${lastName}, ${firstName}${middleInitial ? ` ${middleInitial}.` : ''}`.trim();
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    middleInitial,
    name,
    email,
    passwordHash,
    role: email.includes('admin') ? 'admin' : 'employee',
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    token: signToken(user),
    user: makeUserPayload(user)
  });
}));

app.post('/auth/login', asyncRoute(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = String(req.body.password || '');

  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) {
    return res.status(401).json({ success: false, error: 'Invalid email or password. If this account does not exist yet, use Register first.' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ success: false, error: 'Invalid email or password. If this account does not exist yet, use Register first.' });
  }

  res.json({
    success: true,
    token: signToken(user),
    user: makeUserPayload(user)
  });
}));

app.get('/auth/me', requireAuth, asyncRoute(async (req, res) => {
  res.json({ user: makeUserPayload(req.user) });
}));

app.patch('/auth/password', requireAuth, asyncRoute(async (req, res) => {
  const currentPassword = String(req.body.currentPassword || '');
  const newPassword = String(req.body.newPassword || '');

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Please fill in both password fields.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'Password should be at least 6 characters long.' });
  }

  const isMatch = await bcrypt.compare(currentPassword, req.user.passwordHash || '');
  if (!isMatch) {
    return res.status(401).json({ success: false, error: 'Current password is incorrect.' });
  }

  req.user.passwordHash = await bcrypt.hash(newPassword, 10);
  await req.user.save();

  res.json({ success: true, user: makeUserPayload(req.user) });
}));

app.post('/auth/reset-password', asyncRoute(async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const newPassword = String(req.body.newPassword || '');

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, error: 'Email and new password are required.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'Password should be at least 6 characters long.' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, error: 'No account found for that email.' });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ success: true });
}));

app.get('/users', requireAuth, asyncRoute(async (req, res) => {
  const { email } = req.query;

  if (email) {
    const user = await User.findOne({ email: normalizeEmail(email) }).lean();
    return res.json({ user: sanitizeUser(user) });
  }

  if (!(req.user.role === 'admin' || req.user.email.includes('admin'))) {
    return res.status(403).json({ success: false, error: 'Admin access required.' });
  }

  const users = await User.find().sort({ createdAt: -1 }).lean();
  res.json({ users: users.map(sanitizeUser) });
}));

app.get('/ndas', requireAuth, asyncRoute(async (req, res) => {
  const filter = {};
  const requestedSignerEmail = req.query.signerEmail ? normalizeEmail(req.query.signerEmail) : '';
  const isAdmin = req.user.role === 'admin' || req.user.email.includes('admin');

  if (requestedSignerEmail) {
    if (!isAdmin && requestedSignerEmail !== req.user.email) {
      return res.status(403).json({ success: false, error: 'You can only view your own NDAs.' });
    }
    filter.signerEmail = requestedSignerEmail;
  } else if (!isAdmin) {
    filter.signerEmail = req.user.email;
  }

  const ndas = await Nda.find(filter).sort({ generatedDate: -1 }).lean();
  res.json({ ndas: ndas.map(normalizeDoc) });
}));

app.post('/ndas', requireAuth, asyncRoute(async (req, res) => {
  const payload = {
    ...req.body,
    signerEmail: normalizeEmail(req.body.signerEmail || req.user.email),
    partnerEmail: normalizeEmail(req.body.partnerEmail)
  };

  if (payload.signerEmail !== req.user.email && !(req.user.role === 'admin' || req.user.email.includes('admin'))) {
    return res.status(403).json({ success: false, error: 'You can only create NDAs for your own account.' });
  }

  const nda = await Nda.create(payload);

  await ActivityLog.create({
    type: 'created',
    ndaId: nda.ndaId,
    ndaType: nda.ndaType,
    partnerName: nda.partnerName,
    partnerEmail: nda.partnerEmail,
    signerEmail: nda.signerEmail,
    signerName: nda.signerName,
    timestamp: nda.generatedDate,
    description: `${nda.ndaType} created with ${nda.partnerName}`
  });

  res.status(201).json({ success: true, nda: normalizeDoc(nda) });
}));

app.patch('/ndas/:id/sign', requireAuth, asyncRoute(async (req, res) => {
  const nda = await Nda.findById(req.params.id);
  if (!nda) {
    return res.status(404).json({ success: false, error: 'NDA not found.' });
  }

  const isAdmin = req.user.role === 'admin' || req.user.email.includes('admin');
  if (!isAdmin && nda.signerEmail !== req.user.email) {
    return res.status(403).json({ success: false, error: 'You can only sign your own NDAs.' });
  }

  const signedAt = req.body.signedAt || new Date().toISOString();
  nda.status = 'signed';
  nda.signedAt = signedAt;
  await nda.save();

  await ActivityLog.create({
    type: 'signed',
    ndaId: nda.ndaId,
    ndaType: nda.ndaType,
    partnerName: nda.partnerName,
    partnerEmail: nda.partnerEmail,
    signerEmail: nda.signerEmail,
    signerName: nda.signerName,
    timestamp: signedAt,
    description: `${nda.ndaType || 'NDA'} signed with ${nda.partnerName}`
  });

  res.json({ success: true, nda: normalizeDoc(nda) });
}));

app.patch('/ndas/:id/revoke', requireAuth, requireAdmin, asyncRoute(async (req, res) => {
  const revokedAt = req.body.revokedAt || new Date().toISOString();
  const revokedBy = normalizeEmail(req.body.revokedBy || req.user.email);
  const nda = await Nda.findByIdAndUpdate(
    req.params.id,
    { $set: { status: 'revoked', revokedAt, revokedBy } },
    { new: true }
  );

  if (!nda) {
    return res.status(404).json({ success: false, error: 'NDA not found.' });
  }

  await ActivityLog.create({
    type: 'revoked',
    ndaId: nda.ndaId,
    ndaType: nda.ndaType,
    partnerName: nda.partnerName,
    partnerEmail: nda.partnerEmail,
    signerEmail: nda.signerEmail,
    signerName: nda.signerName,
    timestamp: revokedAt,
    description: `${nda.ndaType || 'NDA'} revoked by ${revokedBy || 'admin'}`
  });

  res.json({ success: true, nda: normalizeDoc(nda) });
}));

app.delete('/ndas/:id', requireAuth, requireAdmin, asyncRoute(async (req, res) => {
  const nda = await Nda.findByIdAndDelete(req.params.id);

  if (!nda) {
    return res.status(404).json({ success: false, error: 'NDA not found.' });
  }

  res.json({ success: true });
}));

app.get('/activity-logs', requireAuth, asyncRoute(async (req, res) => {
  const isAdmin = req.user.role === 'admin' || req.user.email.includes('admin');
  const signerEmail = req.query.signerEmail ? normalizeEmail(req.query.signerEmail) : req.user.email;

  if (!isAdmin && signerEmail !== req.user.email) {
    return res.status(403).json({ success: false, error: 'You can only view your own activity logs.' });
  }

  const logs = await ActivityLog.find({ signerEmail }).sort({ timestamp: -1 }).lean();
  res.json({ logs: logs.map(normalizeDoc) });
}));

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'API route not found.'
  });
});

const start = async () => {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB connected at ${MONGODB_URI}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
